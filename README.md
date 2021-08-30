# stackexchange-monitor
A Slack app that monitors StackExchange and publishes new questions by tag to designated Slack channels.

![Slack image](./img/example_slack.png)

Inspired by [this](https://github.com/dunglas/stack2slack).

## Installation
### Setup for Heroku
#### Create new Slack app
Go [here](https://api.slack.com/apps/) and click on 'Create New App'. Choose the 'From scratch' option and name your bot whatever you'd like. Choose your workspace and then click 'Create App'.

#### Configure your Slack app
1. Click on 'OAuth & Permissions' on the left sidebar. Scroll down to 'Scopes' and add `chat:write` and `links:write` to 'Bot Token Scopes'. 

2. Scroll up and click on 'Install to Workspace' under 'OAuth Tokens for Your Workspace'.

3. Click on 'Socket Mode' Under 'Settings' on the left sidebar. Click the toggle switch to enable Socket Mode.

#### Clone this repo
`git clone https://github.com/fluffypill0w/stackexchange-monitor.git`

#### Deploy to Heroku
Make sure you are in the cloned folder:
`cd stackexchange-monitor && heroku create && git push heroku main`

#### Configure your Heroku app 
You'll need to set all of the variables listed in `.env.sample` as config variables in Heroku:
`heroku config:set SLACK_SIGNING_SECRET=XXX`
`heroku config:set SLACK_BOT_TOKEN=XXX`

## Contributing
### Install dependencies
`npm install`

### Compile
`npm run build`

### Build and start the app
`npm run start`