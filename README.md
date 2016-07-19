# PokePush
Temporary, tiny pokemon GO server status updated via Pushbullet / Slack.
This verion relies on https://status.pokemongoserver.com, and won't sample the server directly.

## Running

1. Clone repo.
2. there are 2 types of integrations available:
  - slack
  - pushbullet
2. Set your integration key (an integration that is not configured will not be activated):
  - slack : set Webhook URL in an environment variable names `SLACK_URL`.
  - pushbullet : set pushbullet device iden in an environment variable named `PUSHBULLET_KEY`.
3. run `$ node index`

Best prectice is to run using [PM2](https://www.npmjs.com/package/pm2):

```
$ git clone git@github.com:CommonRaven/PokePush.git
$ cd PokePush
$ npm i
$ npm i -g pm2
$ PUSHBULLET_KEY=your_key SLACK_URL=http://example.com pm2 start index.js
```
