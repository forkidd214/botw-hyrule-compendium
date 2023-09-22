'use client'

import Image from 'next/image'
import { Tab } from '@/components/Tabs'
import { Entry } from '@/utils/entries'
import EntryModalGrid from '@/components/EntryModalGrid'
import { joinClassNames } from '@/app/utils'

type EntryTabsProps = {
  entriesByCategoryList: Entry[][]
}

export default function EntryTabs({ entriesByCategoryList }: EntryTabsProps) {
  return (
    <Tab.Group className="flex h-full flex-col gap-2 overflow-hidden">
      <Tab.List
        className={joinClassNames(
          'mx-auto flex w-full max-w-sm items-stretch justify-between',
          'divide-x divide-yellow-50/20 rounded-md border border-yellow-50/20'
        )}
      >
        {TABS.map(({ id, category, imageSrc, imageSize }) => (
          <Tab key={id} className={joinClassNames('h-14 flex-1')}>
            {({ isSelected }) => (
              <div
                className={joinClassNames(
                  isSelected ? 'bg-blue-500' : '',
                  'grid h-full w-full place-content-center',
                  'relative overflow-hidden'
                )}
              >
                <Image
                  alt={category}
                  src={imageSrc}
                  width={imageSize}
                  height={imageSize}
                  priority
                />
              </div>
            )}
          </Tab>
        ))}
      </Tab.List>

      <Tab.Panels className="flex-1 overflow-auto">
        {entriesByCategoryList.map((entriesByCategory, i) => (
          <Tab.Panel key={`category-${i}`}>
            <EntryModalGrid entries={entriesByCategory} />
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  )
}

const TABS = [
  {
    id: 'category-creatures',
    category: 'creatures',
    imageSrc: '/images/creatures.png',
    imageSize: 56,
  },
  {
    id: 'category-monsters',
    category: 'monsters',
    imageSrc: '/images/monsters.png',
    imageSize: 56,
  },
  {
    id: 'category-materials',
    category: 'materials',
    imageSrc: '/images/materials.png',
    imageSize: 56,
  },
  {
    id: 'category-equipment',
    category: 'equipment',
    imageSrc: '/images/equipment.png',
    imageSize: 56,
  },
]
