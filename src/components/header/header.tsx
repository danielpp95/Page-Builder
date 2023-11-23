
import './header.modules.css'

export default function Header({
    ToggleAside,
    RightItem
}: any) {
    return (
        <div className='header'>
          
            <div className="nav">
                <h1>Page Builder</h1>
                <a href="/">Home</a>
                <a href="/component">component</a>
            </div>
            { RightItem && <RightItem /> }
        </div>
    )
}
