"use client"

import { Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { type FilterOptions, FilterSidebar } from "./filter-sidebar"

type MobileFilterDrawerProps = {
  filters: FilterOptions
  onChange: (filters: FilterOptions) => void
  onReset: () => void
  priceRange: [number, number]
  availableCategories: { id: string; name: string }[]
  availableColors: { id: string; name: string }[]
  availableMaterials: { id: string; name: string }[]
  activeFilterCount: number
}

export function MobileFilterDrawer({
  filters,
  onChange,
  onReset,
  priceRange,
  availableCategories,
  availableColors,
  availableMaterials,
  activeFilterCount,
}: MobileFilterDrawerProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm" className="border-[#e2ded9] text-[#6b6963]">
          <Filter className="mr-2 h-4 w-4" />
          Filter
          {activeFilterCount > 0 && (
            <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#c25e40] text-xs text-white">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="border-b border-[#e2ded9] px-4">
          <DrawerTitle className="text-[#3c3a36]">Filters</DrawerTitle>
        </DrawerHeader>
        <div className="overflow-y-auto px-4 py-2">
          <FilterSidebar
            filters={filters}
            onChange={onChange}
            onReset={onReset}
            priceRange={priceRange}
            availableCategories={availableCategories}
            availableColors={availableColors}
            availableMaterials={availableMaterials}
            activeFilterCount={activeFilterCount}
          />
        </div>
        <DrawerFooter className="border-t border-[#e2ded9] px-4">
          <DrawerClose asChild>
            <Button className="w-full bg-[#c25e40] hover:bg-[#a04e35] text-white">Apply Filters</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
