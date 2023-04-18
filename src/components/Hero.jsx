import github from '../assets/github_icon.png'
import facebook from '../assets/facebook_icon.png'
import twitter from '../assets/twitter_icon.png'
import linkedIn from '../assets/linkedIn_icon.png'
import { setAlert, setGlobalState, setLoadingMsg, useGlobalState } from '../store'
import { create } from 'ipfs-http-client'
import { Buffer } from 'buffer'
import { Mint } from '../Diasosi'
import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'



const auth =
  'Basic ' +
  Buffer.from(
    "2KfoZNEq8rUlcT155VCEFwVPGwF" + ':' + "cf524ffc84311e61f23c7b19ab69e363",
  ).toString('base64')

const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
})


const Hero = () => {
  const [nfts] = useGlobalState('nfts')

  const [title, setTitle] = useState('')

  const [fileUrl, setFileUrl] = useState('')
  const [imgUpload, setImgUpload] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title) return;


    try {
      const created = await client.add(fileUrl)
      setLoadingMsg("Minting...", title)

      const _imageURL = `https://ipfs.io/ipfs/${created.path}`
      const _title = title

      const newF = { _imageURL, _title }
      // const _imageURL = newF
      console.log(newF)
      setFileUrl(_imageURL)
      const result = await Mint(newF)
      console.log("result", result);

      resetForm()
      if (result) {
        setAlert('Successfully Minted...')
      }
      else {
        setAlert('Error Minting', 'red')

      }
    } catch (error) {
      setAlert('error Minting', 'red')

      console.log(error)


    }
  }

  const changeImage = async (e) => {
    const reader = new FileReader()
    if (e.target.files[0]) reader.readAsDataURL(e.target.files[0])

    reader.onload = (readerEvent) => {
      const file = readerEvent.target.result
      setImgUpload(file)
      setFileUrl(e.target.files[0])
    }
  }





  const resetForm = () => {
    setFileUrl('')
    setImgUpload(null)
    setTitle('')

  }

  return (
    <div className="bg-[url('https://wp-api.zipmex.com/wp-content/uploads/2021/11/shutterstock_1943413315.jpg')]
    bg-no-repeat bg-cover">
      <div className="flex flex-col justify-center items-center 
            mx-auto py-10">
        <h1 className="text-black text-5xl font-bold text-center">
          Dsos Varieties <br />
          <span className="text-black">NFTs Gallery</span>
        </h1>

        <p className="text-black  font-bold text-sm mt-3">
          Collections of classic aesthetic NFTs
        </p>

        <form onSubmit={handleSubmit} className='flex flex-col '>
          <div className='flex justify-between item-center text-gray-400'>
            <p className='font-semibold text-gray-400'></p>
            <button
              type='button'
              onClick={resetForm}
              className='border-0 bg-transparent focus:outline-none'>
              <FaTimes />
            </button>
          </div>

          <div className='flex justify-center items-center 
                rounded-xl mt-5 '>
            <div className='shrink-0 rounded-xl overflow-hidden h-32 w-32' >
              <img className='h-full w-full object-cover cursor-pointer'
                src={imgUpload || "https://media.gettyimages.com/id/1227618801/vector/human-face-avatar-icon-profile-for-social-network-man-vector-illustration.jpg?s=1024x1024&w=gi&k=20&c=jmyg6H4d9kkHPr4cA-w2ZYwcD9Hw2QXe61I-bYOEXgk="} alt='NFT' />
            </div>
          </div>
          <div className='flex justify-between items-center bg-gray-800
            rounded-xl mt-5'>
            <label className='block'>
              <span className='sr-only'>Choose Image item</span>
              <input
                className='block w-full text-sm text-slate-500 file:mr-4
                    file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm
                    hover:file:bg-[#c4e631] file:font-semibold focus:outline-none
                    cursor-pointer focus:ring-0'
                type='file'
                accept='image/png, image/gif, image/webp, image/jpeg, image/jpg'
                onChange={changeImage}
                required />
            </label>
          </div>
          <div className='flex justify-between items-center bg-gray-800
            rounded-xl mt-5'>
            <input
              className='block w-full text-sm text-slate-500 
                    focus:outline-none focus:ring-0 p-2 
                   bg-transparent border-0'
              type='text'
              placeholder='Title'
              name='title'
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required />
          </div>

          <button className=" flex justify-center items-center
                  shadow-lg shadow-black text-white bg-[#b5ba25]
                 hover:bg-[#D3EE70] rounded-full mt-5 mb-4 p-2  "> Mint Now </button>
        </form>
        <div className='p-2 bg-gray-300 opacity-900 flex rounded-full mb-4 '>
          <p className="flex justify-between  items-start p text-black text-medium font-bold text-center">
            This work is more like an humanitarian endeavour, <br />
            targeted at young gifted hands and otherwise helpless <br />
            talented artists who does not have the priviledge of
            showcasing <br /> their products and excellent cerebral
            prowess through their <br /> creative work of art.
          </p>
        </div>






        {/* <div className='text-sm bg-gradient justify-center ml-4
                    rounded-full text-white text-bold uppercase'>NFT counter</div> */}

      </div>
    </div>
  )
}

export default Hero