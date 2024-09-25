from pathlib import Path
from modules.settings import settings

# Init settings
print(f'pptet {Path(Path.cwd() / "configs")}')
settings.init(Path(Path.cwd() / "configs"), "prod")
# TODO: Fix so imports can be top level but settings are always first initialized!!!

from app import create_app
app = create_app()

if __name__ == '__main__':

    app.run(debug=True)
