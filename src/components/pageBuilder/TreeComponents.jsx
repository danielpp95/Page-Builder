import { useState } from 'react'
import './treeComponents.modules.css'

export default function TreeComponents({
  linkedComponents,
  addNestedComponentTo,
  removeNestedComponent}) {
  return (
    <div className='page-builder--tree-components'>
      <h2>Components Tree</h2>
      <RenderLinkedComponentsTree
        component={linkedComponents.find(x => x.id === 0)}
        components={[...linkedComponents]}
        addNestedComponentTo={addNestedComponentTo}
        removeNestedComponent={removeNestedComponent}/>
    </div>
  )
}

function RenderLinkedComponentsTree({
  component,
  components,
  deepLevel = 0,
  parentId = null,
  addNestedComponentTo,
  removeNestedComponent})
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
        deepLevel={deepLevel} />
      {
        children.length > 0 && children
          .map(x => (<RenderLinkedComponentsTree
              key={x.id}
              component={x}
              components = {components}
              deepLevel = {deepLevel}
              parentId = {component.id}
              addNestedComponentTo={addNestedComponentTo}
              removeNestedComponent={removeNestedComponent}
              />))
      }
    </div>
  }

function RenderComponent({
  component,
  addNestedComponentTo,
  removeNestedComponent,
  deepLevel}){
  let gap = '-'.repeat(deepLevel);
  
  return <div key={component.id}>
    <p>
      {`${'.'.repeat(--deepLevel)}${component.name}`}
      {
        component.id !== 0 &&
      <button onClick={() => removeNestedComponent(component.id)}>-</button>
    }
      <button onClick={() => addNestedComponentTo(component.id)}>+</button>
      </p> 
  </div>
}

/*
function RenderComponent({linkedComponent, level = 0}) {
  let gap = '-'.repeat(level++)

  let [showChildren, setShowChildren] = useState(true)

  let toggleChildren = () => {
    setShowChildren(!showChildren)
  }

  return (<div key={linkedComponent.id}>

    <p>
    {
      linkedComponent.length > 0 &&
      <button onClick={toggleChildren}>{showChildren ? '▶' : '▼'}</button>
    }
      {gap}
      id: {linkedComponent.id}
      parent: {linkedComponent.parentId}
    </p>

    {
      showChildren &&
      linkedComponent.length > 0 &&
      linkedComponent.map(cc => (<div key={cc.id}><RenderComponent linkedComponent={cc} level={level} key={cc.id}/></div>))}
  </div>)
}*/