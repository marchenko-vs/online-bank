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

## Extras

Here you can find [API specification](./docs/openapi.yaml) is Swagger format

In directory /docs/ you can find documentation

In directory /scripts/ you can find scripts for creating tables and roles in DB

In directory /config/ you can find nginx configuration file for this project
