# ArcGIS Enterprise Administration Tool

## 📝 Requirements:
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
## docker-compose up --build -d for a rebuild
docker-compose up
```

```sh
# stop docker-compose in root (terminal / docker-desktop / IDE)
## docker-compose down -v to remove volumes/data for a reset
docker-compose down
```

## 🔬 Ports (defaults)
| Service     | URL                                                            |
|-------------|----------------------------------------------------------------|
| Frontend    | [http://localhost:3000](http://localhost:3000)                 |
| Backend-API | [http://localhost:5001](http://localhost:5001)                 |
| Swagger     | [http://localhost:5001/apidocs](http://localhost:5001/apidocs) |
| DB          | [http://localhost:3310](http://localhost:3310)                 |

## 🔑 Dummy-Login
- Default Dummy-User: `Alice` (Admin) or `Bob` (Viewer)
- Default Dummy-Pwd: `12345`

# 🎛️ Components
- Backend: Python Flask API
- Frontend: React with MobX, Vite, Material-UI
- Database: MariaDB
- Token Blacklist: Redis

# 🔧 Projectsetup
Projectsetup with: https://nx.dev/getting-started/tutorials/react-standalone-tutorial

# 📋 TODO & Kown Issues
- [ ] Add Tests
- [ ] Add CI/CD
- [ ] Add more features
- [ ] Add more documentation
 
--> Genereell:
--> BOM überdenken
--> Loading verbessern (Nicht generisch alle Stores laden sondern dann wenn es auch etwas braucht)
--> Load User / Profile )
--- dont use "useEffect" for data fetching(-> nicht in taskDetails / oder "usersettings"!
--> Durchgehen für alle Modelle die Objeckte Serializsieren / Deserialisierne wie am Beispiel tooluser -> Konkrete Modell-Objecte verwenden udn nicht einfach nur dict
--> Modelle überarbeiten, besserer abstract-model mit den defaults (e.g. funktion für generisches fromJSON & toJSON)
-->generic/abstract Filter -> für string / number /date / boolean, als abstract filter
--> use customHooks (e.g. usePermission)
--> models erweitern mit permissions role / rolepermission! /und TaskRules / TsakRuleStore
//TODO: Extend ModelClasses with minimal-shared-props and proper type/class for age-components
// TODO: load other data for overview screens


spezifisch:
- Clean Accordion-Filter reset wit proper InitialValues-> 
-IMprove abstract store as proper generic! (e.g. ItemTypes<T> = ....)