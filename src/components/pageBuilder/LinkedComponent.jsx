export default function LinkedComponent({
  linkedComponents,
  addNestedComponentTo,
  removeNestedComponent}) {
  return (
    <div>
      <RenderComponent id={0} components={linkedComponents} />
    </div>
  )
}

/// will only render leaf components
function RenderComponent({id, components}) {
  const children = components.filter(x => x.parentId === id)

  if (children.length > 0) {
    return children.map(x => <RenderComponent
      id={x.id}
      key={x.id}
      components={components}/>)
  }

  const component = components.find(x => x.id === id);

  component.componentToRender = <p>child {component.id}</p>

  return component.componentToRender
}
