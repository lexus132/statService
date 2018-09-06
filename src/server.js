const request = require('request');
const fs = require ('fs-extra');
const mongodbConnectionString = require('./config/config.json').mongodbConnectionString;

const logFile = __dirname + `/logs/error.log`;
fs.createFileSync(logFile);

//Intel logger setup
const intel = require('intel');
const StatsError = intel.getLogger('StatsError');
StatsError.setLevel(StatsError.ERROR).addHandler(new intel.handlers.File(logFile));

//Mongoose
global.mongoose = require('mongoose');
mongoose.connect(mongodbConnectionString);
const dbHotExchangeLib = require('./lib/mongodb/hot_exchange.js');

const url = 'https://api.coinmarketcap.com/v1/ticker/';

function parseAndSaveETHUSD() {
    request.get(url + 'ethereum/?convert=USD',
        async (error, response, body) => {
            if(error){
                return StatsError.error(`parseAndSaveETHUSD Error: ${error}`)
            } else if(response.statusCode === 200){

                if (!body || body.length < 2) {
                    return StatsError.error(`parseAndSaveETHUSD Error: Body empty : ${body}`)
                } else {
                    body = JSON.parse(body) || {};
                }

                if (!body[0].price_usd) {
                    return StatsError.error(`parseAndSaveETHUSD Error: price_usd empty`)
                } else {
                    dbHotExchangeLib.saveHotExchangeToMongoDb({ 'time': Math.floor(new Date / 1000), 'pair': 'ETH-USD', 'value': body[0].price_usd })
                        .catch(error=>StatsError.error(`saveHotExchangeToMongoDb ${error}`));
                }
            } else {
                return StatsError.error(`parseAndSaveETHUSD Error: statusCode: ${response.statusCode}`)
            }
        }
    );
}

function parseAndSaveBTCUSD(){
    request.get(url + 'bitcoin123/?convert=USD',
        async (error, response, body) => {
            if (error) {
                return StatsError.error(`parseAndSaveETHUSD Error: ${error}`)
            } else if(response.statusCode === 200){
                if (!body || body.length < 2) {
                    return StatsError.error(`parseAndSaveETHUSD Error: Body empty : ${body}`)
                } else {
                    body = JSON.parse(body) || {};
                }

                if (!body[0].price_usd) {
                    return StatsError.error(`parseAndSaveETHUSD Error: price_usd empty`)
                }  else {
                    dbHotExchangeLib.saveHotExchangeToMongoDb({
                        'time': Math.floor(new Date / 1000),
                        'pair': 'BTC-USD',
                        'value': body[0].price_usd
                    }).catch(error => StatsError.error(`saveHotExchangeToMongoDb ${error}`));
                }
            } else {
                return StatsError.error(`parseAndSaveETHUSD Error: statusCode: ${response.statusCode}`)
            }
        }
    );
}

function parseAndSaveLTCUSD(){
    request.get(url + 'litecoin/?convert=USD',
        async (error, response, body) => {

            if (error) {
                return StatsError.error(`parseAndSaveETHUSD Error: ${error}`)
            } else if(response.statusCode === 200){
                if (!body || body.length < 2) {
                    return StatsError.error(`parseAndSaveETHUSD Error: Body empty : ${body}`)
                } else {
                    body = JSON.parse(body) || {};
                }

                if (!body[0].price_usd) {
                    return StatsError.error(`parseAndSaveETHUSD Error: price_usd empty`)
                } else {
                    dbHotExchangeLib.saveHotExchangeToMongoDb({ 'time': Math.floor(new Date / 1000), 'pair': 'LTC-USD', 'value': body[0].price_usd })
                        .catch(error=>StatsError.error(`saveHotExchangeToMongoDb ${error}`))
                }
            } else {
                return StatsError.error(`parseAndSaveETHUSD Error: statusCode : ${response.statusCode}`)
            }
        }
    );
}

function parseAndSaveBTGUSD(){
    request.get(url + 'bitcoin-gold/?convert=USD',
        async (error, response, body) => {
            if (error) {
                return StatsError.error(`parseAndSaveETHUSD Error: ${error}`)
            } else if(response.statusCode === 200){
                if (!body || body.length < 2) {
                    return StatsError.error(`parseAndSaveETHUSD Error: Body empty : ${body}`)
                } else {
                    body = JSON.parse(body) || {};
                }

                if (!body[0].price_usd) {
                    return StatsError.error(`parseAndSaveETHUSD Error: price_usd empty`)
                } else {
                    dbHotExchangeLib.saveHotExchangeToMongoDb({ 'time': Math.floor(new Date / 1000), 'pair': 'BTG-USD', 'value': body[0].price_usd })
                        .catch(error=>StatsError.error(`saveHotExchangeToMongoDb ${error}`))
                }
            } else {
                return StatsError.error(`parseAndSaveETHUSD Error: statusCode : ${response.statusCode}`)
            }
        }
    );
}

function parseAndSaveBCHUSD(){
    request.get(url + 'bitcoin-cash/?convert=USD',
        async (error, response, body) => {
            if (error) {
                return StatsError.error(`parseAndSaveETHUSD Error: ${error}`)
            } else if(response.statusCode === 200){
                if (!body || body.length < 2) {
                    return StatsError.error(`parseAndSaveETHUSD Error: Body empty : ${body}`)
                } else {
                    body = JSON.parse(body) || {};
                }

                if (!body[0].price_usd) {
                    return StatsError.error(`parseAndSaveETHUSD Error: price_usd empty`)
                } else {
                    dbHotExchangeLib.saveHotExchangeToMongoDb({ 'time': Math.floor(new Date / 1000), 'pair': 'BCH-USD', 'value': body[0].price_usd })
                        .catch(error=>StatsError.error(`saveHotExchangeToMongoDb ${error}`))
                }
            } else {
                return StatsError.error(`parseAndSaveETHUSD Error: statusCode : ${response.statusCode}`)
            }
        }
    );
}

function parseAndSaveUSDT() {
    request.get(url.replace('/v1', '/v2') + '825/?convert=USD',
        async (error, response, body) => {
            if (error) {
                return StatsError.error(`parseAndSaveUSDT Error: ${error}`)
            } else if(response.statusCode === 200){
                if (!body) {
                    return StatsError.error(`parseAndSaveUSDT Error: Body empty : ${body}`)
                } else {
                    body = JSON.parse(body) || {};
                }

                if (!body.data || !body.data.quotes
                    || !body.data.quotes.USD || !body.data.quotes.USD.price) {
                    return StatsError.error(`parseAndSaveUSDT Error: price empty`)
                } else {
                    dbHotExchangeLib.saveHotExchangeToMongoDb({ 'time': Math.floor(new Date / 1000), 'pair': 'USDT-USD', 'value': body.data.quotes.USD.price })
                        .catch(error=>StatsError.error(`saveHotExchangeToMongoDb ${error}`))
                }
            } else {
                return StatsError.error(`parseAndSaveUSDT Error: statusCode : ${response.statusCode}`)
            }
        }
    );
}