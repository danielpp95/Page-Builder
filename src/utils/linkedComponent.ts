import type { ILinkedComponent } from "../components/interfaces/LinkedComponent";
import { Type } from "../components/interfaces/LinkedComponent";

export const templateComponent: ILinkedComponent =
{
    id: 0,
    name: 'page',
    parentId: null,
    renderComponent: null,
    type: Type.None,
    direction: "row"
}

export const PageComponent: ILinkedComponent =
{
    id: 0,
    name: 'page',
    parentId: null,
    renderComponent: null,
    type: Type.Container,
    direction: "row"
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
        renderComponent: renderComponent,
        type: type,
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