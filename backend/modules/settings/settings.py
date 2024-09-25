#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Module for loading the settings for a given environment from json file
"""
import collections
import json
import os

__SETTINGS = None
""" Global settings """

__SETTING_FILE_POSTFIX = ".settings.json"
""" The postfix for setting files """

__SETTING_SECRETS_FILE_POSTFIX = ".settings.secrets.json"
""" The postfix for setting files containing secrets """

__EXPANDABLE_SETTING_PREFIX = "path_"
""" Prefix for settings with a relative path which have to be expanded during initialization """


def init(settings_dir, env):
    """
    Search the settings file in settings directory and given environment variable.
    The settings file has to be in the structure 'env'.settings.json
    Initialize the settings by loading the JSON file and return the settings Dictonary.

    :param settings_dir: Absolute path to the settings folder
    :type settings_dir: String
    :param env: Environment variable (e.g. 'dev', 'test' or 'prod').
    :type env: String

    :raises SettingsNotFoundException: Raises a SettingsNotFoundException, if the settings file cannot be found.
    """
    global __SETTINGS

    try:
        if __SETTINGS is None or get("env") != env:
            setting_file = open(os.path.join(settings_dir, "{0}{1}".format(env, __SETTING_FILE_POSTFIX)), 'rt',
                                encoding='utf-8')
            setting_sec_file = open(os.path.join(settings_dir, "{0}{1}".format(env, __SETTING_SECRETS_FILE_POSTFIX)), 'rt',
                                    encoding='utf-8')
            __SETTINGS = json.load(setting_file)
            dict_merge(__SETTINGS, json.load(setting_sec_file))
            _expand_relative_path(settings_dir, __SETTINGS)
            __SETTINGS["settings_dir"] = settings_dir
            __SETTINGS["env"] = env

    except (OSError, IOError, FileNotFoundError):
        raise SettingsNotFoundException(settings_dir, __SETTING_FILE_POSTFIX)


def dict_merge(dct, merge_dct):
    """
    Recursive dictionary merging.
    Merges settings with secret settings to one dictionary.

    :param dct: dict onto which the merge is executed
    :type dct: Dictionary
    :param merge_dct: dct merged into dct
    :type merge_dct: Dictionary
    """
    for k, v in merge_dct.items():
        if (k in dct and isinstance(dct[k], dict)
                and isinstance(merge_dct[k], collections.abc.Mapping)):
            dict_merge(dct[k], merge_dct[k])
        else:
            dct[k] = merge_dct[k]


def _expand_relative_path(folder_name, settings):
    """
    Join the settings base path with a folder name and replace the according setting entry with the new absolute path.

    :param folder_name: The name of the folder
    :type folder_name: String
    :param settings: The setting dictonary
    :type settings: Dictionary
    """
    for key, value in settings.items():
        if isinstance(value, dict):
            _expand_relative_path(folder_name, value)
        elif key.startswith("path_"):
            settings[key] = os.path.join(folder_name, value)


def get(key, settings=None):
    """
    Get a setting value by key. Settings can be nested and loaded by point (.) notation.

    :param key: The name of the setting variable
    :type key: String
    :param settings: The setting dictionary
    :type settings: dict
    :return: The setting value.
    :rtype: any
    """
    settings = __SETTINGS if settings is None else settings
    parts = key.split(".", 1)
    if len(parts) == 2:
        return get(parts[1], get(parts[0], settings))

    if not settings or key not in settings:
        raise KeyError("Could not find '{0}' in settings. "
                       "Check initialization of settings variables".format(key))
    return settings[key]


class SettingsNotFoundException(Exception):
    """
    Custom exception for invalid settings file. Includes the provided environments in the exception message
    """

    def __init__(self, settings_dir, setting_file_postfix):
        """
        Constructor needs the base path to the setting files and the required setting file postfix.

        :param settings_dir: Absolute path to the settings folder
        :type settings_dir: String
        :param setting_file_postfix: Required postfix
        :type settings_dir: String
        """
        environments = [j.replace(setting_file_postfix, "") for j in os.listdir(settings_dir)]
        message = "Setting file not found in {0}. " \
                  "Call settings.init(settings_path, env) to use settings in preferred environment. " \
                  "Found environment settings for {1}".format(settings_dir, ', '.join(environments))
        super().__init__(message)
