# Run
Run this service in docker in 3 easy steps (assuming you also have `docker-compose` installed):
1. Create a `.env` file in the project root directory
2. In the `.env` file, specify a value for these keys (I have attached a sample below)
  - `dbname`: name of the db, default is `postgres`
  - `dbusr`: db username
  - `dbpwd`: db password
  - `svcportbinding`: the ip & port to access your backend service
  - `webportbinding`: the ip & port to access your web service
3. Run `docker compose up -d` and watch the magic happen

## A sample .env file
```yaml
dbname=postgres
dbusr=docker_user
dbpwd=docker_user
svcportbinding="127.0.0.1:8080:8080" # only accessible to your host machine
webportbinding="127.0.0.1:5173:5173" # only accessible to your host machine
```

Once all services started up without errors, go to the address specified for `webportbinding` on your browser and see the app (e.g. `127.0.0.1:5173`).