import React from 'react'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='flex justify-around items-center py-3 bg-[#008060] text-white'>
        <h1 className='flex items-center justify-center'>
            <img src="heart.svg" alt="Heart" className="m-1" />
            <span className='font-bold'>BP Data Maintainer</span>
        </h1>
        <div className="links flex gap-4">
            <NavLink to = "/">Home</NavLink>
            <NavLink to = "/Reports">Reports</NavLink>
        </div>
    </nav>
  )
}

export default Navbar
