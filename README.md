# Locadoras de veículos

## Requisitos

É necessário ter o Docker e docker-compose instalado* e configurado na máquina.

> ***Obs:** na versão 3.2.1 em diante do Docker, o docker-compose se integrou ao CLI da ferramenta por padrão. Então, se você está usando esta versão em diante, não precisará necessariamente ter o plugin docker-compose instalado. 
Como até o momento há retro-compatibilidade entre os comandos, usaremos nesta documentação a sintaxe antiga **(docker-compose)**.

# Imagens

Uma imagem do projeto é automaticamente gerada e publicada no Docker Hub quando um **Push** é feito ou um **Pull Request** aceito na branch _main_ usando o CI/CD do GitHub Actions.

Elas podem ser encontradas no link abaixo:

> https://hub.docker.com/repository/docker/caioqf/locadora_challenge

## Rodando o projeto

- Clonar o repositorio
````
$ git clone https://github.com/caioqf/locadora_challenge.git
````

- Entrar na pasta do projeto
````
$ cd locadora_challenge
````

- Rodar o comando abaixo:
````
$ docker-compose up --build
````
## Reiniciar

As _seeds_ (população do banco de dados) nao são desfeitas quando o container do docker é parado, então para rodar o projeto novamente, é necessário seguir os seguintes passos:
````
$ docker-compose down -v
````
depois...
````
$ docker-compose up --build
````
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

## TO-DO

- Melhorar o CI/CD do projeto
	- Personalizar os gatilhos do pipeline:
		- Apenas iniciar quando hover mudanças em alguns arquivos específicos.
	- Diversificar as imagens em ambientes diferentes:
		- Quando um **Pull Request / Push** para branch "_main_", publicar a imagem com o sufixo _prod (produção)
		- Quando um **Push** para branch "_dev_", publicar a imagem com o sufixo _homo (homologação/dev)
- Mudar envs do docker-compose.yml
- Testar tudo
- Homogenizar totalmente a recebimento/devolução de dados (REST)

