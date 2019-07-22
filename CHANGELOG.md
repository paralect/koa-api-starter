## v2.3.0 (2019-07-22)

* Update dependencies
* Remove salt
* Add google authorization

## v2.2.0 (2019-07-04)

* Update dependencies
* Adjust docker-compose to start api only when mongo is loaded
* Adjust user schema and signup validators to allow signup and verifyEmail without name
* Update node version to LTS
* Add test docker-compose
* Implement auth for mongo
* Fix links in emails

## v2.1.0 (2018-08-19)

* Add ability to send signum and forgot password emails

## v2.0.0 (2018-06-16)

* Change approach for using validators
* Add start script
* Update npm dependencies

## v1.6.1 (2018-05-13)

* Update README
* Update npm dependencies

## v1.6.0 (2018-03-17)

* Update mongoDB version
* Update Mode.js version
* Update npm dependencies

## v1.5.3 (2018-02-14)

* Fix usage of the logger

## v1.5.2 (2018-02-02)

* Update npm dependencies

## v1.5.1 (2018-01-27)

* Update npm dependencies

## v1.5.0 (2017-12-23)

* Add resource for work with entity `user`.

## v1.4.0 (2017-11-06)

* Update dependencies
* Update tests

## v1.3.0 (2017-10-18)

* Update dependencies
* Replace `jsonshema` with `joi`
* Change location of the tests

**Bug fixes**

* Fix mongo connection string

## v1.2.1 (2017-10-17)

* Add promise unhandled rejection listener

## v1.2.0 (2017-10-08)

* Update modules

## v1.1.0 (2017-09-28)

* Add validation of the schema in the validator using [Joi](https://github.com/hapijs/joi).
* Add tests for all requests in the endpoint `/account`

**Bug fixes**

* Fixed: work of the controller for endpoint `/account`
