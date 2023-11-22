import React from 'react'
import './header.modules.css'

export default function Header({
  ToggleAside
}: any) {
  return (
    <div className='header'>
        <h1>Page Builder</h1>
        <button onClick={ToggleAside}>Show</button>
    </div>
  )
}
