const express = require('express')
const app = express()
const cors = require('cors')
// const { default: Moralis } = require('moralis')
const Moralis = require('moralis').default;
const {EvmChain} = require('@moralisweb3/common-evm-utils')
const port = 8080
require('dotenv').config()

app.use(cors())

const MORALIS_API_KEY = process.env.MORALIS_API_KEY
const testAddress = '0xef46D5fe753c988606E6F703260D816AF53B03EB'
const activeChain = EvmChain.POLYGON

app.get('/', (req, res) => {
  console.log('get request...')
  res.send('hello!')
})

app.get('/nativeBalance', async (req, res) => {
  try {
    // query
    // localhost:8080/nativeBalance?address=***&chain=***
    const { address, chain} = req.query
    console.log(address, chain);
    // console.log(typeof chain);

    console.log('processing request...');

    const balanceResponse = await Moralis.EvmApi.balance.getNativeBalance({
      address: address,
      // chain: 0x89
      // chain: 137
      chain: chain,
      // chain: activeChain,
      // chain: Number('0x89')
    })
    // console.log(response.toJSON())
    const nativeBalance = balanceResponse.result.balance.ether;
    // console.log(nativeBalance)

    let nativeCurrency;
    if (activeChain.hex === '0x1') {
      nativeCurrency = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';
    } else if (activeChain.hex === '0x89') {
      nativeCurrency = '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270';
    }
    // console.log(nativeCurrency)

    const tokenResponse = await Moralis.EvmApi.token.getTokenPrice({
      address: nativeCurrency,
      chain: activeChain
    })
    const usdPrice = tokenResponse.result.usdPrice;

    const finalResponse = {nativeBalance, usdPrice}
    console.log('sending response...');
    res.send(finalResponse);
  } catch (err) {
    res.send(err);
  }
})

app.get('/tokenBalances', async (req, res) => {
  try {
    // query
    // localhost:8080/nativeBalance?address=***&chain=***
    const { address, chain} = req.query
    console.log(address, chain);
    // console.log(typeof chain);

    console.log('processing request...');

    const tokenBalances = await Moralis.EvmApi.token.getWalletTokenBalances({
      address: address,
      // chain: 0x89
      // chain: 137
      chain: chain,
      // chain: activeChain,
      // chain: Number('0x89')
    })

    let tokens = tokenBalances.toJSON();

    // console.log(tokens);

    let filteredTokens = [];

    // console.log(tokens[0].token_address)

    for (let i = 0; i < tokens.length; i++) {
      try {
        const priceResponse = await Moralis.EvmApi.token.getTokenPrice({
          address: tokens[i].token_address,
          chain: chain,
        });
  
        const price = priceResponse?.result
        // console.log(price)

        if (price.usdPrice > 0.01) {
          console.log('not shitcoin')
          console.log('price in usd', price.usdPrice);
          filteredTokens.push(tokens[i]);
          console.log(filteredTokens);
          filteredTokens[filteredTokens.length - 1].value = price.usdPrice;
        } else {
          console.log('shitcoin');
        }

      } catch (err) {
        // console.error(err)
      }
    }

    // console.log(filteredTokens)

    console.log('sending response...')
    res.send(filteredTokens);
  } catch (err) {
    res.send(err);
  }
})

// Moralis.start({
//   apiKey: MORALIS_API_KEY
// }).then(() => {
//   app.listen(port, () => {
//     console.log(`app listening on port ${port}`)
//   })
// })

// Add this a startServer function that initialises Moralis
const startServer = async () => {
  await Moralis.start({
    apiKey: MORALIS_API_KEY,
  })

  app.listen(port, () => {
    console.log(`app listening on port ${port}`)
  })
}

startServer()




