import * as dotenv from 'dotenv';
import { sleepMinutes } from 'sleepjs';
import * as axios from 'axios';
import { Response } from './utils/structTypes';
import pkg from '@slack/bolt';
import { error } from 'console';
import { response } from 'express';
const { App, LogLevel } = pkg;

console.log(dotenv.config());

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
    //axios.get apparently decided not to be a method today :'(
        var stackResponse = JSON.parse(JSON.stringify(await axios.get(url)))
        //sendQuestionToSlack(stackResponse);
        console.log(stackResponse);
    } catch (error) {
        console.error('error');
    }
}
/*
function sendQuestionToSlack(stackResponse: Response) {
    try {
        console.log('Sending to Slack');
        for (let Items of stackResponse.Items) {
            // Call the chat.postMessage method using the WebClient
            let result = app.client.chat.postMessage({
                channel: 'C02BKJ2B4AK',
                text: 'New question on <'+Items.Link+'> StackExchange',
                unfurl_links: true
            });

            if (Items.CreationDate > lastCreationDate) {
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
        sleepMinutes(30);
    }
})(); 