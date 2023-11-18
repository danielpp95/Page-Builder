import './toolBar.modules.css'
import type { ILinkedComponent } from "../interfaces/LinkedComponent";

export default function Toolbar({
  linkedComponent
}: { linkedComponent: undefined | ILinkedComponent })
{
    return (
        <div className='page-builder--toolbar'>
            <h2>Toolbar</h2>
            {
                linkedComponent != undefined && 
                <p>hola {linkedComponent.name}</p>
            }
        </div>
    )
}
