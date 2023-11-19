import { Type, type ILinkedComponent } from "../interfaces/LinkedComponent";

interface LinkedComponentProps {
    linkedComponents: ILinkedComponent[];
    addNestedComponentTo: (parentId: number) => void;
    removeNestedComponent: (id: number) => void;
}

export default function LinkedComponent({
  linkedComponents,
  addNestedComponentTo,
  removeNestedComponent} : LinkedComponentProps)
{
    return (
        <div>
            <RenderComponent id={0} components={linkedComponents} />
        </div>
    )
}

interface RenderComponentProps {
    id: number;
    components: ILinkedComponent[];
}
/// will only render leaf components
function RenderComponent({id, components} : RenderComponentProps) {
    const component = components.find(x => x.id === id);

    if (component === undefined) {
        throw new Error("component not found");
    }

    if (component.type === Type.Component ) {
        const ComponentToRender = component.renderer?.component;

        if (ComponentToRender === undefined) {
            throw new Error("Null Renderer");
        }

        return <ComponentToRender />;
    }

    if (component.type === Type.Container) {
        const children = components.filter(x => x.parentId === id);

        const componentStyle = {
            display:'flex',
            flexDirection: component.direction
        };

        return <div style={componentStyle}>
            {
                children.map(x => <RenderComponent id={x.id} key={x.id} components={components} />)
            }
        </div>
    }

    throw new Error("invalid component type");
}
