"use client"

import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { FilterOptions } from "./filter-sidebar"

type ActiveFiltersProps = {
  filters: FilterOptions
  onChange: (filters: FilterOptions) => void
  onReset: () => void
  availableCategories: { id: string; name: string }[]
  availableColors: { id: string; name: string }[]
  availableMaterials: { id: string; name: string }[]
  priceRange: [number, number]
}

export function ActiveFilters({
  filters,
  onChange,
  onReset,
  availableCategories,
  availableColors,
  availableMaterials,
  priceRange,
}: ActiveFiltersProps) {
  // Don't show if no active filters
  if (
    filters.categories.length === 0 &&
    filters.colors.length === 0 &&
    filters.materials.length === 0 &&
    !filters.inStock &&
    !filters.onSale &&
    filters.price[0] === priceRange[0] &&
    filters.price[1] === priceRange[1]
  ) {
    return null
  }

  const removeCategory = (category: string) => {
    onChange({
      ...filters,
      categories: filters.categories.filter((c) => c !== category),
    })
  }

  const removeColor = (color: string) => {
    onChange({
      ...filters,
      colors: filters.colors.filter((c) => c !== color),
    })
  }

  const removeMaterial = (material: string) => {
    onChange({
      ...filters,
      materials: filters.materials.filter((m) => m !== material),
    })
  }

  const resetPrice = () => {
    onChange({
      ...filters,
      price: priceRange,
    })
  }

  const resetInStock = () => {
    onChange({
      ...filters,
      inStock: false,
    })
  }

  const resetOnSale = () => {
    onChange({
      ...filters,
      onSale: false,
    })
  }

  const isPriceFiltered = filters.price[0] !== priceRange[0] || filters.price[1] !== priceRange[1]

  return (
    <div className="mb-4">
      <div className="flex flex-wrap gap-2">
        {filters.categories.map((categoryId) => {
          const category = availableCategories.find((c) => c.id === categoryId)
          return (
            <Button
              key={categoryId}
              variant="outline"
              size="sm"
              className="h-7 gap-1 rounded-full border-[#e2ded9] bg-white text-xs text-[#6b6963]"
              onClick={() => removeCategory(categoryId)}
            >
              {category?.name}
              <X className="h-3 w-3" />
            </Button>
          )
        })}

        {filters.colors.map((colorId) => {
          const color = availableColors.find((c) => c.id === colorId)
          return (
            <Button
              key={colorId}
              variant="outline"
              size="sm"
              className="h-7 gap-1 rounded-full border-[#e2ded9] bg-white text-xs text-[#6b6963]"
              onClick={() => removeColor(colorId)}
            >
              {color?.name}
              <X className="h-3 w-3" />
            </Button>
          )
        })}

        {filters.materials.map((materialId) => {
          const material = availableMaterials.find((m) => m.id === materialId)
          return (
            <Button
              key={materialId}
              variant="outline"
              size="sm"
              className="h-7 gap-1 rounded-full border-[#e2ded9] bg-white text-xs text-[#6b6963]"
              onClick={() => removeMaterial(materialId)}
            >
              {material?.name}
              <X className="h-3 w-3" />
            </Button>
          )
        })}

        {isPriceFiltered && (
          <Button
            variant="outline"
            size="sm"
            className="h-7 gap-1 rounded-full border-[#e2ded9] bg-white text-xs text-[#6b6963]"
            onClick={resetPrice}
          >
            ${filters.price[0]} - ${filters.price[1]}
            <X className="h-3 w-3" />
          </Button>
        )}

        {filters.inStock && (
          <Button
            variant="outline"
            size="sm"
            className="h-7 gap-1 rounded-full border-[#e2ded9] bg-white text-xs text-[#6b6963]"
            onClick={resetInStock}
          >
            In Stock
            <X className="h-3 w-3" />
          </Button>
        )}

        {filters.onSale && (
          <Button
            variant="outline"
            size="sm"
            className="h-7 gap-1 rounded-full border-[#e2ded9] bg-white text-xs text-[#6b6963]"
            onClick={resetOnSale}
          >
            On Sale
            <X className="h-3 w-3" />
          </Button>
        )}

        <Button
          variant="ghost"
          size="sm"
          className="h-7 text-xs text-[#c25e40] hover:bg-transparent hover:text-[#a04e35]"
          onClick={onReset}
        >
          Clear all
        </Button>
      </div>
    </div>
  )
}
