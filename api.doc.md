** Rotas **

[collection].js

Esse arquivo recebe filter, collection, body e method. A collection é definida pela rota chamada, o method é o metódo da requisição, o filter é um parâmetro adicional passado na query e o body vem no body.

Se você rodar um
GET /bets
Ele vai te devolver todas as apostas

Ao mesmo tempo se você rodar um

GET /users?filter="{id: "user_id"}"

Ele vai te devolver um array com todos os usuários com o id "user_id". (No caso do id só deveria retornar um elemento no array).

Além disso é possível realizar POST e PUT, onde o body é repassado para o supabase. No caso do POST o body deve ser o conteúdo à ser inserido. No caso do PUT o body deve ser o conteúdo à ser alterado

Além da [collection].js temos outras rotas que facilitam algumas operações comuns do nosso sistema. Como algumas das informações para a criação de registros são padrão, por exemplo o status, que deve iniciar sempre como aberto. Criei rotas para criar os registros automáticamente de forma que só temos que passar as informações que podem sofrer alteração. Dessa forma para criar uma aposta basta realizar um post na rota

POST /create-bet

Passando user_id, event_id, modality, odds, bet, bet_value, offer como parâmetro. (Para mais detalhes sobre os campos consultar Types.ts)

Além disso é possível criar um evento com

POST /create-event

Passando { name, teams, modality }

O usuário ainda deve sofrer alterações no scheema, mas a princípio ao passarmos { email, password, favorite_team } no

POST /create-user

Ele deve ser criado com sucesso.

Além da rota raíz e das rotas de criação de registro criei também duas rotas para manipular os eventos

POST /run-event

Que recebe { event_id, winner } onde event_id é o id do evento e winner é a posição do time vencedor no array [time1, time2, empate] e ele já realiza as alterações necessárias nas demais tabelas.

E temos também

PUT /update-event

Que recebe { odds, bet, bet_value, event_id }. Essa rota a princípio é acionada quando uma nova aposta é feita e ela atualiza as informações do evento, tal como payments, debts, bets e odds (Para mais detalhes sobre esses campos consultar Types.ts). Nesse caso os parâmetros que a rota recebe são todos referentes a uma nova aposta que foi feita, portanto odds se refere as odds no momento que o usuário apostou, bet se refere à opção que o usuário apostou, bet_value o valor apostado e event_id ao id do evento.
