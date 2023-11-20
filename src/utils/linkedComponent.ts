import type { ILinkedComponent } from "../components/interfaces/LinkedComponent";
import { Type } from "../components/interfaces/LinkedComponent";
import { renderers, RendererType } from '../template-components'

const emptyComponent = renderers.find(x => x.name === RendererType.EmptyComponent);

export const templateComponent: ILinkedComponent =
{
    id: 0,
    name: 'page',
    parentId: null,
    renderer: null,
    type: Type.Component,
    direction: "column"
}

export const PageComponent: ILinkedComponent =
{
    id: 0,
    name: 'page',
    parentId: null,
    renderer: null,
    type: Type.Container,
    direction: "column"
}

export const EmptyDefaultComponent: ILinkedComponent =
{
    id: 1,
    name: 'Empty Component',
    parentId: 0,
    renderer: emptyComponent,
    type: Type.Component,
    direction: "column"
}

export function CreateNewLinkedComponent (
    id: number,
    name: string,
    parentId: number,
    type: Type,
    renderComponent: any
):ILinkedComponent
{
    return {
        id: id,
        name: name,
        parentId: parentId,
        renderer: emptyComponent,
        type: Type.Component,
        direction: "row"
    }
}

export function RemoveLinkedComponentRecursively(
    id: number,
    components: ILinkedComponent[]
) : ILinkedComponent[]
{
    const newList = components.filter(x => x.id != id);

    return newList.filter(component => {
        if(component.parentId === id)
        {
            RemoveLinkedComponentRecursively(component.id, newList);

            return false;
        }

        return true;
    });
}