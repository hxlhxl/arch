docker run -d --name healthweb -p 83:80 health-check

docker container ls

docker inspect --format '{{json .State.Health}}' healthweb | python -m json.tool

