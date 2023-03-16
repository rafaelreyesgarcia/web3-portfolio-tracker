import React from 'react'
import axios from 'axios'
import {useState, useEffect} from 'react'
import { Reload } from '@web3uikit/icons'
import { Input } from '@web3uikit/core'

const Nfts = ({chain, wallet, nfts, setNfts, filteredNfts, setFilteredNfts}) => {

  const [nameFilter, setNameFilter] = useState('')
  const [idFilter, setIdFilter] = useState('')

  async function getUserNfts() {
    const response = await axios.get('http://localhost:8080/nftBalance', {
      params: {
        address: wallet,
        chain: chain,
      }
    })
    if (response.data.result) {
      nftProcessing(response.data.result)
    }
  }

  function nftProcessing(t) {
    for (let i = 0; i < t.length; i++) {
      let meta = JSON.parse(t[i].metadata);
      if (meta && meta.image) {
        // console.log(i, meta.image)j
        if (meta.image.startsWith('ipfs://')) {
          t[i].image = 'https://ipfs.io/ipfs/' + meta.image.slice(7);
        } else if (meta.image.startsWith('https://ipfs.infura.io/ipfs/')) {
          t[i].image = 'https://ipfs.io/ipfs/' + meta.image.slice(28)
        } else if (meta.image.startsWith('https://roji.mypinata.cloud/ipfs/')) {
          t[i].image = 'https://ipfs.io/ipfs/' + meta.image.slice(33)
        }
        else {
          t[i].image = meta.image;
        }
      }
    }

    // https://ipfs.io/ipfs/

    setNfts(t);
    setFilteredNfts(t)
  }

  useEffect(() => {
    console.log('name filter: ', nameFilter)
    if (idFilter.length === 0 && nameFilter.length === 0) {
      return setFilteredNfts(nfts);
    }
    let filNfts = [];

    // console.log(nfts)

    for (let i = 0; i < nfts.length; i++) {
      if (nfts[i].name && nfts[i].name.toLowerCase().includes(nameFilter) && idFilter.length === 0) {
        filNfts.push(nfts[i])
      }
      else if (nfts[i].token_id.includes(idFilter) && nameFilter.length === 0) {
        filNfts.push(nfts[i])
      }
      else if (nfts[i].name && nfts[i].name.toLowerCase().includes(nameFilter) && nfts[i].token_id.includes(idFilter)) {
        filNfts.push(nfts[i])
      }
    }

    console.log('fil: ', filNfts);

    // for (let i = 0; i < nfts.length; i++) {
    //   else if (
    //     nfts[i].token_id.includes(idFilter) &&
    //     nfts[i].name.includes(nameFilter)
    //   ) {
    //     filNfts.push(nfts[i])
    //   }
    // }

    setFilteredNfts(filNfts)
  }, [nameFilter, idFilter])

  return (
    <>
      <div className='tab-heading'>
        NFT Portfolio <Reload onClick={getUserNfts}/>
      </div>
      <div>
        <Input
          id='nameF'
          label='Name Filter'
          labelBgColor='rgb(33, 33, 38)'
          value={nameFilter}
          style={{}}
          onChange={(e)  => setNameFilter(e.target.value)}
        />
        <Input
          id='idF'
          label='ID Filter'
          labelBgColor='rgb(33, 33, 38)'
          value={idFilter}
          style={{}}
          onChange={(e)  => setIdFilter(e.target.value)}
        />

        
      </div>
      <div className='nft-list'>
        {filteredNfts.length > 0 &&
          filteredNfts.map((e) => {
            return (
              <>
                <div className='nft-info'>
                  {e.image && <img src={e.image} width={200} />}
                  <div>Name: {e.name}</div>
                  <div>Id: {e.token_id.slice(0, 5)}</div>
                </div>
              </>
            )
          })
        }
      </div>
    </>
  )
}

export default Nfts