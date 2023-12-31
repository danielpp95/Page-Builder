import { Type, type ILinkedComponent } from "../interfaces/LinkedComponent";
import CreateNewComponent from '../../template-components/InsertNewComponentHorizontal/insertNewComponentHorizontal'

import "./LinkedComponent.modules.css";

interface LinkedComponentProps {
    linkedComponents: ILinkedComponent[];
    selectComponent: (id: number) => void;
    addNewComponentAfter: (id: number) => void;
    addNewComponentUnder: (parentId: number, sort: number) => void;
}

export default function LinkedComponent({
    linkedComponents,
    selectComponent,
    addNewComponentAfter,
    addNewComponentUnder} : LinkedComponentProps)
{
    return (
        <div className="linked-component">
            <RenderComponent
                id={0}
                components={linkedComponents}
                selectComponent={selectComponent}
                addNewComponentAfter={addNewComponentAfter}
                addNewComponentUnder={addNewComponentUnder}
            />
        </div>
    )
}

interface RenderComponentProps {
    id: number;
    components: ILinkedComponent[];
    selectComponent: (id: number) => void;
    addNewComponentAfter: (id: number) => void;
    addNewComponentUnder: (parentId: number, sort: number) => void;
}
/// will only render leaf components
function RenderComponent({
    id,
    components,
    selectComponent,
    addNewComponentAfter,
    addNewComponentUnder} : RenderComponentProps)
{
    const component = components.find(x => x.id === id);

    if (component === undefined) {
        throw new Error("component not found");
    }

    if (component.type === Type.Component ) {
        const ComponentToRender = component.renderer?.component;

        if (ComponentToRender === undefined) {
            throw new Error("Null Renderer");
        }

        return (
            <div
                onClick={() => selectComponent(component.id)}
                style={{cursor:'pointer', width: '100%'}}
            >
                <ComponentToRender />
                <div onClick={() => addNewComponentUnder(component.parentId!, component.order + 1)}>
                    <CreateNewComponent />
                </div>
            </div>
        )
    }

    if (component.type === Type.Container) {
        const children = components.filter(x => x.parentId === id);

        const componentStyle = {
            display:'flex',
            flexDirection: component.direction
        };

        return <div style={component.style}>
            {
                children
                    .sort((a, b) => a.order - b.order)
                    .map(x => (
                    <RenderComponent
                        id={x.id}
                        key={x.id}
                        components={components}
                        selectComponent={selectComponent}
                        addNewComponentAfter={addNewComponentAfter}
                        addNewComponentUnder={addNewComponentUnder}
                    />))
            }
        </div>
    }

    throw new Error("invalid component type");
}
