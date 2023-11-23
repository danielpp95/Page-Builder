import type { CSSProperties } from "react";

export interface ILinkedComponent {
    id: number;
    name: string;
    parentId: number | null;
    type: Type;
    renderer: IRenderer | null | undefined;
    direction?: 'column' | 'row',
    order: number,
    style?: CSSProperties | undefined;
}

export interface IRenderer {
    name: string;
    component: any;
}

export enum Type {
    None='None',
    Container='Container',
    Component='Component'
}