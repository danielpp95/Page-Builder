import React, { useState } from 'react'
import TreeComponents from './TreeComponents'
import Toolbar from './Toolbar'
import LinkedComponent from './LinkedComponent'
import './pageBuilder.modules.css'
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

    function addChildComponentTo(parentId: number) : void
    {
        const existingIds = linkedComponents.map(x => x.id)

        const maxExistingId = Math.max(...existingIds);

        const id = maxExistingId + 1;

        const newComponent = CreateNewLinkedComponent(
            id,
            `name: ${id}`,
            parentId,
            Type.Container,
            null);

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
        const index = linkedComponents.findIndex(x => x.id === id);

        const existingIds = linkedComponents.map(x => x.id)

        const maxExistingId = Math.max(...existingIds);

        const newId = maxExistingId + 1;

        setLinkedComponents([
            ...linkedComponents.slice(0, index),
            CreateNewLinkedComponent(
                newId,
                `name ${newId}`,
                id,
                Type.Component,
                null,
                0
            ),
            ...linkedComponents.slice(index)
        ])
    }

    function AddNewComponentUnder(parentId: number, order: number) : void {
        const id = GetNextId();

        const existingComponents = linkedComponents.filter(x => x.parentId !== parentId);

        const newSortedComponents = linkedComponents
            .filter(x => x.parentId === parentId)
            .map(x => {
                if (x.sort >= order)
                {
                    x.sort++;
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
        <section id='pageBuilder'>
            <TreeComponents
                linkedComponents = {linkedComponents}
                addNestedComponentTo = {addChildComponentTo}
                removeNestedComponent = {removeChildComponent}
                selectComponent = {SelectComponent}
                selectedComponent = {selectedComponent}
            />
            <LinkedComponent
                linkedComponents = {linkedComponents}
                addNestedComponentTo = {addChildComponentTo}
                removeNestedComponent = {removeChildComponent}
                selectComponent = {SelectComponent}
                addNewComponentAfter = {AddNewComponentAfter}
                addNewComponentUnder = {AddNewComponentUnder}
            />
            <Toolbar linkedComponent = {selectedComponent} updateComponent = {updateComponent} />
        </section>
    )
}
