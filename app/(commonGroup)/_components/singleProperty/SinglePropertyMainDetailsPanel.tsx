'use client'
import React from 'react'
import { PropertyDetails } from '../../_types/singlePropertyTypes';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ActiveRentalRequests } from './ActiveRentalRequests';
import { Role } from '@/lib/types';
interface MainDetailsPanel {
  property: PropertyDetails;
  isLoggedIn: boolean;
  userRole?: Role
}
const SinglePropertyMainDetailsPanel = ({
  property,
  isLoggedIn,
  userRole,
}: MainDetailsPanel) => {
  return (
    <div className="space-y-6 lg:col-span-2">
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Badge variant="outline" className="text-xl font-semibold capitalize">
            {property.category.name.toLowerCase()}
          </Badge>
          <Badge
            variant={
              property.rentStatus === "AVAILABLE" ? "default" : "destructive"
            }
            className="text-sm"
          >
            {property.rentStatus}
          </Badge>
        </div>
        <h1 className="text-base font-bold tracking-tight text-foreground">
          {property.areaInSqFt.toLocaleString()} Square Feet{" "}
          {property.category.name} in {property.location}
        </h1>
        <p className="text-2xl font-semibold text-primary mt-2">
          TK {property.rentPrice.toLocaleString()} / month
        </p>
      </div>

      {/* Quick Specifications grid */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Property Specifications</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 sm:grid-cols-3 text-sm">
          <div>
            <p className="text-muted-foreground">Location zone</p>
            <p className="font-semibold text-foreground">{property.location}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Total Area</p>
            <p className="font-semibold text-foreground">
              {property.areaInSqFt} Sq Ft
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Current Status</p>
            <p className="font-semibold text-foreground capitalize">
              {property.rentStatus.toLowerCase()}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Amenities Badges Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Included Amenities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {property.amenities.map((amenity) => (
              <Badge
                key={amenity}
                variant="secondary"
                className="px-3 py-1 text-xs"
              >
                {amenity.replace("_", " ")}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tab Selection Panel */}
      <div className="space-y-6">
        {/* Landlord Details Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Landlord Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-foreground">
            <p>
              <strong className="text-muted-foreground">Name:</strong>{" "}
              {property.landlord.name}
            </p>
            <p>
              <strong className="text-muted-foreground">Email:</strong>{" "}
              {property.landlord.email}
            </p>
            <p>
              <strong className="text-muted-foreground">Contact:</strong>{" "}
              {property.landlord.contactNo}
            </p>
            <p>
              <strong className="text-muted-foreground">Address:</strong>{" "}
              {property.landlord.address}
            </p>
          </CardContent>
        </Card>

        {/* New Separate Encapsulated Requests Component */}
        <ActiveRentalRequests
          requests={property.propertyRentRequests}
          isLoggedIn={isLoggedIn}
          userRole={userRole}
        />

        {/* Reviews Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold tracking-tight text-foreground px-1">
            Reviews ({property.propertyReviews.length})
          </h3>

          {property.propertyReviews.length === 0 ? (
            <Card>
              <CardContent className="py-6 text-center text-muted-foreground text-sm">
                No consumer reviews documented yet.
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {property.propertyReviews.map((review, index) => (
                <Card key={index}>
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-medium text-sm text-foreground">
                        {review.tenant.name}
                      </p>
                      <span className="text-amber-500 text-sm font-bold">
                        ★ {review.rating} / 5
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {review.content}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SinglePropertyMainDetailsPanel