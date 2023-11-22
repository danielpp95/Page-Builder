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
    RemoveChildComponent: (id: number) => void;
    SelectComponent: (id: number) => void;
    UpdateComponent: (component: ILinkedComponent) => void;
}

export default function Aside({
    LinkedComponents,
    AddChildComponentTo,
    RemoveChildComponent,
    SelectComponent,
    SelectedComponent,
    UpdateComponent,
}: AsideProps) {
    const [selectedTab, setSelectedTab] = useState<Tabs>(Tabs.Tree)

    function SelectPage(tab: Tabs){
        setSelectedTab(tab)
    }

    return (
        <aside className='Aside'>
            {/* <TabsComponent SelectPage={SelectPage} /> */}
            <div className="aside-body">
                {/* {
                    selectedTab === Tabs.Tree && (
                        <ComponentsTree
                            linkedComponents = {LinkedComponents}
                            addNestedComponentTo = {AddChildComponentTo}
                            removeNestedComponent = {RemoveChildComponent}
                            selectComponent = {SelectComponent}
                            selectedComponent = {SelectedComponent}
                        />)
                }
                {
                    selectedTab === Tabs.Properties && (
                        <Toolbar
                            updateComponent = {UpdateComponent}
                            linkedComponent = {SelectedComponent}
                        />)
                } */}


                <Toolbar
                    updateComponent = {UpdateComponent}
                    linkedComponent = {SelectedComponent}
                />

                <ComponentsTree
                    linkedComponents = {LinkedComponents}
                    addNestedComponentTo = {AddChildComponentTo}
                    removeNestedComponent = {RemoveChildComponent}
                    selectComponent = {SelectComponent}
                    selectedComponent = {SelectedComponent}
                />
            </div>
        </aside>
    )
}
