export interface ILinkedComponent {
    id: number;
    name: string;
    parentId: number | null;
    type: Type;
    renderComponent: any;
}

export enum Type {
    None,
    Container,
    Component
}