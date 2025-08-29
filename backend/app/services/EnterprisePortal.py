from arcgis.gis import GIS
import time

# TODO: rename
class PortalSession:
    def __init__(self, url, username, password):
        self.url = url
        self.username = username
        self.password = password
        self.gis = None
        self.token_expiry = 0

    def login(self):
        self.gis = GIS(self.url, self.username, self.password)
        self.token_expiry = time.time() + 3600

    # ToDO: improve! -> Tokenlogic + rethink approach -> each worker own session or 1 for all ?..
    def get_gis(self):
        if not self.gis or time.time() > self.token_expiry:
            self.login()
        return self.gis