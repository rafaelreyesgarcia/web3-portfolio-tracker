import React from 'react'

const WalletInputs = ({chain, wallet, setChain, setWallet}) => {
  return (
    <>
      <h1>Balance Tracker</h1>
      <div>
        <div>
          <label htmlFor='wallet'>wallet: </label>
          <input
            id='wallet'
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor='chain'>chain: </label>
          <select
            id='chain'
            onChange={(e) => setChain(e.target.value)}
          >
            <option value="0x1">ETH</option>
            <option value="0x89">POLYGON</option>
          </select>
        </div>
      </div>
    </>
  )
}

export default WalletInputs