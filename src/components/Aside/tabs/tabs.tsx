import { Tabs } from '../Constants';
import './tabs.modules.css'

interface tabsProps {
    SelectPage: (tabName: Tabs) => void;
}

export default function tabs({
  SelectPage
}: tabsProps) {
  return (
    <div className='tabs'>
      <button onClick={() => SelectPage(Tabs.Tree)}>tree</button>
      <button onClick={() => SelectPage(Tabs.Properties)}>properties</button>
    </div>
  )
}
