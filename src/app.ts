import * as dotenv from 'dotenv';
import { sleepMinutes } from 'sleepjs';
import axios from 'axios';
import { Item, Response } from './utils/structTypes';
import pkg from '@slack/bolt';
const { App, LogLevel } = pkg;

//console.log(dotenv.config());

//const channelID = process.env.SLACK_CHANNEL_ID;
var timeToSleep = true;
var lastCreationDate = 0;

// Initialize app with bot token and signing secret in .env file
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  //appToken: process.env.SLACK_APP_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  logLevel: LogLevel.DEBUG
});

// App needs to listen for new StackExchange questions by tag
async function watchStackExchange() {
    var url: string = 'https://api.stackexchange.com/2.3/search/advanced?order=desc&sort=creation';
    url += '&tagged=' + process.env.STACK_EXCHANGE_TAG;
    url += '&site=' + process.env.STACKEXCHANGE;

    if (lastCreationDate > 0) {
        url += '&todate=' + lastCreationDate
    } else {
        url += '&pagesize=1'
    }

    //call the StackExchange API and send parsed response to Slack
    try {
        let res = await axios.get(url)
        let stackResponse: Item = res.data;
        console.log(stackResponse);
        //sendQuestionToSlack(stackResponse);
    } catch (error) {
        console.error('error');
    }
}
/*
function sendQuestionToSlack(stackResponse: Item) {
    try {
        console.log('Sending to Slack');
        for (let entry of stackResponse.entry) {
            // Call the chat.postMessage method using the WebClient
            let result = app.client.chat.postMessage({
                channel: 'C02BKJ2B4AK',
                text: 'New question on <'+Item.Link+'> StackExchange',
                unfurl_links: true
            });

            if (Item.CreationDate > lastCreationDate) {
                lastCreationDate = Items.CreationDate
            }

            console.log(result);
        }
    } catch (error) {
        console.error(error);
    }
}    
*/
// Start the app
(async () => {
    await app.start(Number(process.env.PORT)|| 3000);
    console.log('⚡️ StackExchangeBot is running!');

    while (timeToSleep = true) {
        watchStackExchange();
        timeToSleep = false;
        await sleepMinutes(30);
        timeToSleep = true;
    }
})(); 