app.get('/nativeBalance', async (req, res) => {
  try {
    const { address, chain} = req.query
    console.log(address, chain);

    const response = await Moralis.EvmApi.balance.getNativeBalance({
      address,
      chain,
    });
    console.log(response.toJSON());
  } catch (err) {
    res.send(err);
  }
})