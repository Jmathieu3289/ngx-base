# ngx-base
A base project template for creating Angular/Node apps with CircleCI and AWS

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.0.

## Getting Started

Before running the project for the first time, complete all of the following steps.

### .env file

Create a file `.env` in the root project directory: Fill in the following details:

```
MYSQL_HOST=[Your MySQL Host]
MYSQL_USER=
MYSQL_PASSWORD=
MYSQL_DATABASE=[Default DB to load]
SESSION_SECRET=[Anything you want can go here]
```
### Create an elasticbeanstalk instance

Under `Confuration -> Software` create environment variables to match above.

### AWS User

In the AWS management console, go to IAM. Create a user called circle-ci. Give this new user a group, and add the AWSElasticBeanstalkFullAccess policy. Create an access key, and use it
in CircleCI.

### Update the `.elasticbeanstalk/.config.yml` file

`environment`: Your elasticbeanstalk environment name, typically ends in -env
`application name`: Your elasticbeanstalk app name
`default_ec2_keyname`: Create a keypair under EC2, and then under EBS->Configuration->Security choose your virtual machine key pair.

### Install dependencies

Run `npm install` before starting the project.

## Using This Project

### Node server

Run `node server.js` in a vs code debug to start the node server. Navigate to `http://localhost:3000`.

### Development server

Run `npm run serve` for a dev server. Navigate to `http://localhost:4201/`. The app will live reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `public/` directory. Use the `-prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
