import TabsComponent from './tabs/tabs.tsx'
import ComponentsTree from '../pageBuilder/TreeComponents.jsx'
import Toolbar from '../pageBuilder/Toolbar.tsx'
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
        <div className='Aside'>
            <TabsComponent SelectPage={SelectPage} />
            

            
            {
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
            }
        </div>
    )
}
