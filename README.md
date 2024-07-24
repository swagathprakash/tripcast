# TRIPCAST

Tripcast is a Google Gemini based mobile application that generates weather based trip itenerary according to users inputs like trip destination, trip start and end dates. Application provides a complete itenarary based on the weather condition for those days.

Users can also search for popular attractions in a city and its current weather

### Build backend application

- Run command `make start-server` to build all the applications (database, migration, api).
- After this, server will start listening on port 4003

### Run all migrations

- Run command `make migrate-up` to run the migrations.

### Start frontend application

- Run command `make node` to build node modules.
- Run command `make start-app` to start front end application and generate connection QR-code.
- Use expo mobile app to scan the QR-code and start the mobile app

## DB Migrations

### How to create migration file?

The following make command will create the migration files.
We have to provide name for the migration file.

```shell
make migrate-create name=create_user_table

/migrations/1690546735_create_user_table.up.sql
/migrations/1690546735_create_user_table.down.sql
```

### How to execute migrations using make commands?

We can use the following make commands to do up and down migrations.

```shell
# To migrate up to the latest version, run
make migrate-up

# To migrate down all the version, run
make migrate-down

# To migrate up by count versions, run:
make migrate-up count=1

# To migrate down by count versions, run:
make migrate-down count=1

# To see the current version, run:
make migrate-version

```
