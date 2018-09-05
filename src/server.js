const request = require('request');

const mongodbConnectionString = require('./config/config.json').mongodbConnectionString;

//Mongoose
global.mongoose = require('mongoose');
mongoose.connect(mongodbConnectionString);
const dbHotExchangeLib = require('./lib/mongodb/hot_exchange.js');

const url = 'https://api.coinmarketcap.com/v1/ticker/';


function parseAndSaveETHUSD() {
    request.get(url + 'ethereum/?convert=USD',
        async (error, response, body) => {
            if(error){
                console.log(`parseAndSaveETHUSD Error: ${error}`)
            } else if(response.statusCode === 200){

                if (!body || body.length < 2) {
                    console.log(`parseAndSaveETHUSD Error: Body empty : ${body}`)
                } else {
                    body = JSON.parse(body) || {};
                }

                if (!body[0].price_usd) {
                    console.log(`parseAndSaveETHUSD Error: price_usd empty`)
                } else {
                    dbHotExchangeLib.saveHotExchangeToMongoDb({ 'time': Math.floor(new Date / 1000), 'pair': 'ETH-USD', 'value': body[0].price_usd })
                        .catch(error=>console.error(`saveHotExchangeToMongoDb ${error}`));
                }
            } else {
                console.dir(response.statusCode);
                console.dir(response.statusMessage);
            }
        }
    );
}

function parseAndSaveBTCUSD(){
    request.get(url + 'bitcoin123/?convert=USD',
        async (error, response, body) => {
            if (error) {
                console.log(`parseAndSaveETHUSD Error: ${error}`)
            } else if(response.statusCode === 200){
                if (!body || body.length < 2) {
                    console.dir(`parseAndSaveETHUSD Error: Body empty : ${body}`);
                } else {
                    body = JSON.parse(body) || {};
                }

                if (!body[0].price_usd) {
                    console.dir(`parseAndSaveETHUSD Error: price_usd empty`);
                }  else {
                    dbHotExchangeLib.saveHotExchangeToMongoDb({
                        'time': Math.floor(new Date / 1000),
                        'pair': 'BTC-USD',
                        'value': body[0].price_usd
                    }).catch(error => console.error(`saveHotExchangeToMongoDb ${error}`));
                }
            } else {
                console.dir(response.statusCode);
                console.dir(response.statusMessage);
            }
        }
    );
}

function parseAndSaveLTCUSD(){
    request.get(url + 'litecoin/?convert=USD',
        async (error, response, body) => {

            if (error) {
                console.log(`parseAndSaveETHUSD Error: ${error}`)
            } else if(response.statusCode === 200){
                if (!body || body.length < 2) {
                    console.log(`parseAndSaveETHUSD Error: Body empty : ${body}`)
                } else {
                    body = JSON.parse(body) || {};
                }

                if (!body[0].price_usd) {
                    console.log(`parseAndSaveETHUSD Error: price_usd empty`)
                } else {
                    dbHotExchangeLib.saveHotExchangeToMongoDb({ 'time': Math.floor(new Date / 1000), 'pair': 'LTC-USD', 'value': body[0].price_usd })
                        .catch(error=>console.error(`saveHotExchangeToMongoDb ${error}`))
                }
            } else {
                console.log(response.statusCode);
                console.log(response.statusMessage);
            }
        }
    );
}

function parseAndSaveBTGUSD(){
    request.get(url + 'bitcoin-gold/?convert=USD',
        async (error, response, body) => {
            if (error) {
                console.log(`parseAndSaveETHUSD Error: ${error}`)
            } else if(response.statusCode === 200){
                if (!body || body.length < 2) {
                    console.log(`parseAndSaveETHUSD Error: Body empty : ${body}`)
                } else {
                    body = JSON.parse(body) || {};
                }

                if (!body[0].price_usd) {
                    console.log(`parseAndSaveETHUSD Error: price_usd empty`)
                } else {
                    dbHotExchangeLib.saveHotExchangeToMongoDb({ 'time': Math.floor(new Date / 1000), 'pair': 'BTG-USD', 'value': body[0].price_usd })
                        .catch(error=>console.error(`saveHotExchangeToMongoDb ${error}`))
                }
            } else {
                console.log(response.statusCode);
                console.log(response.statusMessage);
            }
        }
    );
}

function parseAndSaveBCHUSD(){
    request.get(url + 'bitcoin-cash/?convert=USD',
        async (error, response, body) => {
            if (error) {
                console.log(`parseAndSaveETHUSD Error: ${error}`)
            } else if(response.statusCode === 200){
                if (!body || body.length < 2) {
                    console.log(`parseAndSaveETHUSD Error: Body empty : ${body}`)
                } else {
                    body = JSON.parse(body) || {};
                }

                if (!body[0].price_usd) {
                    console.log(`parseAndSaveETHUSD Error: price_usd empty`)
                } else {
                    dbHotExchangeLib.saveHotExchangeToMongoDb({ 'time': Math.floor(new Date / 1000), 'pair': 'BCH-USD', 'value': body[0].price_usd })
                        .catch(error=>console.error(`saveHotExchangeToMongoDb ${error}`))
                }
            } else {
                console.log(response.statusCode);
                console.log(response.statusMessage);
            }
        }
    );
}

function parseAndSaveUSDT() {
    request.get(url.replace('/v1', '/v2') + '825/?convert=USD',
        async (error, response, body) => {
            if (error) {
                console.log(`parseAndSaveUSDT Error: ${error}`)
            } else if(response.statusCode === 200){
                if (!body) {
                    console.log(`parseAndSaveUSDT Error: Body empty : ${body}`)
                } else {
                    body = JSON.parse(body) || {};
                }

                if (!body.data || !body.data.quotes
                    || !body.data.quotes.USD || !body.data.quotes.USD.price) {
                    console.log(`parseAndSaveUSDT Error: price empty`)
                } else {
                    dbHotExchangeLib.saveHotExchangeToMongoDb({ 'time': Math.floor(new Date / 1000), 'pair': 'USDT-USD', 'value': body.data.quotes.USD.price })
                        .catch(error=>console.error(`saveHotExchangeToMongoDb ${error}`))
                }
            } else {
                console.log(response.statusCode);
                console.log(response.statusMessage);
            }
        }
    );
}