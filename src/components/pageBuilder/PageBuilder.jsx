import React from 'react'
import TreeComponents from './TreeComponents'
import Toolbar from './Toolbar'
import LinkedComponent from './LinkedComponent'
import './pageBuilder.modules.css'

export default function PageBuilder() {
  return (
    <section id='pageBuilder'>
      <TreeComponents/>
      <LinkedComponent/>
      <Toolbar/>
    </section>
  )
}
