"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FadeIn from "@/components/fade-in";
import { ActiveFilters } from "@/components/shop/active-filters";
import {
  type FilterOptions,
  FilterSidebar,
} from "@/components/shop/filter-sidebar";
import { MobileFilterDrawer } from "@/components/shop/mobile-filter-drawer";
import { ProductCard } from "@/components/shop/product-card";
import { SortDropdown } from "@/components/shop/sort-dropdown";

// This would typically come from a database or CMS
const products = [
  {
    id: 1,
    name: "Modern Lounge Chair",
    price: 895,
    originalPrice: 1095,
    category: "Seating",
    categoryId: "seating",
    image: "/placeholder.svg?height=600&width=600",
    colors: ["natural", "gray"],
    materials: ["wood", "fabric"],
    inStock: true,
    onSale: true,
    isNew: false,
  },
  {
    id: 2,
    name: "Sustainable Coffee Table",
    price: 645,
    category: "Tables",
    categoryId: "tables",
    image: "/placeholder.svg?height=600&width=600",
    colors: ["natural"],
    materials: ["wood"],
    inStock: true,
    onSale: false,
    isNew: true,
  },
  {
    id: 3,
    name: "Designer Pendant Light",
    price: 325,
    category: "Lighting",
    categoryId: "lighting",
    image: "/placeholder.svg?height=600&width=600",
    colors: ["black", "brass"],
    materials: ["metal", "glass"],
    inStock: true,
    onSale: false,
    isNew: false,
  },
  {
    id: 4,
    name: "Handcrafted Ceramic Vase",
    price: 68,
    originalPrice: 85,
    category: "Decor",
    categoryId: "decor",
    image: "/placeholder.svg?height=600&width=600",
    colors: ["white", "terracotta"],
    materials: ["ceramic"],
    inStock: true,
    onSale: true,
    isNew: false,
  },
  {
    id: 5,
    name: "Natural Linen Throw Pillow",
    price: 42,
    category: "Textiles",
    categoryId: "textiles",
    image: "/placeholder.svg?height=600&width=600",
    colors: ["natural", "gray", "terracotta"],
    materials: ["linen"],
    inStock: true,
    onSale: false,
    isNew: false,
  },
  {
    id: 6,
    name: "Solid Wood Dining Table",
    price: 1250,
    category: "Tables",
    categoryId: "tables",
    image: "/placeholder.svg?height=600&width=600",
    colors: ["natural", "walnut"],
    materials: ["wood"],
    inStock: false,
    onSale: false,
    isNew: false,
  },
  {
    id: 7,
    name: "Minimalist Floor Lamp",
    price: 385,
    category: "Lighting",
    categoryId: "lighting",
    image: "/placeholder.svg?height=600&width=600",
    colors: ["black", "brass"],
    materials: ["metal"],
    inStock: true,
    onSale: false,
    isNew: true,
  },
  {
    id: 8,
    name: "Organic Cotton Throw Blanket",
    price: 95,
    category: "Textiles",
    categoryId: "textiles",
    image: "/placeholder.svg?height=600&width=600",
    colors: ["natural", "gray", "terracotta"],
    materials: ["cotton"],
    inStock: true,
    onSale: false,
    isNew: false,
  },
  {
    id: 9,
    name: "Handwoven Seagrass Basket",
    price: 38,
    category: "Storage",
    categoryId: "storage",
    image: "/placeholder.svg?height=600&width=600",
    colors: ["natural"],
    materials: ["seagrass"],
    inStock: true,
    onSale: false,
    isNew: false,
  },
];

// Available categories
const categories = [
  { id: "seating", name: "Seating" },
  { id: "tables", name: "Tables" },
  { id: "lighting", name: "Lighting" },
  { id: "decor", name: "Decor" },
  { id: "textiles", name: "Textiles" },
  { id: "storage", name: "Storage" },
];

// Available colors
const colors = [
  { id: "natural", name: "Natural" },
  { id: "gray", name: "Gray" },
  { id: "black", name: "Black" },
  { id: "white", name: "White" },
  { id: "terracotta", name: "Terracotta" },
  { id: "brass", name: "Brass" },
  { id: "walnut", name: "Walnut" },
];

// Available materials
const materials = [
  { id: "wood", name: "Wood" },
  { id: "fabric", name: "Fabric" },
  { id: "metal", name: "Metal" },
  { id: "glass", name: "Glass" },
  { id: "ceramic", name: "Ceramic" },
  { id: "linen", name: "Linen" },
  { id: "cotton", name: "Cotton" },
  { id: "seagrass", name: "Seagrass" },
];

// Price range
const priceRange: [number, number] = [0, 1500];

export default function ShopPageClient() {
  // Search state
  const [searchQuery, setSearchQuery] = useState("");

  // Sort state
  const [sortOption, setSortOption] = useState("featured");

  // Filter state
  const [filters, setFilters] = useState<FilterOptions>({
    price: priceRange,
    categories: [],
    colors: [],
    materials: [],
    inStock: false,
    onSale: false,
  });

  // Filtered products
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Calculate active filter count
  const activeFilterCount =
    filters.categories.length +
    filters.colors.length +
    filters.materials.length +
    (filters.inStock ? 1 : 0) +
    (filters.onSale ? 1 : 0) +
    (filters.price[0] !== priceRange[0] || filters.price[1] !== priceRange[1]
      ? 1
      : 0);

  // Handle filter changes
  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      price: priceRange,
      categories: [],
      colors: [],
      materials: [],
      inStock: false,
      onSale: false,
    });
    setSearchQuery("");
  };

  // Apply filters and sorting
  useEffect(() => {
    console.log("Sort Option Changed:", sortOption); // Add this line
    let result = [...products];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (filters.categories.length > 0) {
      result = result.filter((product) =>
        filters.categories.includes(product.categoryId)
      );
    }

    // Apply color filter
    if (filters.colors.length > 0) {
      result = result.filter((product) =>
        product.colors.some((color) => filters.colors.includes(color))
      );
    }

    // Apply material filter
    if (filters.materials.length > 0) {
      result = result.filter((product) =>
        product.materials.some((material) =>
          filters.materials.includes(material)
        )
      );
    }

    // Apply price filter
    result = result.filter(
      (product) =>
        product.price >= filters.price[0] && product.price <= filters.price[1]
    );

    // Apply in stock filter
    if (filters.inStock) {
      result = result.filter((product) => product.inStock);
    }

    // Apply on sale filter
    if (filters.onSale) {
      result = result.filter((product) => product.onSale);
    }

    // Apply sorting
    switch (sortOption) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "newest":
        result.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
        break;
      // featured is default, no sorting needed
    }

    setFilteredProducts(result);
  }, [filters, searchQuery, sortOption]);

  return (
    <div className="bg-[#f8f5f2]">
      <header className="relative h-[50vh] w-full overflow-hidden">
        <Image
          src="/placeholder.svg?height=800&width=1600"
          alt="Hello Space furniture collection"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30">
          <div className="container flex h-full flex-col items-center justify-center px-4 text-center text-white md:px-6">
            <h1 className="font-serif text-4xl font-medium tracking-tight sm:text-5xl">
              Curated Furniture Collections That Define Style
            </h1>
          </div>
        </div>
      </header>

      <main>
        <FadeIn>
          <section className="py-16 md:py-24">
            <div className="container px-4 md:px-6">
              <div className="mx-auto max-w-3xl">
                <p className="text-lg text-[#6b6963]">
                  At Hello Space, we offer a diverse range of quality furniture
                  that blends style with functionality. Each piece is designed
                  to complement modern interiors and create a harmonious balance
                  in your home. Shop our collection and find the perfect
                  statement pieces that not only enhance your decor but also
                  stand the test of time.
                </p>
              </div>
            </div>
          </section>
        </FadeIn>

        <FadeIn>
          <section className="py-8 md:py-12">
            <div className="container px-4 md:px-6">
              {/* Search and filter controls */}
              <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center space-x-2">
                  {/* Mobile filter drawer */}
                  <div className="block sm:hidden">
                    <MobileFilterDrawer
                      filters={filters}
                      onChange={handleFilterChange}
                      onReset={resetFilters}
                      priceRange={priceRange}
                      availableCategories={categories}
                      availableColors={colors}
                      availableMaterials={materials}
                      activeFilterCount={activeFilterCount}
                    />
                  </div>

                  {/* Search input */}
                  <div className="relative flex-1 sm:flex-none">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-[#a8a49e]" />
                    <Input
                      type="search"
                      placeholder="Search products..."
                      className="w-full rounded-md border-[#e2ded9] pl-8 text-sm placeholder:text-[#a8a49e] focus:border-[#a8a49e] focus:ring-[#a8a49e] md:w-[300px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                {/* Sort dropdown */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-[#6b6963]">Sort by:</span>
                  <SortDropdown value={sortOption} onChange={setSortOption} />
                </div>
              </div>

              {/* Active filters */}
              <ActiveFilters
                filters={filters}
                onChange={handleFilterChange}
                onReset={resetFilters}
                availableCategories={categories}
                availableColors={colors}
                availableMaterials={materials}
                priceRange={priceRange}
              />

              {/* Main content grid with sidebar */}
              <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                {/* Filter sidebar - desktop only */}
                <div className="hidden md:block">
                  <FilterSidebar
                    filters={filters}
                    onChange={handleFilterChange}
                    onReset={resetFilters}
                    priceRange={priceRange}
                    availableCategories={categories}
                    availableColors={colors}
                    availableMaterials={materials}
                    activeFilterCount={activeFilterCount}
                  />
                </div>

                {/* Product grid */}
                <div className="md:col-span-3">
                  {filteredProducts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-lg bg-white p-8 text-center">
                      <h3 className="mb-2 text-lg font-medium text-[#3c3a36]">
                        No products found
                      </h3>
                      <p className="mb-4 text-[#6b6963]">
                        Try adjusting your filters or search query to find what
                        you&apos;re looking for.
                      </p>
                      <Button
                        onClick={resetFilters}
                        className="bg-[#c25e40] hover:bg-[#a04e35] text-white"
                      >
                        Reset Filters
                      </Button>
                    </div>
                  ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {filteredProducts.map((product) => (
                        <ProductCard
                          key={product.id}
                          id={product.id}
                          name={product.name}
                          price={product.price}
                          originalPrice={product.originalPrice}
                          category={product.category}
                          image={product.image}
                          isNew={product.isNew}
                          onSale={product.onSale}
                          slug={product.id}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </FadeIn>

        <FadeIn>
          <section className="bg-[#e9e5e0] py-16 md:py-24">
            <div className="container px-4 md:px-6">
              <div className="grid gap-12 md:grid-cols-2 md:items-center">
                <div className="space-y-4">
                  <h2 className="font-serif text-3xl font-medium tracking-tight text-[#3c3a36]">
                    Custom Furniture Design
                  </h2>
                  <p className="text-[#6b6963]">
                    Can&apos;t find exactly what you&apos;re looking for? Our
                    team can create custom furniture pieces tailored to your
                    specific needs and preferences. From concept to creation,
                    we&apos;ll work with you to design furniture that perfectly
                    fits your space and style.
                  </p>
                  <div className="pt-4">
                    <Button
                      asChild
                      className="bg-[#c25e40] text-white hover:bg-[#a04e35]"
                    >
                      <Link href="/Consultation">
                        Inquire About Custom Furniture
                      </Link>
                    </Button>
                  </div>
                </div>
                <div className="relative aspect-video overflow-hidden rounded-lg">
                  <Image
                    src="/shopImg/custom-furniture.png?height=800&width=1600"
                    alt="Custom furniture design process"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </section>
        </FadeIn>
      </main>
    </div>
  );
}
