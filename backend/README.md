# ArcGIS Enterprise Administration Tool

## 💿 Backend

Note: Read the README.md in the project root for the full documentation. This is only for reference and decoupled
installation if docker is not available and parts need to be installed / run separately.

### Manual / decoupled installation

- DB
    - Install MariaDB & Service
    - Configuration according to .env file
- Setup Redis
    - Install Redis & Service
    - Configuration according to .env file
- Install & run Python
    - ```sh
      pip install -r requirements.txt
      ```
    - ```sh
      main.py
      ```