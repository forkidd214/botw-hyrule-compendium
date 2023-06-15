import { Entry } from '@/utils/entries'
import EntryModal from '@/components/EntryModal'

type EntryModalGridProps = {
  entries: Entry[]
}

export default function EntryModalGrid({ entries }: EntryModalGridProps) {
  return (
    <div className="grid max-w-full auto-rows-[72px]  grid-cols-[repeat(auto-fit,minmax(min(250px,100%),1fr))] gap-2">
      {entries.map((entry, index) => (
        <EntryModal key={`key-${index}`} entry={entry} />
      ))}
    </div>
  )
}
