'use client'

import React, { useRef, useState, useEffect } from 'react'
import { Tab } from './index'

export default function TestTab() {
  return (
    <Tab.Group className="bg-gray-900 ">
      <Tab.List className="flex w-full  justify-between gap-2  p-1">
        <Tab className="flex-1 rounded-md bg-gray-600">Tab1</Tab>
        <Tab className="flex-1 rounded-md bg-gray-600">Tab2</Tab>
        <Tab className="flex-1 rounded-md bg-gray-600">Tab3</Tab>
      </Tab.List>
      <Tab.Panels className="m-1 flex flex-col gap-1 rounded-md bg-gray-600 p-2">
        <Tab.Panel className="rounded-md p-1">Panel1</Tab.Panel>
        <Tab.Panel className="rounded-md p-1">Panel2</Tab.Panel>
        <Tab.Panel className="rounded-md p-1">Panel3</Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  )
}

/*

function MyTabs() {
  const tabListRef = useRef()
  const tabPanelRef = useRef()
  const activeTabIndex = useTabsKeyboardNavigation(tabListRef, tabPanelRef)

  return (
    <div>
      <Tab.Group>
        <Tab.List ref={tabListRef}>
          <Tab active={activeTabIndex === 0}>Tab 1</Tab>
          <Tab active={activeTabIndex === 1}>Tab 2</Tab>
          <Tab active={activeTabIndex === 2}>Tab 3</Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel ref={tabPanelRef}>Content 1</Tab.Panel>
          <Tab.Panel ref={tabPanelRef}>Content 2</Tab.Panel>
          <Tab.Panel ref={tabPanelRef}>Content 3</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

function useTabsKeyboardNavigation(tabListRef, tabPanelRef) {
  const [activeTabIndex, setActiveTabIndex] = useState(0)

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      setActiveTabIndex((prevIndex) => (prevIndex === 0 ? 2 : prevIndex - 1))
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      setActiveTabIndex((prevIndex) => (prevIndex === 2 ? 0 : prevIndex + 1))
    } else if (event.key === 'Home') {
      event.preventDefault()
      setActiveTabIndex(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      setActiveTabIndex(2)
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      // Optionally handle tab activation logic here
    }
  }

  useEffect(() => {
    tabListRef.current.addEventListener('keydown', handleKeyDown)
    return () => {
      tabListRef.current.removeEventListener('keydown', handleKeyDown)
    }
  }, [tabListRef])

  useEffect(() => {
    if (tabPanelRef.current) {
      const focusableElements = tabPanelRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      const firstFocusableElement = focusableElements[0]
      if (firstFocusableElement) {
        firstFocusableElement.focus()
      }
    }
  }, [activeTabIndex, tabPanelRef])

  return activeTabIndex
}

*/
