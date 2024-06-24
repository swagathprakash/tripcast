# TRIPCAST

### Build the Application - run following 3 commands to setup backend

- Run command `make build` to build all the applications (database, migration, api).

### Run all application

- Run command `make serve` to run database and application server.
- After this server will start listening on port 4003

### Run all migrations

- Run command `make migrate-up` to run the migrations.

## DB Migrations

### How to create migration file?

The following make command will create the migration files.
We have to provide name for the migration file.

```shell
make migrate-create NAME=create_user_table

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
