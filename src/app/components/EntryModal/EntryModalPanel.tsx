import * as React from 'react'
import { type Entry } from '@/utils/entries'
import Image from 'next/image'
import Logo from '@/components/Logo'
import Icon from '@/components/Icon'
import { toPascalCase } from '@/app/utils'

type ModalPanelPropsType = {
  entry: Entry
  onClose?: () => void
}

const VARIANTS: { [key: string]: { [key: string]: true | undefined } } = {
  animals: { hasDrops: true },
  food: { hasHeartsRecovered: true, hasCookingEffect: true },
  equipment: { hasEquipmentSection: true },
  materials: { hasHeartsRecovered: true, hasCookingEffect: true },
  monsters: { hasDrops: true },
}

export default function ModalPanel({ entry, onClose }: ModalPanelPropsType) {
  const {
    category,
    name,
    commonLocations,
    drops,
    cookingEffect,
    attack,
    defense,
  } = entry

  try {
    const { hasDrops } = VARIANTS[category.name]
  } catch (err) {
    console.error({ category })
  }

  const {
    hasDrops,
    hasHeartsRecovered,
    hasCookingEffect,
    hasEquipmentSection,
  } = VARIANTS[category.name]

  return (
    <figure className="flex flex-col gap-4">
      <div className="flex items-center justify-between border-b-2 border-b-yellow-50/75 pb-4">
        <Logo>{name}</Logo>
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="h-12 w-12 rounded-sm p-2 hover:bg-slate-800 focus:bg-slate-800"
        >
          <Icon id="x-mark" />
        </button>
      </div>

      <MainSection entry={entry} hasHeartsRecovered={hasHeartsRecovered} />
      {hasDrops && <DropsSection drops={drops} />}
      {hasCookingEffect && (
        <CookingEffectSection cookingEffect={cookingEffect} />
      )}
      {hasEquipmentSection && (
        <EquipmentSection attack={attack} defense={defense} />
      )}
      <CommonLocationsSection commonLocations={commonLocations} />
    </figure>
  )
}

const MainSection = ({
  entry: { image, description, heartsRecovered },
  hasHeartsRecovered,
}: {
  entry: Entry
  hasHeartsRecovered?: true
}) => {
  return (
    <section className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div
        className={`relative aspect-square min-w-[160px] overflow-hidden rounded-md`}
      >
        <Image
          alt="" // refer to adjacent text <Logo>{name}</Logo>
          src={image.src}
          fill
          sizes={image.width + 'px'}
          className="object-cover"
        />
      </div>
      <div>
        {hasHeartsRecovered && <Hearts count={heartsRecovered as number} />}
        <p className="text-justify text-base font-thin ">{description}</p>
      </div>
    </section>
  )
}

const Hearts = ({ count }: { count: number }) => {
  const healthCount = Math.floor(count)
  const hasHealthHalf = healthCount !== count
  const id = React.useId()

  if (!count) return null

  return (
    <div className="mx-auto mb-4 flex w-fit flex-row sm:mx-0">
      <span className="sr-only">{count} of hearts recoverd</span>
      {Array.from({ length: healthCount }).map((_, index) => (
        <Image
          key={id + '-' + index}
          alt=""
          src="/images/health.png"
          height={20}
          width={20}
        />
      ))}
      {hasHealthHalf && (
        <Image alt="" src="/images/health-half.png" height={20} width={20} />
      )}
    </div>
  )
}

const FeatureSection = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => {
  return (
    <section>
      <h2 className="text-xl font-semibold">{toPascalCase(title)}</h2>
      <div className="font-thin italic">{children}</div>
    </section>
  )
}

const CommonLocationsSection = ({
  commonLocations,
}: {
  commonLocations: string[]
}) => {
  return (
    <FeatureSection title="common locations">
      <ul className="columns-2">
        {commonLocations.map((location) => (
          <li key={location}>{toPascalCase(location)}</li>
        ))}
      </ul>
    </FeatureSection>
  )
}

const DropsSection = ({ drops }: { drops: string[] }) => {
  return (
    <FeatureSection title="drops">
      <ul className="columns-2">
        {drops.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </FeatureSection>
  )
}

const CookingEffectSection = ({
  cookingEffect,
}: {
  cookingEffect: string | null
}) => {
  return (
    <FeatureSection title="cooking effect">
      <p className="">{toPascalCase(cookingEffect || 'Heart Recovery')}</p>
    </FeatureSection>
  )
}

const EquipmentSection = ({
  attack,
  defense,
}: {
  attack: number | null
  defense: number | null
}) => {
  const isWeapen = !!attack
  const isShield = !!defense
  const isArrow = !attack && !defense

  return isArrow ? null : (
    <FeatureSection title="property">
      <p className="">
        {isWeapen && `Attack ${attack}`}
        {isShield && `Defense ${defense}`}
      </p>
    </FeatureSection>
  )
}
