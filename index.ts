import { sleepMinutes } from 'sleepjs'; 
import * as dotenv from 'dotenv';
import * as slack from '@slack/web-api';

public class SlackBot {
    constructor() {
        dotenv.config();
        const apiToken = process.env.SLACK_API_TOKEN;
        const stackExchangeQueried = process.env.STACKEXCHANGE;
        const tagToChannel = process.env.TAG_TO_CHANNEL;
    
        let tagToChannelName = new Map();
    
        runSlackClient(apiToken, tagToChannelName, stackExchangeQueried);
    }
}

function runSlackClient(
    apiToken: string,
    tagToSlackChannel: string, 
    stackExchangeQueried: string
    ): void {
    const api = new slack.WebClient(apiToken);
    
    //Logic to pipe new entries by tag into slack channel
    queryStackAPI(api, tagToChannelName, stackExchangeQueried);
}

function queryStackAPI(
    api: *slack.WebClient,
    tagToChannelName: map,
    stackExchangeQueried: string
    ): void {
    
    //Logic to call to StackExchange API to return new questions by tag
    sleepMinutes(10);
}