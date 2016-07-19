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
  - pushbullet : set pushbullet API key in an environment variable named `PB_API_KEY` and device iden  in `PB_DEVICE_IDEN`
3. run `$ node index`

Best prectice is to run using [PM2](https://www.npmjs.com/package/pm2):

```
$ git clone git@github.com:CommonRaven/PokePush.git
$ cd PokePush
$ npm i
$ npm i -g pm2
$ PB_API_KEY=your_key PB_DEVICE_IDEN="" SLACK_URL="http://example.com pm2 start index.js"
```
