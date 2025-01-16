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
- Generell
  - [ ] Add Tests (Front + Backend)
  - [ ] Adjust Business-Object-Model
- Frontend
  - [ ] Add Storybook
  - [ ] Abstract Store/Models & Root-Store
    - Implement proper generics for ItemType<T> / StoreType<T> (abstract-store & abstract-model incl. generic (de-)serialization) so we use actual Model-Object and not just Dict-Objects (e.g. model/task.ts)
    - Abstract-Store / Stores:
      - replace any with the ItemType<T>
      - //TODO: (on abstract store) implement properly! should create a new Item of type T! Not just a Dict-Object
      - // TODO: solve better, Lazy-load stores - hooks/services for specific data on demand in specific routes where data
      - //TODO: Overthink handling of "all Users"

  - AbstractModel
    - sdfsdf
  - Update store-initialization and stores-"item-loading" functionality - Wait with render until user/profile is loaded, at start only load what is needed, not ALL stores at start (lazy)
  - Remove useEffects for data-fetching (e.g. taskDetails / usersettings)
  - Extend ModelClasses with minimal-shared-props and proper type/class for age-components
  - [ ] Implement generic or abstract "Filter" (e.g. for string / number / date / boolean) 
  - [ ] Implement additional Models (permisson, role, taskrules, taskrulestore, ...)
  - [ ] Load all Overview-Component-Data
  - Auth & Cookies
    - //TODO: (CookieHandling) load the refresh-cookiename from dotenv -> env in the root directoy or better let backend set cookies
    - //TODO: accesstoken -> better save in session storage / memory
    - //TODO: these cookies should be set by the backend and recieved by the frontend
    - //TODO: MUST to be set! but backend not ready yet (refresh_token)
    - //TODO: improve logout - with invalid credentials backend will 401 - toolUserStore handling

    - AccordionFilterCOmponent
      - - Clean Accordion-Filter reset wit proper InitialValues-> 
      - + remove any -> linked to ItemType<T> in store
   - Add MOre //TODO: Implement TaskRule - Store, Model, Service, Component

- Backend
  - [ ] Implement "Role/Permission-Check" for get/post/put/delete
  - [ ] Update Swagger-Documentation
  -     - //TODO: these cookies should be set by the backend and recieved by the frontend
  - //TODO: handling in backend -> revoke tokens, set new salt, send new tokens
  - // Backend hardening (protect routes, actually check permissions in backend)


