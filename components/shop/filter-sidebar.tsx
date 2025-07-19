"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { AccentDivider } from "@/components/accent-divider"

export type FilterOptions = {
  price: [number, number]
  categories: string[]
  colors: string[]
  materials: string[]
  inStock: boolean
  onSale: boolean
}

type FilterSidebarProps = {
  filters: FilterOptions
  onChange: (filters: FilterOptions) => void
  onReset: () => void
  priceRange: [number, number]
  availableCategories: { id: string; name: string }[]
  availableColors: { id: string; name: string }[]
  availableMaterials: { id: string; name: string }[]
  activeFilterCount: number
}

export function FilterSidebar({
  filters,
  onChange,
  onReset,
  priceRange,
  availableCategories,
  availableColors,
  availableMaterials,
  activeFilterCount,
}: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    categories: true,
    colors: true,
    materials: true,
    availability: true,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handlePriceChange = (value: number[]) => {
    onChange({
      ...filters,
      price: [value[0], value[1]],
    })
  }

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked ? [...filters.categories, category] : filters.categories.filter((c) => c !== category)

    onChange({
      ...filters,
      categories: newCategories,
    })
  }

  const handleColorChange = (color: string, checked: boolean) => {
    const newColors = checked ? [...filters.colors, color] : filters.colors.filter((c) => c !== color)

    onChange({
      ...filters,
      colors: newColors,
    })
  }

  const handleMaterialChange = (material: string, checked: boolean) => {
    const newMaterials = checked ? [...filters.materials, material] : filters.materials.filter((m) => m !== material)

    onChange({
      ...filters,
      materials: newMaterials,
    })
  }

  const handleInStockChange = (checked: boolean) => {
    onChange({
      ...filters,
      inStock: checked,
    })
  }

  const handleOnSaleChange = (checked: boolean) => {
    onChange({
      ...filters,
      onSale: checked,
    })
  }

  return (
    <div className="flex flex-col space-y-6 bg-white p-4 rounded-lg border border-[#e2ded9]">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-[#3c3a36]">Filters</h2>
        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="h-8 px-2 text-[#c25e40] hover:text-[#c25e40] hover:bg-[#f8f5f2]"
          >
            Clear all
            <X className="ml-1 h-4 w-4" />
          </Button>
        )}
      </div>

      <AccentDivider />

      {/* Price Range */}
      <div className="space-y-2">
        <button
          onClick={() => toggleSection("price")}
          className="flex w-full items-center justify-between text-left font-medium text-[#3c3a36]"
        >
          <span>Price Range</span>
          {expandedSections.price ? (
            <ChevronUp className="h-4 w-4 text-[#6b6963]" />
          ) : (
            <ChevronDown className="h-4 w-4 text-[#6b6963]" />
          )}
        </button>

        {expandedSections.price && (
          <div className="pt-2 pb-4">
            <Slider
              defaultValue={[filters.price[0], filters.price[1]]}
              min={priceRange[0]}
              max={priceRange[1]}
              step={10}
              onValueChange={handlePriceChange}
              className="py-4"
            />
            <div className="flex items-center justify-between text-sm text-[#6b6963]">
              <span>${filters.price[0]}</span>
              <span>${filters.price[1]}</span>
            </div>
          </div>
        )}
      </div>

      <AccentDivider />

      {/* Categories */}
      <div className="space-y-2">
        <button
          onClick={() => toggleSection("categories")}
          className="flex w-full items-center justify-between text-left font-medium text-[#3c3a36]"
        >
          <span>Categories</span>
          {expandedSections.categories ? (
            <ChevronUp className="h-4 w-4 text-[#6b6963]" />
          ) : (
            <ChevronDown className="h-4 w-4 text-[#6b6963]" />
          )}
        </button>

        {expandedSections.categories && (
          <div className="space-y-2 pt-2">
            {availableCategories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category.id}`}
                  checked={filters.categories.includes(category.id)}
                  onCheckedChange={(checked) => handleCategoryChange(category.id, checked === true)}
                  className="border-[#a8a49e] data-[state=checked]:bg-[#c25e40] data-[state=checked]:border-[#c25e40]"
                />
                <label htmlFor={`category-${category.id}`} className="text-sm text-[#6b6963] cursor-pointer">
                  {category.name}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      <AccentDivider />

      {/* Colors */}
      <div className="space-y-2">
        <button
          onClick={() => toggleSection("colors")}
          className="flex w-full items-center justify-between text-left font-medium text-[#3c3a36]"
        >
          <span>Colors</span>
          {expandedSections.colors ? (
            <ChevronUp className="h-4 w-4 text-[#6b6963]" />
          ) : (
            <ChevronDown className="h-4 w-4 text-[#6b6963]" />
          )}
        </button>

        {expandedSections.colors && (
          <div className="space-y-2 pt-2">
            {availableColors.map((color) => (
              <div key={color.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`color-${color.id}`}
                  checked={filters.colors.includes(color.id)}
                  onCheckedChange={(checked) => handleColorChange(color.id, checked === true)}
                  className="border-[#a8a49e] data-[state=checked]:bg-[#c25e40] data-[state=checked]:border-[#c25e40]"
                />
                <label htmlFor={`color-${color.id}`} className="text-sm text-[#6b6963] cursor-pointer">
                  {color.name}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      <AccentDivider />

      {/* Materials */}
      <div className="space-y-2">
        <button
          onClick={() => toggleSection("materials")}
          className="flex w-full items-center justify-between text-left font-medium text-[#3c3a36]"
        >
          <span>Materials</span>
          {expandedSections.materials ? (
            <ChevronUp className="h-4 w-4 text-[#6b6963]" />
          ) : (
            <ChevronDown className="h-4 w-4 text-[#6b6963]" />
          )}
        </button>

        {expandedSections.materials && (
          <div className="space-y-2 pt-2">
            {availableMaterials.map((material) => (
              <div key={material.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`material-${material.id}`}
                  checked={filters.materials.includes(material.id)}
                  onCheckedChange={(checked) => handleMaterialChange(material.id, checked === true)}
                  className="border-[#a8a49e] data-[state=checked]:bg-[#c25e40] data-[state=checked]:border-[#c25e40]"
                />
                <label htmlFor={`material-${material.id}`} className="text-sm text-[#6b6963] cursor-pointer">
                  {material.name}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      <AccentDivider />

      {/* Availability */}
      <div className="space-y-2">
        <button
          onClick={() => toggleSection("availability")}
          className="flex w-full items-center justify-between text-left font-medium text-[#3c3a36]"
        >
          <span>Availability</span>
          {expandedSections.availability ? (
            <ChevronUp className="h-4 w-4 text-[#6b6963]" />
          ) : (
            <ChevronDown className="h-4 w-4 text-[#6b6963]" />
          )}
        </button>

        {expandedSections.availability && (
          <div className="space-y-2 pt-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="in-stock"
                checked={filters.inStock}
                onCheckedChange={(checked) => handleInStockChange(checked === true)}
                className="border-[#a8a49e] data-[state=checked]:bg-[#c25e40] data-[state=checked]:border-[#c25e40]"
              />
              <label htmlFor="in-stock" className="text-sm text-[#6b6963] cursor-pointer">
                In Stock
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="on-sale"
                checked={filters.onSale}
                onCheckedChange={(checked) => handleOnSaleChange(checked === true)}
                className="border-[#a8a49e] data-[state=checked]:bg-[#c25e40] data-[state=checked]:border-[#c25e40]"
              />
              <label htmlFor="on-sale" className="text-sm text-[#6b6963] cursor-pointer">
                On Sale
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
