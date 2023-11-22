import React, { useState } from 'react'
import TreeComponents from './TreeComponents'
import Toolbar from './Toolbar'
import LinkedComponent from './LinkedComponent'
import './pageBuilder.modules.css'
import Header from '../header/header.tsx'
import Aside from '../Aside/Aside.tsx'
import { Type, type ILinkedComponent } from "../interfaces/LinkedComponent";
import {
    CreateNewLinkedComponent,
    RemoveLinkedComponentRecursively,
    PageComponent,
    EmptyDefaultComponent } from "../../utils/linkedComponent.ts";

export default function PageBuilder() {
    const [linkedComponents, setLinkedComponents] =
        useState<ILinkedComponent[]>([PageComponent, EmptyDefaultComponent]);

    const [selectedComponent, setSelectedComponent] =
        useState<undefined | ILinkedComponent>(undefined)

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

        setLinkedComponents([...linkedComponents, newComponent])
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
            ...linkedComponents,
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
                linkedComponent.id === component.id ? { ...component } : linkedComponent
            )
        );
    }

    return (
        <>
            <Header ToggleAside={toggleAside} />
        
        <section id='pageBuilder'>
            {/* <TreeComponents
                linkedComponents = {linkedComponents}
                addNestedComponentTo = {addChildComponentTo}
                removeNestedComponent = {removeChildComponent}
                selectComponent = {SelectComponent}
                selectedComponent = {selectedComponent}
            /> */}

<div style={{
                width: '100vw',
                display: 'flex',
                justifyContent: 'space-between'
            }}>
            <LinkedComponent
                linkedComponents = {linkedComponents}
                addNestedComponentTo = {addChildComponentTo}
                removeNestedComponent = {removeChildComponent}
                selectComponent = {SelectComponent}
                addNewComponentAfter = {AddNewComponentAfter}
                addNewComponentUnder = {AddNewComponentUnder}
            />
            {/* <Toolbar
            linkedComponent = {selectedComponent}
            updateComponent = {updateComponent} /> */
            showAside && <Aside
                LinkedComponents = {linkedComponents}
                AddChildComponentTo = {addChildComponentTo}
                RemoveChildComponent = {removeChildComponent}
                SelectComponent = {SelectComponent}
                // AddNewComponentAfter = {AddNewComponentAfter}
                // AddNewComponentUnder = {AddNewComponentUnder}
                SelectedComponent = {selectedComponent!}
                UpdateComponent = {updateComponent}
            />
        }

</div>
        </section>
        </>
    )
}
