# infinity2o.com

## Setup

1. `node -v` = v8.9.3 & `npm -v` = 5.6.0
2. `heroku -v` = `heroku-cli/6.15.13-3dce47c (darwin-x64) node-v9.3.0`

## Backend & frontend development setup

mlab.com databases:

1. infinity2o-dev username = `infinity2o-dev` & password = `2134711p`
2. emaily-prod username = `infinity2o-prod` & password = `mxFxxxxxIxxxx`

OAuth:

1. login `console.developers.google.com` with `q42liu@gmail.com`

Stripe.com login:

1. login `stripe.com` with `q1over12@gmail.com` & password = `mxxxxFxxxxxIxxxxxx`

Sendgrid.com login:

1. login `Sendgrid.com` with `q1over12@gmail.com` & password = `mxxxxFxxxxxIxxxxxx`

Setup:

1. `cd infinity2o_server` then `npm run dev`

## Development workflow checklists

1. what do u want to add?
2. create `actions/types`
3. create `actions/actionCreator.js`
4. deal with action type in `reducers/actionReducer.js`
5. add `reducers/actionReducer.js` to `reducers/index.js`
6. if state changes add `mapStateToProps` in `components/Component.js`
7. if added functions to change state add `mapDispatchToProps` in `components/Component.js`

1) What do u want to remove?

1) What do u want to change?

## Deployment checklist

1. `cd infinity2o_server`
2. `gitsync`
3. `heroku login` username = `qn1over12@gmail.com` & password = `exxxxxIxxFxxx`
4. `git push heroku master`

## Useful links

[HTTP status codes](https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html)
