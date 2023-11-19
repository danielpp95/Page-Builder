import './toolBar.modules.css'
import { Type, type ILinkedComponent } from "../interfaces/LinkedComponent";
import { useEffect, useState } from 'react';
import { BlueComponent, GreenComponent } from '../../template-components'

interface ToolbarProps {
    linkedComponent: undefined | ILinkedComponent;
    updateComponent : (component: ILinkedComponent) => void;
}

export default function Toolbar({
  linkedComponent,
  updateComponent
}: ToolbarProps)
{
    return (
        <div className='page-builder--toolbar'>
            <h2>Toolbar</h2>
            {
                linkedComponent === undefined && 
                <p>nothing selected... 😒</p>
            }
            {
                linkedComponent != undefined && 
                <RenderForm linkedComponent={linkedComponent} updateComponent={updateComponent} />
            }
        </div>
    )
}

function RenderForm({linkedComponent, updateComponent}: ToolbarProps)
{
    const [name, setName] = useState<string>('');
    const [direction, setDirection] = useState<'row' | 'column'>('row');
    const [type, setType] = useState<Type>(Type.None)
    const [component, setComponent] = useState<any>('0')

    useEffect(() => {
        setName(linkedComponent!.name)
        setDirection(linkedComponent!.direction);
        setType(linkedComponent?.type || Type.None);;
        setComponent(linkedComponent?.renderComponent ?? '0');;
    }, [linkedComponent])
    

    function handleUpdateComponent() {
        const newComponent: ILinkedComponent = {
            id: linkedComponent!.id,
            direction: direction,
            name: name,
            parentId: linkedComponent!.parentId,
            renderComponent: component === "0" ? BlueComponent : GreenComponent,
            type: type
        }

        updateComponent(newComponent);
    }

    return <div>
        <p style={{margin:0}}>Name:</p>
        <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}/>

        <br />
        <br />

        <p style={{margin:0}}>Type:</p>
        <select value={type} onChange={(e) => setType(Number(e.target.value) as Type)}>
            <option value={Type.Container}>Container</option>
            <option value={Type.Component}>Component</option>
        </select>

        {
            type === Type.Container &&
            <>
                <br />
                <br />

                <p style={{margin:0}}>Direction:</p>
                
                <select value={direction} onChange={(e) => setDirection(e.target.value as 'row' | 'column')}>
                    <option value="row">Row</option>
                    <option value="column">Column</option>
                </select>
            </>
        }

        {
            type === Type.Component &&
            <>
                <br />
                <br />
                
                <p style={{margin:0}}>Component:</p>
                
                <select 
                    value={component}
                    onChange={(e) => setComponent(e.target.value as string)}
                    >
                    <option value="0">blue</option>
                    <option value="1">green</option>
                </select>
            </>
        }

        <br />
        <br />

        <button onClick={handleUpdateComponent} >Save!</button>
    </div>
}
