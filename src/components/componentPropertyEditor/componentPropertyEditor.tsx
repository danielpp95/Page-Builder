import { useEffect, useState, type CSSProperties } from 'react';
import { renderers } from '../../template-components'
import { Type, type ILinkedComponent } from "../interfaces/LinkedComponent";

import './componentPropertyEditor.modules.css'

interface ToolbarProps {
    linkedComponent: undefined | ILinkedComponent;
    updateComponent : (component: ILinkedComponent) => void;
}

type FlexDirection = "column" | "column-reverse" | "row" | "row-reverse";

export default function Toolbar({
  linkedComponent,
  updateComponent
}: ToolbarProps)
{
    return (
        <div className='page-builder--toolbar'>
            <h2>Properties</h2>
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
    const [direction, setDirection] = useState<FlexDirection | undefined>('row');
    const [type, setType] = useState<Type>(Type.None)
    const [component, setComponent] = useState<string>('')
    const [componentStyles, setComponentStyles] = useState<CSSProperties | undefined>(undefined)
    const [rendererName, setRendererName] = useState<string>('')

    useEffect(() => {
        setName(linkedComponent!.name)
        setDirection(linkedComponent?.style?.flexDirection as FlexDirection);
        setType(linkedComponent?.type || Type.None);;
        setComponent(linkedComponent!.renderer?.name ?? renderers[0].name);;
    }, [linkedComponent])
    

    function handleUpdateComponent() {
        const newComponent: ILinkedComponent = {
            id: linkedComponent!.id,
            // direction: direction,
            name: name,
            parentId: linkedComponent!.parentId,
            renderer: renderers.find(x => x.name === component),
            type: type,
            order: linkedComponent!.order
        }

        updateComponent(newComponent);
    }

    function handleNameChange(name: string)
    {
        const newComponent: ILinkedComponent = {
            ...linkedComponent!,
            name: name
        }

        setName(name);
        updateComponent(newComponent);
    }


    function handleTypeChange(type:Type)
    {
        const newCss: CSSProperties = {
            ...componentStyles!,
            display: type === Type.Component ? 'block' : 'flex'
        }

        const newComponent: ILinkedComponent = {
            ...linkedComponent!,
            style: newCss,
            type: type,
        }

        setType(type)
        setComponentStyles(newCss);
        updateComponent(newComponent);
    }

    function handleDirectionChange(direction: FlexDirection)
    {
        const newCss: CSSProperties = {
            ...componentStyles!,
            display: 'flex',
            flexDirection: direction,
        }

        const newComponent: ILinkedComponent = {
            ...linkedComponent!,
            style: newCss
        }

        setDirection(direction)
        setComponentStyles(newCss);
        updateComponent(newComponent);
    }

    function handleRendererChange(name: string)
    {
        const newComponent: ILinkedComponent = {
            ...linkedComponent!,
            renderer: renderers.find(x => x.name === name)
        }

        setRendererName(name);
        updateComponent(newComponent);
    }

    return <table>
        <tbody>

        
        <tr>
            <th>
                <p style={{margin:0}}>Name</p>
            </th>
            <th>
                <input
                    type="text"
                    onChange={(e) => handleNameChange(e.target.value)}
                    value={name}/>
            </th>
        </tr>

        <tr>
            <th>
                <p style={{margin:0}}>Type</p>
            </th>
            <th>
                <select value={type} onChange={(e) => handleTypeChange(Number(e.target.value) as Type)}>
                    <option value={Type.Container}>Container</option>
                    <option value={Type.Component}>Component</option>
                </select>
            </th>
        </tr>
        


        {
            type === Type.Container &&
                <tr>
                    <th>
                        <p style={{margin:0}}>Direction</p>
                    </th>
                    <th>
                        <select value={direction} onChange={(e) => handleDirectionChange(e.target.value as FlexDirection)}>
                            <option value="column">Column</option>
                            <option value="column-reverse">Column reverse</option>
                            <option value="row">Row</option>
                            <option value="row-reverse">Row reverse</option>
                        </select>
                    </th>
                </tr>
        }

        {
            type === Type.Component &&
                <tr>
                    <th>
                        <p style={{margin:0}}>Component</p>
                    </th>
                    <th>
                        <select 
                            value={component}
                            onChange={(e) => handleRendererChange(e.target.value as string)}
                        >
                            {
                                renderers.map(x => (
                                    <option value={x.name} key={x.name}>{x.name}</option>))
                            }
                        </select>
                    </th>
                </tr>
        }
        </tbody>
    </table>
}
