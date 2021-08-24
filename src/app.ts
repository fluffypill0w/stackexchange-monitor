import * as dotenv from 'dotenv';
import { App, LogLevel } from '@slack/bolt';
//import * as path from 'path';

console.log(dotenv.config());
// Initialize app with bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  logLevel: LogLevel.DEBUG
});

//app needs to listen for new posts by tag


(async () => {
  // Start your app
  await app.start(Number(process.env.PORT)|| 3000);

  console.log('⚡️ Bolt app is running!');
})();