app.get('/nativeBalance', async (req, res) => {
  try {
    // query
    // localhost:8080/nativeBalance?address=***&chain=***
    const { address, chain} = req.query
    console.log(address, chain);
    // console.log(typeof chain);

    console.log('processing request...');

    const response = await Moralis.EvmApi.balance.getNativeBalance({
      address: address,
      // chain: 0x89
      // chain: 137
      chain: chain,
      // chain: activeChain,
      // chain: Number('0x89')
    })
    console.log(response.toJSON())
    // const nativeBalance = balanceResponse.result.balance.ether;
    // console.log(nativeBalance)

    // let nativeCurrency;
    // if (activeChain.hex === '0x1') {
    //   nativeCurrency = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';
    // } else if (activeChain.hex === '0x89') {
    //   nativeCurrency = '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270';
    // }
    // // console.log(nativeCurrency)

    // const tokenResponse = await Moralis.EvmApi.token.getTokenPrice({
    //   address: nativeCurrency,
    //   chain: activeChain
    // })
    // const usdPrice = tokenResponse.result.usdPrice;

    // const finalResponse = {nativeBalance, usdPrice}
    // console.log('sending response...');
    // res.send(finalResponse);
  } catch (err) {
    res.send(err);
  }
})