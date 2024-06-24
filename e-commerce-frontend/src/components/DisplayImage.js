import React from 'react'

const DisplayImage = ({imgUrl, onClose}) => {

  return (
    <div className='fixed bottom-0 top-0 right-0 left-0 flex justify-center items-center'>

        <div className='bg-white shadow-lg rounded max-w-5xl mx-auto p-4'>
                <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                <div className="flex items-center justify-between" >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="mr-3 h-5 w-5 cursor-pointer"
                        onClick={onClose}
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                </div>


                <div className='flex justify-center p-4 max-w-[80vh] max-h-[80vh]'>
                <img src={imgUrl} className='w-full h-full'/>
                </div>
        </div>
  


    </div>
  )
}

export default DisplayImage