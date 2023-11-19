import GreenComponent from './greenComponent'
import BlueComponent from './blueComponent'
import type { IRenderer } from '../components/interfaces/LinkedComponent'

export const renderers: IRenderer[] = [
    {
        name: 'GreenComponent',
        component: GreenComponent
    },
    {
        name: 'BlueComponent',
        component: BlueComponent
    },
]
