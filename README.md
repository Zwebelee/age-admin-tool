# ArcGIS Enterprise Administration Tool

## 📋Requirements:
- Docker // Docker-Compose

## 💻 Installation
1. Copy/Paste `.env.example` as `.env`, change values if needed.
   ```sh
   # example for windows
   cp .env.example .env;
   ```
 
2. Cd to project root, build and start the docker-compose in e.g. terminal, docker-desktop, IDE, etc.:
    ```sh
    docker-compose up --build -d
    ```

## ▶️ Run / Stop
```sh
# run docker-compose in root (terminal / docker-desktop / IDE)
## stop individual containers if needed (e.g. stop only frontend)
docker-compose up
```

```sh
# stop docker-compose in root (terminal / docker-desktop / IDE)
docker-compose down
```

## 🔬 Ports (defaults)
| Service     | URL                                                            |
|-------------|----------------------------------------------------------------|
| Frontend    | [http://localhost:3000](http://localhost:3000)                 |
| Backend-API | [http://localhost:5001](http://localhost:5001)                 |
| Swagger     | [http://localhost:5001/apidocs](http://localhost:5001/apidocs) |
| DB          | [http://localhost:3310](http://localhost:3310)                 |

# 🎛️ Components
- Backend: Python Flask API
- Frontend: React with MobX, Vite, Material-UI
- Database: MariaDB
- Token blacklist: Redis

# Projectsetup
Projectsetup with: https://nx.dev/getting-started/tutorials/react-standalone-tutorial
