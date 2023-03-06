docker build --no-cache . --tag koj_front -f ./front/Dockerfile
docker build --no-cache . --tag koj_back -f ./back/Dockerfile
docker build --no-cache . --tag koj_koj -f ./koj/Dockerfile
docker build --no-cache . --tag koj_media -f ./media/Dockerfile
docker compose up -d