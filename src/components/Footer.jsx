import ethlogo from '../assets/ethlogo.png'

const Footer = () => {
  return (
    <div className="w-full flex md:justify-center justify-between
    items-center flex-col p-4 gradient-bg-footer">
        <div className="w-full flex flex-col justify-between items-center my-4">
            <div className="flex flex-1 justify-evenly items-center flex-wrap
            sm:mt-0 mt-5 w-full text-white text-base text-center">
            </div>

            <div className='flex justify-center items-center mt-2'>
                <img className='w-8' src={ethlogo} alt="Diasosi logo" />
                <span className='text-white text-sm'>Diasosi NFT (C)2023</span>
            </div>
        </div>
    </div>
  )
}

export default Footer