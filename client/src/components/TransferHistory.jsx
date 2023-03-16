import React from 'react'
import axios from 'axios'

const TransferHistory = ({chain, wallet, transfers, setTransfers}) => {

  async function getTokenTransfers() {
    const response = await axios.get('http://localhost:8080/tokenTransfers', {
      params: {
        address: wallet,
        chain: chain
      }
    })

    if (response.data) {
      setTransfers(response.data);
    }
  }

  console.log('transfers: ', transfers);
  return (
    <>
      <h2>Transfer History</h2>
      <div>
        <button onClick={getTokenTransfers}>Fetch Transfers</button>

        <table>
          <tr>
            <th>Token</th>
            <th>Amount</th>
            <th>From</th>
            <th>To</th>
            <th>Date</th>
          </tr>
          {transfers.length > 0 &&
            transfers.map((tx) => {
              return (
                <tr>
                  <td>{tx.symbol}</td>
                  <td>{(Number(tx.value) / Number(`1e${tx.decimals}`)).toFixed(2)}</td>
                  <td>{tx.from_address}</td>
                  <td>{tx.to_address}</td>
                  <td>{tx.block_timestamp}</td>
                </tr>
              )
            })
          }
        </table>
      </div>
    </>
  )
}

export default TransferHistory