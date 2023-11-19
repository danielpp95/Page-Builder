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
            <ul>
                <li>
                <RenderLinkedComponentsTree
                    component={linkedComponents.find(x => x.id === 0)}
                    components={[...linkedComponents]}
                    addNestedComponentTo={addNestedComponentTo}
                    removeNestedComponent={removeNestedComponent}
                    selectComponent={selectComponent}/>
                </li>
            </ul>
        </div>
    )
}
// ul > li > details > summary, ul > li -> details -> summary, ul > li >p
function RenderLinkedComponentsTree({
    component,
    components,
    deepLevel = 0,
    addNestedComponentTo,
    removeNestedComponent,
    selectComponent})
{
    const children = components.filter(x => x.parentId === component.id);

    if (children.length == 0) {
        return <RenderComponent
            component = {component}
            addNestedComponentTo = {addNestedComponentTo}
            removeNestedComponent = {removeNestedComponent}
            selectComponent={selectComponent} />
    }

    return (
        <details open>
            <summary>
                <RenderComponent
                    component = {component}
                    addNestedComponentTo = {addNestedComponentTo}
                    removeNestedComponent = {removeNestedComponent}
                    selectComponent={selectComponent} />
            </summary>
            <ul>
                {
                    children.length > 0 && children
                        .map(x => (
                            <li>
                                <RenderLinkedComponentsTree
                                    key = {x.id}
                                    component = {x}
                                    components = {components}
                                    deepLevel = {deepLevel}
                                    parentId = {component.id}
                                    addNestedComponentTo = {addNestedComponentTo}
                                    removeNestedComponent = {removeNestedComponent}
                                    selectComponent = {selectComponent}
                                />
                            </li>
                    ))
                }
            </ul>
        </details>
    )
}

function RenderComponent({
    component,
    addNestedComponentTo,
    removeNestedComponent,
    selectComponent})
{
    return (
        <div key={component.id} className='tree-item'>
            <p onClick={() => selectComponent(component.id)}>
                {component.name}
            </p> 
            
            {
                component.id !== 0 &&
                <button onClick={() => removeNestedComponent(component.id)}>-</button>
            }
            
            <button onClick={() => addNestedComponentTo(component.id)}>
                ＋
            </button>
            {/* <button onClick={() => selectComponent(component.id)}>select</button> */}
    </div>)
}
