import React from 'react'
import '../App.css'
import {Input, Select, CryptoLogos} from '@web3uikit/core'

const WalletInputs = ({chain, wallet, setChain, setWallet}) => {

  return (
    <>
      <div className='header'>
        <img src="./rocket.png" alt="" className='title' />
        <h2>Ethereum Explorer</h2>
        <div className='wallet-inputs'>
          <Input
            id='Wallet'
            label='Wallet Address'
            labelBgColor='rgb(33, 33, 38)'
            value={wallet}
            style={{height: '50px'}}
            hasCopyButton={true}
            onChange={(e) => setWallet(e.target.value)}
          />

          <Select
            defaultOptionIndex={0}
            id='Chain'
            onChange={(e) => setChain(e.value)}
            options={[
              {
                id: 'ETH',
                label: 'Ethereum',
                value: '0x1',
                prefix: <CryptoLogos chain='ethereum'/>

              },
              {
                id: 'MATIC',
                label: 'Polygon',
                value: '0x89',
                prefix: <CryptoLogos chain='polygon'/>
              }
            ]}
            // className={['sc-dFdIVH', 'sc-hKdnnL']}
          />
        </div>
      </div>

    </>
  )
}

export default WalletInputs

/*
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
*/