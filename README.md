# TodoappFrontend

This is a Angular frontend application developed with Angular 12.0.5. to work with django backend service

## Requirements

npm
angular 12.0.5

## Development server

  `ng serve`  Navigate to `http://localhost:4200/`. 

or 

    docker build -t todoapp-frontend -f Dockerfile .

    docker run -t todoapp-frontend 

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

##Tech

LOCAL -> Git -> CI/CD(CircleCi)-->Trigger backend build -> Google VM

Any successfull build trigger backend build and tests as well before deploying
the kubernetes. "Trigger the Build Job" is the job name on circleci config.

##Notes

I learned a bit of angular development for this project to work as requested but i had some problems writing 
unit tests in angular. Created a mock api to test the services. But it might not fully satisfy the 
unit testing requirements. 

Deployment files: admin/

Circleci config: .circleci/
