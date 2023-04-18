import ethlogo from '../assets/ethlogo.png'
import { useEffect, useState } from 'react'



const Artworks = ({ artworks }) => {
  const [end, setEnd] = useState(4)
  const [count] = useState(4)

  const [nfts, setNfts] = useState([])

  const getNfts = () => {
    return artworks.slice(0, end)
  }

  useEffect(() => {
    setNfts(getNfts())
  }, [artworks, end])

  return (
    <div className='bg-[#131828] py-10'>
      <div className='w-4/5 mx-auto'>
        <h4 className='text-gradient uppercase text-2xl'>MINTED NFTs</h4>

        <div className='flex flex-wrap justify-center items-center mt-4'>
          {nfts.map((nft, i) => (
            <a
              key={i}
              href={nft.url}
              target="_blank"

              className={`relative shadow-xl shadow-black p-3
                       bg-white rounded-lg item w-64 h-64 object-contain 
                      bg-no-repeat bg-cover overflow-hidden mr-2 mb-2 
                      cursor-pointer transition-all duration-75 delay-100
                      hover:shadow-[#bd2f]`}
              style={{ backgroundImage: `url(${nft.imageURL})` }}>
              <div className='flex'>
                <div
                  className='absolute bottom-0 left-0 right-0 
                          flex flex-col justify-between items-center label-gradient
                          p-2 w-full text-white text-sm'>
                  <div className='flex justify-center items-center p-2 
                w-full text-white text-sm'>
                    <p>Title:{nft.title}</p>
                  </div>
                  <p>Diasosi NFT Id: {nft.id}</p>


                  <div className='flex justify-center items-center space-x-2'>
                    <img
                      className='w-5 cursor-pointer'
                      src={ethlogo}
                      alt="Diasosi logo"

                    />
                    Owner Address: {nft.owner.slice(0, 5) + "..." + nft.owner.slice(-4)}
                  </div>
                </div>
              </div>

            </a>))}
        </div>

        <div className='flex justify-center items-center mx-auto mt-4'>
          {artworks.length > 0 && artworks.length > nfts.length ? (
            <button
              className='shadow-xl shadow-black text-white 
                  bg-[#e32970] hover:bg-[#bd25] p-2
                  rounded-full cursor-pointer my-4'
              onClick={() => setEnd(end + count)}
            >
              More NFTs</button>
          ) : null}

        </div>
      </div>
    </div>
  )
}

export default Artworks