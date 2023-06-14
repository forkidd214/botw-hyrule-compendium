'use client'

import * as React from 'react'
import { Tab } from './index'

export default function TestTab() {
  return (
    <Tab.Group
      defaultIndex={2}
      className="bg-gray-900 outline outline-offset-2 outline-pink-500"
    >
      {({ selectedIndex }) => {
        const getTabStyle = (index: number) =>
          index === selectedIndex ? 'bg-gray-800' : 'bg-gray-600'

        return (
          <>
            <h3 className="text-pink-200">selectedIndex is {selectedIndex}</h3>
            <Tab.List className="flex w-full  justify-between gap-2  p-1">
              <Tab className={`flex-1 rounded-md ${getTabStyle(0)}`}>Tab1</Tab>
              <Tab className={`flex-1 rounded-md ${getTabStyle(1)}`}>
                <div>
                  <h1>Tab2</h1>
                  <h2>is complex</h2>
                </div>
              </Tab>
              <Tab className={`flex-1 rounded-md ${getTabStyle(2)}`}>
                {({ isSelected }) =>
                  isSelected ? 'Active Tab 3' : 'Inactive Tab 3'
                }
              </Tab>
            </Tab.List>
            <Tab.Panels className="m-1 flex flex-col gap-1 rounded-md bg-gray-600 p-2">
              <Tab.Panel className="rounded-md bg-yellow-500 p-1">
                Panel1
              </Tab.Panel>
              <Tab.Panel className="rounded-md bg-teal-500 p-1 dark:block">
                Panel2 will always be there
              </Tab.Panel>
              <Tab.Panel className="rounded-md bg-blue-500 p-1">
                {({ isSelected }) =>
                  isSelected ? 'Active Panel 3' : 'Inactive Panel 3'
                }
              </Tab.Panel>
            </Tab.Panels>
          </>
        )
      }}
    </Tab.Group>
  )
}
