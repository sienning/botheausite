import Link from 'next/link'
import React from 'react'

const homePage = () => {
  return (
    <div className='h-screen grid grid-flow-col justify-items-center'>
      <button className='h-10 object-center -mx-3  rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50'><Link href={"/home"}>Sign In</Link></button>
    </div>
  )
}

export default homePage