import * as dotenv from 'dotenv';
import { sleepMinutes } from 'sleepjs';
import axios from 'axios';
import pkg from '@slack/bolt';
const { App, LogLevel } = pkg;

console.log(dotenv.config());

const channelID= process.env.SLACK_CHANNEL_ID!;
var timeToSleep = true;
var lastCreationDate = 0;

// Initialize app with bot token and signing secret in .env file
const app = new App({
  token: process.env.SLACK_BOT_TOKEN!,
  signingSecret: process.env.SLACK_SIGNING_SECRET!,
  logLevel: LogLevel.DEBUG,
  socketMode:true,
  appToken: process.env.SLACK_APP_TOKEN!
});

// App needs to listen for new StackExchange questions by tag
async function watchStackExchange() {
    var url: string = 'https://api.stackexchange.com/2.3/search?pagesize=1&order=desc&sort=creation';
    url += '&tagged=' + process.env.STACK_EXCHANGE_TAG!;
    url += '&site=' + process.env.STACKEXCHANGE!;

    if (lastCreationDate > 0) {
        url += '&fromdate=' + lastCreationDate
    } 

    //call the StackExchange API and send parsed response to Slack
    try {
        let res = await axios.get(url)
        let json = res.data;
        console.log(json);
        
        let link: string = json.items[0].link;
        let creationDate: number = json.items[0].creation_date;
        let title: string = json.items[0].title;

        if (creationDate > lastCreationDate) {
            lastCreationDate = creationDate += 1
        }

        sendQuestionToSlack(link, title);

    } catch (err) {
        console.error(err);
    } 
}

async function sendQuestionToSlack(link: string, title: string) {
    try {
        console.log('Sending to Slack');
        // Call the Slack 'chat.postMessage' method using the WebClient
        let result = await app.client.chat.postMessage({
            channel: channelID,
            text: '*New question on StackExchange:* \n'+title+' \n<'+link+'>',
            unfurl_links: true
        });

        console.log(result);

    } catch (err) {
        console.error(err);
    }   
}    

// Start the app
(async () => {
    await app.start(Number(process.env.PORT!)|| 3000);
    console.log('⚡️ StackExchangeBot is running!');

    while (timeToSleep = true) {
        watchStackExchange();
        await sleepMinutes(30);
    }
})(); 