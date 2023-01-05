# GraphQL

- Un lenguaje que complementa las API's existentes del lado del server
- Es agnostico a la tecnología usada. Mientras los datos sigan una forma definida manda y recibe datos del cliente sin problemas
- Operaciones: Queries (leer data), Mutaciones (escribe data), Suscripciones (usa websocket para escuchar modificaciones de datos en tiempo real)
- Reduce la cantidad de información que un developer necesita para consumir una API (un único endpoint, menos operaciones y documentación autogenerada)
- FB, TW, paypal usan graphQL en algunos servicios
- Permite un mayor control de la cantidad de información pedida y mandada al cliente
  - Usando rest apis el getItems nos devuelve un array de items -> ignoramos los datos que no queremos mostrar
  - graphQl nos permite hacer un post (con un request-body específico) a un único endpoint especificando los recursos que necesitamos
