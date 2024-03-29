const { ethers } = require('hardhat')
const fs = require('fs')

async function main() {
  const base_uri = 'https://ipfs.best-practice.se/ipfs/QmcjMjuYofQMrFRvCYjJ3hA9heG7PyRv5sEfroNWn7auQs'
  const Contract = await ethers.getContractFactory('Diasosi')
  const contract = await Contract.deploy('Diasosi NFT', 'DSOS')

  await contract.deployed()

  const address = JSON.stringify({ address: contract.address }, null, 4)
  fs.writeFile('./src/abis/contractAddress.json', address, 'utf8', (err) => {
    if (err) {
      console.error(err)
      return
    }
    console.log('Deployed contract address', contract.address)
  })
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})

