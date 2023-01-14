#!/usr/bin/env bash

echo "Starting the application..."

#Permissoes para o diretorio
#Install dependencies
npm install
# Build the application
npm run build

# Apagando o pm2 para iniciar o novo
pm2 delete application-gestao-finaceira-api
# Start the application pm2
pm2 start --name "application-gestao-finaceira-api" dist/index.js 

echo "Application started!"
