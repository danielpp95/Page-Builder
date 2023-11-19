export interface ILinkedComponent {
    id: number;
    name: string;
    parentId: number | null;
    type: Type;
    renderComponent: any;
    direction: 'column' | 'row'
}

export enum Type {
    None,
    Container,
    Component
}