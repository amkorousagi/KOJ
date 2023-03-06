docker build . --tag koj_front -f ./front/Dockerfile
docker build . --tag koj_back -f ./back/Dockerfile
docker build . --tag koj_koj -f ./koj/Dockerfile
docker build . --tag koj_media -f ./media/Dockerfile
