# Online Bank web application

## Description

An SPA application for online bank

### Backend

REST API implemeted with C#, .NET MVC Framework and EF Core

MS SQL Server is used as database management system

### Frontend

Client side is built with HTML, CSS, TypeScript and ReactJS.

## How to run

The whole project can be started in Docker

To run application execute following commands in PowerShell:

```shell
> docker-compose build
> docker-compose up
```

## docker-compose

There are 8 Docker containers:

- sql-server - RDBMS Microsoft SQL Server
- init-db - creating database and tables if needed
- backend - REST API
- frontend - SPA
- sqlpad - web-based SQL editor for managing database
- nginx - redirecting all requests starting with /api/v1 to backend and all the others to frontend
- prometheus - backend monitoring
- grafana - visualizing data from prometheus

## Extras

Here you can find [API specification](./docs/openapi.yaml) is Swagger format

In directory /docs you can find documentation

In directory /scripts you can find SQL-scripts for creating database, tables and roles
