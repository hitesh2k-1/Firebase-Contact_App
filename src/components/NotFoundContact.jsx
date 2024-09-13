import React from 'react'

const NotFoundContact = () => {
  return (
    <div className='  flex flex-col justify-center h-[60vh] gap-4 items-center' >
      <img className=' w-32 md:w-52 lg:w-64 rounded-full' src="/images/nocontact.jpeg"/>
      <h3 className='text-white text-3xl md:font-bold' >Contact not found!</h3>
    </div>
  )
}

export default NotFoundContact
