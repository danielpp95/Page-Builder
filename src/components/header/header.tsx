
import type { ReactNode } from 'react'
import './header.modules.css'

interface HeaderProps {
    RightItem?: ReactNode
}

export default function Header({
    RightItem
}: HeaderProps) {
    return (
        <div className='header'>
          
            <div className="nav">
                <h1>Page Builder</h1>
                <a href="/">Home</a>
                <a href="/component">Components</a>
            </div>
            { RightItem }
        </div>
    )
}
