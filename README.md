# DocAssist

### Dependências

| Dependência | Versão                 |
| ----------: | :--------------------- |
|        Ruby | 2.6.0                  |
|     MongoDB | 3.6.3 ou mais recente  |
|       Redis | 4.0.9 ou mais recente  |

### Como rodar o ambiente de desenvolvimento

Depois de instalar as dependências, você deverá clonar o projeto, através do seguinte comando no terminal:

```sh
$ git clone git@gitlab.com:joaogardenberg/docassist.git -b master DocAssist
```

Depois disso, você deverá abrir um terminal na pasta raiz do projeto e digitar os seguintes comandos:

```sh
$ bundle install
```

```sh
$ yarn
```

```sh
$ rails s
```

Basta então entrar no endereço:

```
http://localhost:3000/
```

### Como fazer deploy para o Heroku

Primeiramente você precisa ter o [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) instalado.

Para criar o projeto, basta digitar o seguinte comando num terminal na pasta raiz do projeto:

```sh
$ heroku create
```

Uma vez feito isso, não há a necessidade de fazer de novo a cada deploy.

Em seguida, para fazer o deploy, digite:

```sh
$ git push heroku master
```

Para abrir o Heroku no seu browser direto na página do projeto, digite:

```sh
$ heroku open
```
