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

## Endpoints relevantes:

- Transferir o veículo de locadora
````
PATCH /vehicle/transfer

Body:

{
	"vehicle_id": 2,
	"new_locator_id": 1
}
````

- LOG todos veículos
````
GET /vehicle/logs/all
````

- LOG quantidade veículos por locadora
````
GET /locadora/logs/all
````

## Nota

Infelizmente nem todos os requisitos do arquivo foram contemplados. Mas eis o que foi possivel fazer. 
