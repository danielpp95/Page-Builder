import './treeComponents.modules.css'

export default function TreeComponents({
    linkedComponents,
    AddChildComponentTo,
    removeComponent,
    selectComponent,
    selectedComponent}) {
    return (
        <div className='page-builder--tree-components'>
            <h2>Components Tree</h2>
            <ul>
                <li>
                    <RenderLinkedComponentsTree
                        component={linkedComponents.find(x => x.id === 0)}
                        components={[...linkedComponents]}
                        addChildComponentTo={AddChildComponentTo}
                        removeComponent={removeComponent}
                        selectComponent={selectComponent}
                        selectedComponent = {selectedComponent}
                    />
                </li>
            </ul>
        </div>
    )
}

function RenderLinkedComponentsTree({
    component,
    components,
    deepLevel = 0,
    addChildComponentTo,
    removeComponent,
    selectComponent,
    selectedComponent})
{
    const children = components.filter(x => x.parentId === component.id);

    if (children.length == 0) {
        return <RenderComponent
            component = {component}
            addChildComponentTo = {addChildComponentTo}
            removeComponent = {removeComponent}
            selectComponent={selectComponent}
            selectedComponent={selectedComponent}
        />
    }

    return (
        <details open>
            <summary>
                <RenderComponent
                    component = {component}
                    addChildComponentTo = {addChildComponentTo}
                    removeComponent = {removeComponent}
                    selectComponent={selectComponent}
                    selectedComponent={selectedComponent}
                />
            </summary>
            <ul>
                {
                    children.length > 0 && children
                    .sort((a, b) => a.order - b.order)
                        .map(x => (
                            <li key={x.id}>
                                <RenderLinkedComponentsTree
                                    key = {x.id}
                                    component = {x}
                                    components = {components}
                                    deepLevel = {deepLevel}
                                    parentId = {component.id}
                                    addChildComponentTo = {addChildComponentTo}
                                    removeComponent = {removeComponent}
                                    selectComponent = {selectComponent}
                                    selectedComponent = {selectedComponent}
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
    addChildComponentTo,
    removeComponent,
    selectComponent,
    selectedComponent})
{
    return (
        <div 
            key={component.id}
            className={`tree-item ${selectedComponent?.id === component.id ? 'tree-item-selected' : ''}`}
            onClick={() => selectComponent(component.id)}
        >
            <p>
                {component.name}
            </p> 
            
            {
                component.id !== 0 &&
                    <button
                        onClick={() => removeComponent(component.id)}
                    >-</button>
            }
            
            <button onClick={() => addChildComponentTo(component.id)}>
                ＋
            </button>
        </div>
    )
}
