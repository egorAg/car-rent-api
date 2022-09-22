# CAR RENT

### Requirements
- for Linux/Windows
    - docker engine
    - docker
- for macOS
    - docker engine
    - docker-compose

### Docs

- Swagger docs available only after docker compose build && run via link below
    - [Swagger](http://localhost:5001)

### How to run

- #### Step 1
    - setup config [.env file](.env) like on example below
        - ```dotenv
           PORT=5001
           DATABASE_HOST=database
           DATABASE_PORT=5432
           DATABASE_NAME=car-rent-database
           DATABASE_USER=postgres
           DATABASE_PASSWORD=admin
          ```
- #### Step 2
    - For macOS use next command in project directory
        - ```bahs
          docker-compose up --build
          ```
    - For Linux/Windows use next command in project directory
        - ```bahs
          docker compose up --build
          ```