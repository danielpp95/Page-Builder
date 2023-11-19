import { useState } from 'react'
import './treeComponents.modules.css'

export default function TreeComponents({
    linkedComponents,
    addNestedComponentTo,
    removeNestedComponent,
    selectComponent}) {
    return (
        <div className='page-builder--tree-components'>
            <h2>Components Tree</h2>
            <RenderLinkedComponentsTree
                component={linkedComponents.find(x => x.id === 0)}
                components={[...linkedComponents]}
                addNestedComponentTo={addNestedComponentTo}
                removeNestedComponent={removeNestedComponent}
                selectComponent={selectComponent}/>
        </div>
    )
}

function RenderLinkedComponentsTree({
    component,
    components,
    deepLevel = 0,
    parentId = null,
    addNestedComponentTo,
    removeNestedComponent,
    selectComponent})
{
    deepLevel++

    let [showChildren, setShowChildren] = useState(true);

    let toggleChildren = () => setShowChildren(!showChildren);

    const children = components.filter(x => x.parentId === component.id);

    return <div>
        <RenderComponent
          component = {component}
          addNestedComponentTo = {addNestedComponentTo}
          removeNestedComponent = {removeNestedComponent}
          deepLevel={deepLevel}
          selectComponent={selectComponent} />
        {
            children.length > 0 && children
                .map(x => (
                    <RenderLinkedComponentsTree
                        key={x.id}
                        component={x}
                        components = {components}
                        deepLevel = {deepLevel}
                        parentId = {component.id}
                        addNestedComponentTo={addNestedComponentTo}
                        removeNestedComponent={removeNestedComponent}
                        selectComponent={selectComponent}
                    />))
        }
    </div>
}

function RenderComponent({
    component,
    addNestedComponentTo,
    removeNestedComponent,
    deepLevel,
    selectComponent})
{
    let gap = '-'.repeat(deepLevel);
    
    return <div key={component.id}>
        <p>
            {component.name}
        {
            component.id !== 0 &&
            <button onClick={() => removeNestedComponent(component.id)}>-</button>
        }
        <button onClick={() => addNestedComponentTo(component.id)}>+</button>
        <button onClick={() => selectComponent(component.id)}>select</button>
        </p> 
    </div>
}
