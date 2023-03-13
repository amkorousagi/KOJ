# KOJ
KOJ is KNU Online Judge

## How to start KOJ
1. build docker images with shell script included docker build and Dockerfile
```bash
bash build.sh
```

2. start running containers with docker compose
```bash
docker compose up -d
```

## NOTE
0. check if installing docker

1. check if setting config files
- back/config.js : export id, pwd, dbName, port, KOJ_URL
- back/secret.js : export secret
- front/.env : PORT, HOST
- front/src/config.js : export BASE_URL, FILE_URL, CODE_URL, DOWNLOAD_URL, MEDIA_URL
- koj/config.js : module.exports id, pwd, dbName, ip, port, KOJ_URL

2. check if openning ports : 3011~3015
```bash
sudo ufw allow 3011:3015/tcp
```

3. check if creating user in mongo
```bash
docker exec -it <mongo container id> bash
mongosh --port <mongo port>
use admin
db.createUser({...})
```
