FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /source

COPY --link ./OnlineBank.csproj .
RUN dotnet restore

COPY --link ./. .
RUN dotnet publish --no-restore -o /app

FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --link --from=build /app .
ENTRYPOINT ["dotnet", "./OnlineBank.dll"]
