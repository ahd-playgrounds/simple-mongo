Just a small playground with Mongo and socket as I know embarrassingly little about databases
```sh
docker-compose up
```

If you want to connect to the running mongo instance for inspection:
```sh
docker exec -it $(docker ps | awk '$2~/mongo*/ { print $1 }') mongo -u $(grabEnv "MONGO_USERNAME") -p $(grabEnv "MONGO_PASSWORD")
```

Where `grabEnv` is something worth keeping in your PATH:
and grabs values from a local `.env` file
```sh
#!/bin/bash

find .env > /dev/null || { echo 'run in root of project'; exit 1; }

grep "$1" .env | sed -E "s/$1=(.*)/\1/"
```
