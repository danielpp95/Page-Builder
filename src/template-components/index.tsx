import GreenComponent from './greenComponent'
import BlueComponent from './blueComponent'
import EmptyComponent from './EmptyComponent/emptyComponent'
import type { IRenderer } from '../components/interfaces/LinkedComponent'

export enum RendererType {
    EmptyComponent = 'EmptyComponent',
    GreenComponent = 'GreenComponent',
    BlueComponent = 'BlueComponent',
}

export const renderers: IRenderer[] = [
    {
        name: RendererType.EmptyComponent,
        component: EmptyComponent
    },
    {
        name: RendererType.GreenComponent,
        component: GreenComponent
    },
    {
        name: RendererType.BlueComponent,
        component: BlueComponent
    },
]

