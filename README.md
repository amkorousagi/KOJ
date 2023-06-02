# KOJ

KOJ is KNU Online Judge

## KOJ Usecase

<img src="./img/KOJ.drawio.svg"/>

## KOJ Architecture

<img src="./img/KOJ_architecture.drawio.svg"/>

## How to start KOJ

1. build docker images with shell script included docker build and Dockerfile

```bash
bash build.sh
```

2. start running containers with docker compose

```bash
docker compose up -d
```

if window, use docker-compose

## Before starting KOJ

0. check if installing docker

1. check if setting config files

- back/config.js : export id, pwd, dbName, port, KOJ_URL
- back/secret.js : export secret
- front/.env : PORT, HOST
- front/src/config.js : export BASE_URL, FILE_URL, CODE_URL, DOWNLOAD_URL, MEDIA_URL
- koj/config.js : module.exports id, pwd, dbName, ip, port, KOJ_URL

2. make key file

```bash
cd key
openssl -base64 756 > mongodb.key
chmod 400 mongodb.key
chown 999:999 mongodb.key
```

3. check if openning ports : 3011~3015

```bash
sudo ufw allow 3011:3015/tcp
```

4. check if creating user and initialize in mongo

```bash
docker exec -it <mongo container id> bash
mongosh --port <mongo port>
use admin
db.createUser(
  {
    user: "yourRootId",
    pwd: "yourRootPwd",
    roles: [ { role: "root", db: "admin" } ]
  }
)
db.auth("yourRootId","yourRootPwd")
db.createUser(
  {
    user: "yourUserId",
    pwd: "yourUserPwd",
    roles: [ {role:"readWrite",db:"yourDB"} ]
  }
)
res.stepDown() # execute on primary node if error about not setting primary
db.getMongo().setReadPref('secondary') # execute each mongodb node
```
