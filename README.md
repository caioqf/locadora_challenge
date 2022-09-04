# Locadora de veículos

## Requisitos

É necessário ter o Docker e docker-compose instalado e configurado na máquina.

## Rodar

- Clonar o repositorio
- Entrar na pasta do projeto
- Rodar o comando abaixo:

> $ docker-compose up --build

## Reiniciar

- É necessário remover os volumes do banco para proxima seed rodar sem erros de constraints: 

> $ docker-compose down -v

depois..
> $ docker-compose up --build

## To-do

## Notas

Rodar migrations: 

- knex migrate:make teste --env=dev --knexfile=db/knexfile.ts
