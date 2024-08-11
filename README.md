# StayFit
StayFit Workout App

# Database
- food collection:
    in order to import food json file into the mongo container you should use these 2 commands in the cmd window in the project path:
        1. docker cp foodJson.json 1fcb29a2572c:/tmp/foodJson.json (copy the json file into the container's environment)
        2. docker exec 1fcb29a2572c mongoimport -u root -p example --authenticationDatabase admin -d myDatabase -c food --file /tmp/foodJson.json (run import command into the food collection in the database)
        *note: the container id is the mongo container id.