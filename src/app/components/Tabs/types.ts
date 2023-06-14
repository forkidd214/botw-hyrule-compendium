import React from 'react'

/////////////////////////////////////////////////////////////////
// tabs-context
type TabsContextValue = {
  selectedIndex: number
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>
  onSelectTab: (index: number) => void
}

type TabsProviderProps = {
  children: React.ReactNode
  defaultIndex?: number
  controlledIndex?: number
  onChange?: (index: number) => void
}

/////////////////////////////////////////////////////////////////
// tabs

type TabGroupProps = Partial<{
  /**
   * usecase: <Tab.Group>{({ selectedIndex }) => (<div>selectedIndex: {selectedIndex}</div>)}</Tab.Group>
   */
  children:
    | React.ReactNode
    | ((props: { selectedIndex: number }) => React.ReactNode)

  className: string
  as: React.ElementType
  defaultIndex: number
  selectedIndex: number // turn to controlled mode if specifyed
  onChange: (index: number) => void // callbacks served current index, allowing the <Tabs.Root /> consumer to synchronize with it.
}>

type TabListProps = Partial<{
  children: React.ReactNode
  className: string
  as: React.ElementType
}>

type TabProps = Partial<{
  /**
   * usecase: <Tab>{({ isSelected }) => (isSelected ? 'Active Tab' : 'Inactive Tab')}</Tab>
   */
  children:
    | React.ReactNode
    | ((props: { isSelected: boolean }) => React.ReactNode)

  className: string
  as: React.ElementType
  type: string
  disabled: boolean
  index: number // assigned by TabList
}>

type TabPanelsProps = Partial<{
  children: React.ReactNode
  className: string
  as: React.ElementType
}>

type TabPanelProps = Partial<{
  /**
   * usecase: <Tab.Panel>{({ isSelected }) => (isSelected ? 'Active Panel' : 'Inactive Panel')}</Tab.Panel>
   */
  children:
    | React.ReactNode
    | ((props: { isSelected: boolean }) => React.ReactNode)

  className: string
  as: React.ElementType
  index: number // assigned by TabPanels
}>

/////////////////////////////////////////////////////////////////
// Exports

export type { TabsContextValue, TabsProviderProps }
export type {
  TabGroupProps,
  TabListProps,
  TabProps,
  TabPanelsProps,
  TabPanelProps,
}
