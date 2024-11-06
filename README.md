# ArcGIS Enterprise Administration Tool

_(🚧 Simpler setup in progress :) 🚧)_
## 💻 Installation
Requirements:
- Docker & Docker Compose
- Node.js & npm

### 💿 Backend
_(DockerCompose with MariaDB & Python FlaskApp)_
1. Copy/Paste `backend/.env.example` as `backend/.env`
2. Fill values for `DB_USER`, `DB_PASSWORD` & `DB_ROOT_PASSWORD`.
   ```sh
   # example windows with notepad
   cp backend/.env.example backend/.env; notepad backend/.env
   ```
3. Navigate to the backend directory:
    ```sh
    cd backend
    ```
4. Build and start the backend services:
    ```sh
    docker-compose up --build
    ```
### 📱 Frontend
_(react, mobx, vite)_
1. Navigate to the frontend directory:
    ```sh
    cd frontend
    ```
2. Install the dependencies:
    ```sh
    npm install
    ```
# ▶️ Run

### Start the Backend
   
```sh
# in the backend directory
docker-compose up
```
### Start the Frontend
  
```sh
# in the frontend directory
npm run dev
```

## 🔬 Ports (defaults)
| Service     | URL                                                            |
|-------------|----------------------------------------------------------------|
| Frontend    | [http://localhost:3000](http://localhost:3000)                 |
| Backend-API | [http://localhost:5001](http://localhost:5001)                 |
| Swagger     | [http://localhost:5001/apidocs](http://localhost:5001/apidocs) |
| DB          | [http://localhost:3310](http://localhost:3310)                 |

# Projectsetup
Projectsetup with: https://nx.dev/getting-started/tutorials/react-standalone-tutorial
