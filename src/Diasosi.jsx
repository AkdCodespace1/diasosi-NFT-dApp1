import abi from './abis/src/contracts/Diasosi.sol/Diasosi.json'
import address from './abis/contractAddress.json'
import { getGlobalState, setGlobalState } from './store'
import { ethers } from 'ethers'

const { ethereum } = window
const contractAddress = address.address
const contractAbi = abi.abi
const opensea_uri = `https://testnets.opensea.io/assets/goerli/${contractAddress}/`

const getEtheriumContract = () => {
    const connectedAccount = getGlobalState('connectedAccount')

    if (connectedAccount) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, contractAbi, signer)
        return contract
    } else {
        return getGlobalState('contract')
    }
}

const isWallectConnected = async () => {
    try {
        if (!ethereum) return alert('Please install Metamask')
        const accounts = await ethereum.request({ method: 'eth_accounts' })

        window.ethereum.on('chainChanged', (chainId) => {
            window.location.reload()
        })

        window.ethereum.on('accountsChanged', async () => {
            setGlobalState('connectedAccount', accounts[0])
            await isWallectConnected()
        })

        if (accounts.length) {
            setGlobalState('connectedAccount', accounts[0])
        } else {
            alert('Please connect wallet.')
            console.log('No accounts found.')
        }
    } catch (error) {
        reportError(error)
    }
}

const connectWallet = async () => {
    try {
        if (!ethereum) return alert('Please install Metamask')
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
        setGlobalState('connectedAccount', accounts[0])
    } catch (error) {
        reportError(error)
    }
}

const Mint = async ({ _imageURL, _title }) => {
    try {

        console.log("_imageURL", _imageURL)
        console.log("_title", _title)
        if (!ethereum) return alert('Please install Metamask')
        const connectedAccount = getGlobalState('connectedAccount')
        const contract = getEtheriumContract()
        // const amount = ethers.utils.parseEther('0.001')
        console.log(contract)
        // const base_uri = 'https://ipfs.best-practice.se/ipfs/QmcjMjuYofQMrFRvCYjJ3hA9heG7PyRv5sEfroNWn7auQs'
        const result = await contract.clickMint(_imageURL, _title);
        console.log('result', result)
        // window.location.reload()
        // await result.wait()
        // await loadNfts()
        return true;
    } catch (error) {
        console.log(error)
        // reportError(error)
    }
}





const loadNfts = async () => {
    try {
        if (!ethereum) return alert('Please install Metamask')
        const connectedAccount = getGlobalState('connectedAccount')

        const contract = await getEtheriumContract()
        const nfts = await contract.getAllNFTs()
        console.log('nfts new', structuredNfts(nfts))
        // console.log('nft.imageURL', nfts?.imageURL)
        setGlobalState('nfts', structuredNfts(nfts))
        return nfts

    } catch (error) {
        reportError(error)
    }
}

const structuredNfts = (nfts) =>
    nfts
        .map((nft) => ({
            id: nft.id.toNumber(),
            imageURL: nft.imageURL,
            owner: nft.owner.toString(),
            timestamp: new Date(nft.timestamp.toNumber()).getTime(),
            title: nft.title,
        }))
        .reverse()


const reportError = (error) => {
    // console.log(error.message)
    // throw new Error('No ethereum object.') 
}

export {
    isWallectConnected,
    getEtheriumContract,
    connectWallet,
    Mint,
    loadNfts
}