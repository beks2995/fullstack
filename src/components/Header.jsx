import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div>
        <Link to='/'>Home</Link>
        <Link to='/add'>Add Product</Link>
        <Link to='/edit'>Edit</Link>
    </div>
  )
}

export default Header