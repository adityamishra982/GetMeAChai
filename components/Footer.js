"use client"
import React from 'react'

const Navbar = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className='flex justify-center items-center p-4 bg-black/25 text-neutral-100'>
      Copyright &copy;{currentYear} Get Me A Chai - All rights reserved!
    </div>
  )
}

export default Navbar