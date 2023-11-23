import { useState } from 'react'
import LinkedComponent from '../../components/pageBuilder/LinkedComponent.tsx'
import Header from '../../components/header/header.tsx'
import Aside from '../../components/Aside/Aside.tsx'
import { Type, type ILinkedComponent } from "../../components/interfaces/LinkedComponent.ts";
import {
    CreateNewLinkedComponent,
    RemoveLinkedComponentRecursively,
    PageComponent,
    EmptyDefaultComponent } from "../../utils/linkedComponent.ts";

import './pageBuilder.modules.css'

export default function PageBuilder()
{
    const [linkedComponents, setLinkedComponents] = useState<ILinkedComponent[]>([PageComponent, EmptyDefaultComponent]);

    const [selectedComponent, setSelectedComponent] = useState<undefined | ILinkedComponent>(undefined)

    const [showAside, setShowAside] = useState<boolean>(true)

    function addChildComponentTo(parentId: number) : void
    {
        const orders = linkedComponents
            .filter(x => x.parentId === parentId)
            .map(x => x.order);
            
        const order = Math.max(...orders) + 1;

        const id = GetNextId();

        const newComponent = CreateNewLinkedComponent(
            id,
            `name: ${id}`,
            parentId,
            Type.Container,
            null,
            order);

        const newComponentsList = linkedComponents.map(x => {
            if (x.id === parentId && x.type !== Type.Container)
            {
                x.type = Type.Container;
                x.style = {
                    ...x.style,
                    flexDirection: "column"
                }
            }

            return x;
        })

        setLinkedComponents([...newComponentsList, newComponent])
    }

    function removeChildComponent(id: number) : void
    {
        if (id === 0) {
            return;
        }

        setLinkedComponents(RemoveLinkedComponentRecursively(id, linkedComponents));
    }

    function SelectComponent(id: number) : void
    {
        setSelectedComponent(linkedComponents.find(x => x.id === id))
    }

    function AddNewComponentAfter(id: number) : void
    {
        const component = linkedComponents.find(x => x.id === id)!;

        const components = linkedComponents.filter(x => x.parentId !== component.parentId);

        const componentsWithSameParent = linkedComponents
            .filter(X => X.parentId === component.parentId)
            .map(x => {
                if (x.order > component.order) {
                    x.order++;
                }

                return x;
            });

        const newId = GetNextId();

        setLinkedComponents([
            ...components,
            ...componentsWithSameParent,
            CreateNewLinkedComponent(
                newId,
                `name ${newId}`,
                id,
                Type.Component,
                null,
                component.order + 1
            ),
        ])
    }

    function toggleAside() {
        console.log(12)
        setShowAside(!showAside);
    }

    function AddNewComponentUnder(parentId: number, order: number) : void {
        const id = GetNextId();

        const existingComponents = linkedComponents.filter(x => x.parentId !== parentId);

        const newSortedComponents = linkedComponents
            .filter(x => x.parentId === parentId)
            .map(x => {
                if (x.order >= order)
                {
                    x.order++;
                }

                return x;
            });
        
        const newComponent = CreateNewLinkedComponent(
            id,
            `name ${id}`,
            parentId,
            Type.Component,
            null,
            order
        );

        const result = [...existingComponents, ...newSortedComponents, newComponent];

        setLinkedComponents(result);
    }

    function GetNextId() : number
    {
        const existingIds = linkedComponents.map(x => x.id)

        const maxExistingId = Math.max(...existingIds);

        return maxExistingId + 1;
    }

    function updateComponent(component: ILinkedComponent): void {
        setLinkedComponents(prevState =>
            prevState.map(linkedComponent =>
                linkedComponent.id === component.id
                    ? { ...component }
                    : linkedComponent
            )
        );
    }

    return (
        <>
            <Header RightItem={ButtonAsideToggle({toggle: toggleAside})} />
        
            <section id='pageBuilder' className={`page-builder page-builder--${showAside ? 'aside' : 'full-screen'}`}>
                <LinkedComponent
                    linkedComponents = {linkedComponents}
                    selectComponent = {SelectComponent}
                    addNewComponentAfter = {AddNewComponentAfter}
                    addNewComponentUnder = {AddNewComponentUnder}
                />

                {
                    showAside && <Aside
                        LinkedComponents = {linkedComponents}
                        AddChildComponentTo = {addChildComponentTo}
                        removeComponent = {removeChildComponent}
                        SelectComponent = {SelectComponent}
                        SelectedComponent = {selectedComponent!}
                        UpdateComponent = {updateComponent}
                    />
                }
            </section>
        </>
    )
}

interface ButtonAsideToggleProps {
    toggle: () => void;
}
function ButtonAsideToggle({toggle} : ButtonAsideToggleProps)
{
    return <button onClick={toggle}>Toggle</button>
}