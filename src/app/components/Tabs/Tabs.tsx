'use client'

import * as React from 'react'
import { joinClassNames } from '@/app/utils'
import { TabsProvider, useTabs } from './tabs-context'
import {
  TabGroupProps,
  TabListProps,
  TabProps,
  TabPanelsProps,
  TabPanelProps,
} from './types'

function TabGroup({
  defaultIndex = 0,
  selectedIndex: controlledIndex,
  onChange,
  ...props
}: TabGroupProps) {
  return (
    <TabsProvider
      defaultIndex={defaultIndex}
      controlledIndex={controlledIndex}
      onChange={onChange}
    >
      <TabGroupImpl {...props} />
    </TabsProvider>
  )
}

const TabGroupImpl = ({
  as: Comp = 'div',
  children,
  className,
}: TabGroupProps) => {
  const { selectedIndex } = useTabs()

  return (
    <Comp className={joinClassNames('', className)}>
      {typeof children === 'function' ? children({ selectedIndex }) : children}
    </Comp>
  )
}

function TabList({ as: Comp = 'div', children, className }: TabListProps) {
  let tabIndex = 0

  return (
    <Comp
      role="tablist"
      aria-label="tab list"
      className={joinClassNames('', className)}
    >
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child) && child.type === Tab) {
          const TabWithIndex = React.cloneElement(
            child as ReturnType<typeof Tab>,
            { index: tabIndex }
          )
          tabIndex++
          return TabWithIndex
        } else {
          return child
        }
      })}
    </Comp>
  )
}

function Tab({
  index,
  as: Comp = 'button',
  type,
  children,
  className,
  disabled,
}: TabProps) {
  if (index === undefined) {
    throw new Error(
      'Tab must be used within TabList and must be the direct child of TabList'
    )
  }

  const { selectedIndex, onSelectTab } = useTabs()
  const isSelected = index === selectedIndex
  const htmlType = Comp === 'button' && !type ? 'button' : type

  return (
    <Comp
      id={getTabsId('tab', index)}
      aria-controls={getTabsId('tabpanel', index)}
      aria-disabled={disabled}
      role="tab"
      aria-selected={isSelected ? 'true' : 'false'}
      onClick={() => onSelectTab(index)}
      type={htmlType}
      disabled={disabled}
      className={joinClassNames('', className)}
    >
      {typeof children === 'function' ? children({ isSelected }) : children}
    </Comp>
  )
}

function TabPanels({ as: Comp = 'div', children, className }: TabPanelsProps) {
  let tabIndex = 0

  return (
    <Comp className={joinClassNames('', className)}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child) && child.type === TabPanel) {
          const TabWithIndex = React.cloneElement(
            child as ReturnType<typeof TabPanel>,
            { index: tabIndex }
          )
          tabIndex++
          return TabWithIndex
        } else {
          return child
        }
      })}
    </Comp>
  )
}

function TabPanel({
  index,
  as: Comp = 'div',
  children,
  className,
}: TabPanelProps) {
  if (index === undefined) {
    throw new Error(
      'TabPanel must be used within TabPanels and must be the direct child of TabPanels'
    )
  }

  const { selectedIndex } = useTabs()
  const isSelected = index === selectedIndex

  return typeof children === 'function' ? (
    <Comp
      id={getTabsId('tabpanel', index)}
      aria-labelledby={getTabsId('tab', index)}
      role="tabpanel"
      className={joinClassNames('', className)}
    >
      {typeof children === 'function' ? children({ isSelected }) : children}
    </Comp>
  ) : (
    <Comp
      id={getTabsId('tabpanel', index)}
      aria-labelledby={getTabsId('tab', index)}
      role="tabpanel"
      className={joinClassNames('', isSelected ? '' : 'hidden', className)}
    >
      {children}
    </Comp>
  )
}

///////////////////////////////////////////////////////
// Exports

Tab.Group = TabGroup
Tab.List = TabList
Tab.Panels = TabPanels
Tab.Panel = TabPanel

export { Tab, TabGroup, TabList, TabPanels, TabPanel }

///////////////////////////////////////////////////////
// utils

const getTabsId = (role: 'tab' | 'tabpanel', index: number) =>
  `tabs-${role}-${index}` // TODO add real unique id
