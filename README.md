# Koa.JS REST api starter

[![Stack](https://raw.githubusercontent.com/paralect/stack/master/stack-component-template/stack.png)](https://github.com/paralect/stack)

[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Build Status](http://product-stack-ci.paralect.com/api/badges/paralect/koa-api-starter/status.svg)](http://product-stack-ci.paralect.com/paralect/koa-api-starter)
[![David Dependancy Status](https://david-dm.org/paralect/koa-api-starter.svg)](https://david-dm.org/paralect/koa-api-starter)

[![Watch on GitHub](https://img.shields.io/github/watchers/paralect/koa-api-starter.svg?style=social&label=Watch)](https://github.com/paralect/koa-api-starter/watchers)
[![Star on GitHub](https://img.shields.io/github/stars/paralect/koa-api-starter.svg?style=social&label=Stars)](https://github.com/paralect/koa-api-starter/stargazers)
[![Follow](https://img.shields.io/twitter/follow/paralect.svg?style=social&label=Follow)](https://twitter.com/paralect)
[![Tweet](https://img.shields.io/twitter/url/https/github.com/paralect/koa-api-starter.svg?style=social)](https://twitter.com/intent/tweet?text=I%27m%20using%20Stack%20components%20to%20build%20my%20next%20product%20🚀.%20Check%20it%20out:%20https://github.com/paralect/stack)

Fully featured [Koa.JS](http://koajs.com/) restful api starter application.
The goal of this project is to solve all routine tasks and keep your focus on the product and business logic of the application, not on the common things, such logging, configuration, dev/production environments

Out of the box support following features:

1. Config management.
2. Configured console logger based on  [common-logger](https://www.npmjs.com/package/@paralect/common-logger)
3. Automatic application restart when code changes with [Nodemon](https://github.com/remy/nodemon)
4. MongoDB configuration
5. Docker configuration for development and production environments.
6. Code linting based on [paralect/eslint-config](https://github.com/paralect/eslint-config)
7. Simplified request data validation and clean up based on [joi](https://github.com/hapijs/joi) and [koa-validate](https://www.npmjs.com/package/koa-validate)
8. Production ready account API resource (singup, signin, forgot password, reset password functionality)
9. JWT based authentication.
10. Tests for endpoints.

### Starting api

To start the project just run: `npm run development`. This command will start application on port `3001` and will automatically restart whenever you change any file in `./src` directory.

### Explanations of the files structure

We try to keep things as simple as possible, so you can focus on building product instead of learning concepts.

There are two main directories within project:
1. [src/config](./src/config) - consist of configuration for the [environment](./src/config/index.js), [koa server](./src/config/koa.js) and [API routes](./src/config/routes).
2. [src/config/routes](./src/config/routes) - consist of [public](./src/config/routes/public.js) (don't require jwt token) and [authenticated](./src/config/routes/authenticated.js) (require jwt token) routes and [middlewares](./src/config/routes/middlewares).
  - [middlewares](./src/config/routes/middlewares) - koa middlewares which we use on every request (for example, get current user data from the database)
3. [src/resources](./src/resources) - REST api resources and everything related to the resource:
  - [database service](./src/resources/user/user.service.js) - resource service to work with database (MongoDB or other database)
  - [database schema](./src/resources/user/user.schema.js) - database schema for the resource entity.
  - [validators](./src/resources/account/validators/signup.validator.js) - request validation logic.
  - [controllers](./src/resources/account/account.controller.js) - the central place for the request handling and data manipulation.
  - [builders](./src/resource/user/user.builder.js) - creating database documents for testing.
  - [factory](./src/resource/user/user.factory.js) - predefined types of database documents for testing.
  - [tests](./src/resource/user/user.spec.js) - mocha tests for the endpoint.

All other files, that does not fit that structure should be placed straight in the `src` folder. We can always introduce more folders as we need them. Currently root folder consist following:

1. [src/app.constants.js](./src/app.constants.js) - constant variables that are used in the application
2. [src/app.js](./src/app.js) - starting point of the node.js application. It combine application configuration and start Koa http listener.
3. [src/auth.service.js](./src/auth.service.js) - JWT based authentication helper. Consist logic of JWT token encryption/decryption. Can consist other authentication related functions.
4. [src/db.js](./src/db.js) - handles connection to the MongoDB.
5. [src/email.service.js](./src/email.service.js) - fake service for sending application emails.
6. [src/logger.js](./src/logger.js) - application logger.
7. [src/security.util.js](./src/security.util.js) - number of methods for generating secure tokens and comparing passwords with password hash.

### List of improvements

1. Implement email service.

## License

Koa.JS REST api starter is released under the [MIT License](LICENSE).

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

Join us and share something developers need 👌.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars2.githubusercontent.com/u/6461311?v=4" width="100px;"/><br /><sub><b>Evgeny Zhivitsa</b></sub>](https://github.com/ezhivitsa)<br />[💻](https://github.com/paralect/koa-api-starter/commits?author=ezhivitsa "Code") [📖](https://github.com/paralect/koa-api-starter/commits?author=ezhivitsa "Documentation") [🤔](#ideas-ezhivitsa "Ideas, Planning, & Feedback") [👀](#review-ezhivitsa "Reviewed Pull Requests") [⚠️](https://github.com/paralect/koa-api-starter/commits?author=ezhivitsa "Tests") | [<img src="https://avatars3.githubusercontent.com/u/681396?v=4" width="100px;"/><br /><sub><b>Andrew Orsich</b></sub>](http://paralect.com)<br />[📖](https://github.com/paralect/koa-api-starter/commits?author=anorsich "Documentation") [🤔](#ideas-anorsich "Ideas, Planning, & Feedback") [👀](#review-anorsich "Reviewed Pull Requests") | [<img src="https://avatars3.githubusercontent.com/u/2302873?v=4" width="100px;"/><br /><sub><b>Ihar</b></sub>](https://github.com/IharKrasnik)<br />[💻](https://github.com/paralect/koa-api-starter/commits?author=IharKrasnik "Code") [🤔](#ideas-IharKrasnik "Ideas, Planning, & Feedback") |
| :---: | :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!
