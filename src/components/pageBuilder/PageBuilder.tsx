import React, { useState } from 'react'
import TreeComponents from './TreeComponents'
import Toolbar from './Toolbar'
import LinkedComponent from './LinkedComponent'
import './pageBuilder.modules.css'
import { Type, type ILinkedComponent } from "../interfaces/LinkedComponent";
import {
    CreateNewLinkedComponent,
    RemoveLinkedComponentRecursively,
    templateComponent,
    PageComponent } from "../../utils/linkedComponent.ts";

export default function PageBuilder() {
    const [linkedComponents, setLinkedComponents] =
        useState<ILinkedComponent[]>([PageComponent]);

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
                selectComponent = {SelectComponent} />
            <LinkedComponent
                linkedComponents = {linkedComponents}
                addNestedComponentTo = {addChildComponentTo}
                removeNestedComponent = {removeChildComponent} />
            <Toolbar linkedComponent = {selectedComponent} updateComponent = {updateComponent} />
        </section>
    )
}
