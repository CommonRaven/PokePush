# PokePush
Temporary, tiny pokemon GO server status updated via Pushbullet.
This verion relies on https://status.pokemongoserver.com, and won't sample the server directly.

## Running

1. Clone repo.
2. Set your pushbullet key in an environment variable named `PUSHBULLET_KEY`.
3. run `$ node index`

Best prectice is to run using [PM2](https://www.npmjs.com/package/pm2):

```shell
$ PUSHBULLET_KEY=your_key pm2 start index.js
```
