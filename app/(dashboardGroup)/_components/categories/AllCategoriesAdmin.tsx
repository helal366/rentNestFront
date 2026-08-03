import React from 'react'
import { CategoryWithProperties } from '../../_types/category_types'
import Link from 'next/link'
import { DollarSign, Home, MapPin, Maximize,User, Mail, Phone, Wifi } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
interface AllCategoriesAdminProps{
  categories: CategoryWithProperties[]
}
const AllCategoriesAdmin = ({categories}:AllCategoriesAdminProps) => {
  return (
   <div className="container mx-auto py-10 px-4 space-y-12">
      {/* ================= PART 1: CATEGORY NAMES QUICK LINKS ================= */}
      <div className="bg-muted/50 p-6 rounded-xl border">
        <h2 className="text-xl font-semibold mb-4 tracking-tight">
          Available Categories
        </h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`#${category.name.toLowerCase()}`}
              className="inline-flex items-center gap-2 bg-background hover:bg-primary hover:text-primary-foreground px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors shadow-sm"
            >
              <Home className="h-4 w-4" />
              {category.name}
              <Badge variant="secondary" className="ml-1 pointer-events-none">
                {category.properties.length}
              </Badge>
            </Link>
          ))}
        </div>
      </div>

      {/* ================= PART 2: CATEGORIES & PROPERTY DETAILS ================= */}
      <div className="space-y-16">
        {categories.map((category) => (
          <div
            key={category.id}
            id={category.name.toLowerCase()}
            className="scroll-mt-6 space-y-6"
          >
            <div className="flex items-center gap-3 border-b pb-3">
              <h2 className="text-2xl font-bold tracking-tight text-primary">
                {category.name}s
              </h2>
              <Badge variant="outline">
                {category.properties.length} Active Listings
              </Badge>
            </div>

            {category.properties.length === 0 ? (
              <p className="text-muted-foreground text-sm italic pl-2">
                No active properties listed under this category yet.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.properties.map((property) => (
                  <Card
                    key={property.id}
                    className="flex flex-col justify-between overflow-hidden shadow-md border-muted-foreground/10 hover:border-primary/30 transition-all"
                  >
                    <CardHeader className="bg-muted/30 pb-4">
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex items-center text-muted-foreground text-sm font-medium">
                          <MapPin className="mr-1 h-4 w-4 text-destructive" />
                          {property.location}
                        </div>
                        <Badge
                          variant={
                            property.rentStatus === "AVAILABLE"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {property.rentStatus}
                        </Badge>
                      </div>

                      <div className="flex items-baseline gap-1 mt-2 text-2xl font-bold tracking-tight">
                        <span className="text-xl font-semibold text-emerald-600 mr-0.5">TK </span>
                        {property.rentPrice.toLocaleString()}
                        <span className="text-xs font-normal text-muted-foreground">
                          /month
                        </span>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-5 pt-4 text-sm flex flex-col flex-1">
                      {/* Property Specs */}
                      <div className="flex items-center text-muted-foreground">
                        <Maximize className="mr-2 h-4 w-4" />
                        <span>
                          Area Size:{" "}
                          <strong>{property.areaInSqFt} Sq Ft</strong>
                        </span>
                      </div>

                      {/* Amenities List */}
                      <div className="space-y-1.5">
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
                          Included Amenities
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {property.amenities.map((amenity) => (
                            <Badge
                              key={amenity}
                              variant="outline"
                              className="text-[11px] py-0 px-2 flex items-center gap-1"
                            >
                              <Wifi className="h-3 w-3 text-muted-foreground" />
                              {amenity.replace("_", " ")}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Landlord Contact Sub-Section */}
                      <div className="pt-4 border-t space-y-2 bg-muted/20 -mx-6 -mb-6 p-4 mt-auto">
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
                          Landlord Details
                        </span>
                        <div className="space-y-1 text-xs">
                          <div className="flex items-center font-medium text-foreground">
                            <User className="mr-2 h-3.5 w-3.5 text-primary" />
                            {property.landlord.name}
                          </div>
                          <div className="flex items-center text-muted-foreground truncate">
                            <Mail className="mr-2 h-3.5 w-3.5" />
                            {property.landlord.email}
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <Phone className="mr-2 h-3.5 w-3.5" />
                            {property.landlord.contactNo}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllCategoriesAdmin