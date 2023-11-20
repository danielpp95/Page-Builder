import { Type, type ILinkedComponent } from "../interfaces/LinkedComponent";
import CreateNewComponent from '../../template-components/InsertNewComponentHorizontal/insertNewComponentHorizontal'


interface LinkedComponentProps {
    linkedComponents: ILinkedComponent[];
    addNestedComponentTo: (parentId: number) => void;
    removeNestedComponent: (id: number) => void;
    selectComponent: (id: number) => void;
    addNewComponentAfter: (id: number) => void;
    addNewComponentUnder: (parentId: number, sort: number) => void;
}

export default function LinkedComponent({
    linkedComponents,
    addNestedComponentTo,
    removeNestedComponent,
    selectComponent,
    addNewComponentAfter,
    addNewComponentUnder} : LinkedComponentProps)
{
    return (
        <div>
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
                style={{cursor:'pointer'}}
            >
                <ComponentToRender />
                <div onClick={() => addNewComponentUnder(component.parentId!, component.sort + 1)}>
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

        return <div style={componentStyle}>
            {
                children
                    .sort((a, b) => a.sort - b.sort)
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
