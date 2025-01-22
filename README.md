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

<details>
  <summary> Details </summary>
  <blockquote>

  <details>
  <summary> General </summary>
  <blockquote>

- [ ] Add Tests (Front + Backend)
- [ ] Adjust Business-Object-Model
- [ ] Implement additional Models/Stores (taskrules, taskrulestore, ...)

  </blockquote>
  </details>
  
  <details>
  <summary> Frontend </summary>
  <blockquote>

- [ ] Init and Data-Loading
  - Update store-initialization and stores-"item-loading" functionality - Render "loading" until user/profile is
    loaded
  - Lazy-Loading -> Only load what is actually needed, load on routes not ALL stores at start (lazy)
  - Remove "useEffect" for data-fetching (e.g. taskDetails / usersettings)
- [ ] Abstract Store, Abstract Models & Root-Store
  - Implement proper generics for ItemType<T> / StoreType<T> (abstract-store & abstract-model incl. generic (de-)
    serialization) so we use actual "Model-Object" and not just "Dict-Objects" (e.g. model/task.ts)
  - Update e.g. "items" and methods in the abstract store with the proper type --> ItemType<T> instead of any
  - use (de-)serialization for load/delete/update items from backend-dict-objects to actual Model-Objects
- [ ] Abstract Model
  - Integrate abstract / generic toJSON / fromJSON for (de-)serialization
- [ ] Auth & Cookies
  - receive cookies and their settings (httponly/expiration) from backend (e.g. refresh_token)
  - get cookienames from .env / dotenv
  - use sessionstorage or memry for access token
  - refresh_token -> update to httponly (MUST!), receive from backend as soon as ready
  - improve logout - with invalid credentials backend will 401 - toolUserStore handling
  - improve "hasPermission" and fully block routes/actions if !hasPermission
- [ ] Components
  - Fix type on "AccordionFilterComponent" (e.g. ItemType<T> instead of "any"), update the proper "reset to init value"
  - Implement generic or abstract reusable "Filter" (e.g. for string / number / date / boolean)
- [ ] Try "Storybook"

  </blockquote>
  </details>
  
  <details>
  <summary> Backend </summary>
  <blockquote>

- [ ] Update Security
  - [ ] Set/send cookies from backend with headers (refresh->http only)/expiration - not frontend
  - [ ] Proper revoke tokens on Role-or PWD Change/Logout, use "salt" to hash passwords
  - [ ] Protect Routes/Method by Role/Permission - Implement "Role/Permission-Check" for get/post/put/delete
  - [ ] Protect]
- [ ] Update Swagger-Documentation

  </blockquote>
  </details>

  </blockquote>
</details>