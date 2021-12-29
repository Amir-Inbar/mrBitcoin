import axios from 'axios';
import { storageService } from './storageService';

export const bitcoinService = {
  getRate,
  getMarketPrice,
  getTradeVolume,
  getCurrenciesData,
};

async function getRate(coins = 1) {
  try {
    const res = await axios.get(`
      https://blockchain.info/tobtc?currency=USD&value=${coins}
    `);
    const rate = res.data;
    return rate;
  } catch (err) {
    console.log('err', err);
    throw err;
  }
}
async function getCurrenciesData() {
  let marketChange = storageService.load('marketChange')
  if(marketChange) return marketChange
  try{
    const res = await axios.get('http://api.coinlayer.com/api/live?access_key=7e6842a7d2be7dfe04a8e1d08a39e4c5')
    storageService.store('marketChange',res.data.rates)
    console.log(res);
    return res.data.rates
  }
  catch(err) {
    console.log('err', err);
    throw err;
    }
}

async function getMarketPrice() {
  let marketPrice = storageService.load('marketPrice');
  if (marketPrice) return marketPrice;
  try {
    marketPrice = await axios.get(`
    https://api.blockchain.info/charts/market-price?format=json&cors=true    `);
    storageService.store('marketPrice', marketPrice.data);
    return marketPrice.data;
  } catch (err) {
    console.log('err', err);
    throw err;
  }
}

async function getTradeVolume() {
  let tradeVolume = storageService.load('tradeVolume');
  if (tradeVolume) return tradeVolume;
  try {
    tradeVolume = await axios.get(`
    https://api.blockchain.info/charts/trade-volume?timespan=5weeks&rollingAverage=8hours&format=json&cors=true
  `);
    storageService.store('tradeVolume', tradeVolume.data);
    return tradeVolume.data;
  } catch (err) {
    console.log('err', err);
    throw err;
  }
}
