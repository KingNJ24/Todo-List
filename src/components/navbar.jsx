import React from 'react'

const navbar = () => {
  return (
    <nav className='flex bg-violet-600 justify-between p-3'>
      <h1 className='font-bold text-2xl'>iTask</h1>
       <ul className="flex gap-5">
        <li>Home</li>
        <li>Your tasks</li>
       </ul>
    </nav>
  )
}

export default navbar
