import { useEffect, useState, type CSSProperties } from 'react';
import { renderers } from '../../template-components'
import { Type, type ILinkedComponent } from "../interfaces/LinkedComponent";
import FreeText from './freeText/freeText'
import Select from './select/select'

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

    useEffect(() => {
        setName(linkedComponent!.name)
        setDirection(linkedComponent?.style?.flexDirection as FlexDirection);
        setType(linkedComponent?.type || Type.None);;
        setComponent(linkedComponent!.renderer?.name ?? renderers[0].name);;
    }, [linkedComponent])

    useEffect(() =>
    {
        handleUpdateComponent();
    }, [name, type, direction, component])

    function handleUpdateComponent(){
        const newCss: CSSProperties = {
            ...linkedComponent!.style,
            flexDirection: direction,
        }

        let newComponent: ILinkedComponent = {
            ...linkedComponent!,
            name: name,
            style: newCss,
        }
        
        if (type != Type.None) {
            newCss.display = type === Type.Component ? 'block' : 'flex',
            newComponent.type = type
        }
        
        if (component) {
            newComponent.renderer = renderers.find(x => x.name === component)
        }

        updateComponent(newComponent);
    }

    return <div className="properties">
        <FreeText name="Name" value={name} updater={setName} />

        <Select
            name='Type'
            value={type.toString()}
            updater={(e) => {const val = e as Type; console.log(val);setType(val)}}
            options={[Type.Container, Type.Component]} />

        {
            type === Type.Container &&
                <Select
                    name="direction"
                    value={direction?.toString() ?? ''}
                    updater={(e) => setDirection(e as FlexDirection)}
                    options={["column", "column-reverse", "row", "row-reverse"]} />
        }

        {
            type === Type.Component &&
                <Select
                    name="component"
                    value={component?.toString() ?? ''}
                    updater={(e) => setComponent(e)}
                    options={renderers.map(x => x.name)} />
        }
    </div>
}
