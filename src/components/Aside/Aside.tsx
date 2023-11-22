import TabsComponent from './tabs/tabs.tsx'
import ComponentsTree from '../componentsTree/TreeComponents.jsx'
import Toolbar from '../componentPropertyEditor/componentPropertyEditor.tsx'
import './aside.modules.css'
import { Tabs } from './Constants.ts'
import { useState, type ReactNode } from 'react'
import type { ILinkedComponent } from '../interfaces/LinkedComponent.ts';

interface AsideProps {
    SelectedComponent: ILinkedComponent;
    LinkedComponents: ILinkedComponent[];
    AddChildComponentTo: (parentId: number) => void;
    removeComponent: (id: number) => void;
    SelectComponent: (id: number) => void;
    UpdateComponent: (component: ILinkedComponent) => void;
}

export default function Aside({
    LinkedComponents,
    AddChildComponentTo,
    removeComponent,
    SelectComponent,
    SelectedComponent,
    UpdateComponent,
}: AsideProps) {
    return (
        <aside className='Aside'>
            <div className="aside-body">
                <div className="aside-body-content">
                    <Toolbar
                        updateComponent = {UpdateComponent}
                        linkedComponent = {SelectedComponent}
                    />
                </div>

                <div className="aside-body-content">
                    <ComponentsTree
                        linkedComponents = {LinkedComponents}
                        AddChildComponentTo = {AddChildComponentTo}
                        removeComponent = {removeComponent}
                        selectComponent = {SelectComponent}
                        selectedComponent = {SelectedComponent}
                    />
                </div>
            </div>
        </aside>
    )
}
