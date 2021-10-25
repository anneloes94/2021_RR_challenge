# Roserocket Challenge

## Setup

To start this application, run:

1. `docker-compose up -d`
  * this may take a few minutes...
  * backend container might crash a few times; it is expected to fail when the database container is not ready yet. Hence, it will crash a few times and the docker-compose will restart it.
2. Visit [http://localhost:3001](http://localhost:3001) :)

To access the database:

`docker-compose exec db bash` (exit with `exit`)
or access it through the backend: "http://localhost:3000/" (once the containers have been loaded).


## Known caveats/bugs

- Backend: currently, a patch request to `/orders/{id}` can only patch one value at the time (either driver_id, cost, or revenue).
- Frontend: UI does not adopt a responsive web design yet.
- Frontend: UI is not yet mobile friendly.
- This webapp can only be accessed from the machine it is deployed on (localhost). This is because the axios configuration is currently hard wired to use `localhost` whenever accessing the backend from the frontend (this can change to dynamically configure axios to use the current host's IP address instead).