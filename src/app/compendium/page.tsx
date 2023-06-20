'use client'

import * as React from 'react'
import { type Entry } from '@/utils/entries'
import { useEntries } from '@/utils/entries-context'
import EntryTabs from '@/components/EntryTabs'

export default function Compendium() {
  const {filteredEntries} = useEntries()
  const [entriesByCategoryList, setEntriesByCategoryList] = React.useState<
    Entry[][]
  >([])
  const defferred = React.useDeferredValue(entriesByCategoryList)

  React.useEffect(() => {
    const entriesByCategoryMap: { [key: string]: Entry[] } = {
      creatures: [],
      monsters: [],
      materials: [],
      equipment: [],
    }
    filteredEntries.forEach((entry) => {
      const {
        category: { name: categoryName },
      } = entry

      if (['animals', 'food'].includes(categoryName)) {
        entriesByCategoryMap['creatures'].push(entry)
      } else if (
        ['monsters', 'materials', 'equipment'].includes(categoryName)
      ) {
        entriesByCategoryMap[categoryName].push(entry)
      }
    })

    setEntriesByCategoryList(Object.values(entriesByCategoryMap))
  }, [filteredEntries])

  return (
    <React.Suspense fallback={<h2>Loading...</h2>}>
      <EntryTabs entriesByCategoryList={defferred} />
    </React.Suspense>
  )
}
