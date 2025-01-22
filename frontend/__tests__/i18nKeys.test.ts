import en from '../public/i18n/en.json';
import de from '../public/i18n/de.json';
import fr from '../public/i18n/fr.json';

const compareKeys = (base: object, target: object, path: string[] = [], errors: string[] = []) => {
    const baseKeys = Object.keys(base);
    const targetKeys = Object.keys(target);

    // Check for missing keys
    baseKeys.forEach(key => {
        if (!(key in target)) {
            errors.push(`Missing key '${[...path, key].join('.')}' in target`);
        } else if (typeof base[key] === 'object' && base[key] !== null) {
            compareKeys(base[key], target[key], [...path, key], errors);
        }
    });

    // Check for extra keys
    targetKeys.forEach(key => {
        if (!(key in base)) {
            errors.push(`Extra key '${[...path, key].join('.')}' in target`);
        }
    });

    return errors;
};

describe('i18n keys', () => {
    test('de.json matches en.json', () => {
        const errors = compareKeys(en, de);
        if (errors.length > 0) {
            throw new Error(errors.join('\n'));
        }
    });

    test('fr.json matches en.json', () => {
        const errors = compareKeys(en, fr);
        if (errors.length > 0) {
            throw new Error(errors.join('\n'));
        }
    });
});
