export interface ILinkedComponent {
    id: number;
    name: string;
    parentId: number | null;
    type: Type;
    renderer: IRenderer | null | undefined;
    direction: 'column' | 'row'
}

export interface IRenderer {
    name: string;
    component: any;
}

export enum Type {
    None,
    Container,
    Component
}