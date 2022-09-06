# Locadoras de veículos

## Requisitos

É necessário ter o Docker e docker-compose instalado e configurado na máquina.

## Rodar

- Clonar o repositorio
- Entrar na pasta do projeto
- Rodar o comando abaixo:

> $ docker-compose up --build

## Reiniciar

As seeds nao são desfeitas quando o container do docker é destruido, então para rodar o projeto novamente, é necessário seguir os seguintes passos:

> $ docker-compose down -v

depois..
> $ docker-compose up --build

## Notas


