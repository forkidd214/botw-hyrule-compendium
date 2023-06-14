import * as React from 'react'
import { TabsContextValue, TabsProviderProps } from './types'

const TabsContext = React.createContext<TabsContextValue | undefined>(undefined)
TabsContext.displayName = 'TabsContext'

const TabsProvider = ({
  children,
  defaultIndex = 0,
  controlledIndex,
  onChange,
}: TabsProviderProps) => {
  const [selectedIndex, setSelectedIndex] = React.useState<number>(defaultIndex)
  const onSelectTab = React.useCallback(
    (index: number) => {
      setSelectedIndex(index)
      onChange && onChange(index)
    },
    [onChange]
  )

  const value = {
    selectedIndex: controlledIndex ?? selectedIndex,
    setSelectedIndex,
    onSelectTab,
  }
  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>
}

function useTabs() {
  const context = React.useContext(TabsContext)
  if (!context) {
    throw new Error(`useTabs must be used within a TabsProvider`)
  }
  return context
}

export { TabsProvider, useTabs }
