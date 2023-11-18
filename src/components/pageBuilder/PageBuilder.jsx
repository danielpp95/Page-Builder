import React, { useState } from 'react'
import TreeComponents from './TreeComponents'
import Toolbar from './Toolbar'
import LinkedComponent from './LinkedComponent'
import './pageBuilder.modules.css'

export default function PageBuilder() {
  const defaultComponent = {
    id: 1,
    childComponents: [
      {
        id: 2,
        childComponents: [
          {
            id: 4,
            childComponents: [
              {
                id: 6,
                childComponents: [],
              },
              {
                id: 7,
                childComponents: [],
              },
            ],
          },
        ],
      },
      {
        id: 3,
        childComponents: [],
      },
    ],
  }

  const templateComponent = {
    id: 0,
    name: 'page',
    parentId: null,
    renderComponent: null,
  }

  const addNestedComponentTo = parentId => {
    const existingIds = linkedComponents.map(x => x.id)

    const maxExistingId = Math.max(...existingIds);

    const  id = maxExistingId + 1;

    const newComponent = {
      ...templateComponent,
      id,
      parentId,
      name: `name: ${id}`};

    setLinkedComponents([...linkedComponents, newComponent])
  }

  const removeNestedComponent = id => {
    if(id === 0) {
      return;
    }

    setLinkedComponents(prevList => {
      const newList = prevList.filter(x => x.id !== id);

      newList.filter(item => {
        if (item.parentId === id) {
          removeNestedComponent(item.id);
          return false;
        }
        return true;
      })

      return newList;
    });
  }

  const [linkedComponents, setLinkedComponents] = useState([templateComponent]);

  return (
    <section id='pageBuilder'>
      <TreeComponents
        linkedComponents={linkedComponents}
        addNestedComponentTo={addNestedComponentTo}
        removeNestedComponent={removeNestedComponent}/>
      <LinkedComponent
        linkedComponents={linkedComponents}
        addNestedComponentTo={addNestedComponentTo}
        removeNestedComponent={removeNestedComponent}/>
      <Toolbar/>
    </section>
  )
}
