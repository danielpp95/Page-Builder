import type { ILinkedComponent } from "../components/interfaces/LinkedComponent";
import { Type } from "../components/interfaces/LinkedComponent";
import { renderers, RendererType } from '../template-components'

const emptyComponent = renderers.find(x => x.name === RendererType.EmptyComponent);

export const PageComponent: ILinkedComponent =
{
    id: 0,
    name: 'page',
    parentId: null,
    renderer: null,
    type: Type.Container,
    direction: "column",
    sort: 0,
    style: {
        display: "flex",
        flexDirection: "column"
    }
}

export const EmptyDefaultComponent: ILinkedComponent =
{
    id: 1,
    name: 'Empty Component',
    parentId: 0,
    renderer: emptyComponent,
    type: Type.Component,
    direction: "column",
    sort: 0,
}

export function CreateNewLinkedComponent (
    id: number,
    name: string,
    parentId: number,
    type: Type,
    renderComponent: any,
    sort: number
):ILinkedComponent
{
    return {
        id: id,
        name: name,
        parentId: parentId,
        renderer: emptyComponent,
        type: Type.Component,
        direction: "row",
        sort: sort
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