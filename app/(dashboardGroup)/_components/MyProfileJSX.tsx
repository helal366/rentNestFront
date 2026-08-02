import React from 'react'
import { UserProfile } from '../_types/my_profile_types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from "@/components/ui/separator";

type Props = {
  data: UserProfile;
};
const MyProfileJSX = ({ data }: Props ) => {
    if(!data){
        return <div>Please login to view your profile.</div>
    }
  return (
    <div className="p-6 space-y-6">
      {/* Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle>My Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>
            <strong>Name:</strong> {data.name}
          </p>
          <p>
            <strong>Email:</strong> {data.email}
          </p>
          <p>
            <strong>Role:</strong> <Badge>{data.role}</Badge>
          </p>
          <p>
            <strong>Contact:</strong> {data.contactNo}
          </p>
          <p>
            <strong>Address:</strong> {data.address}
          </p>
        </CardContent>
      </Card>

      {/* Own Properties (Landlord) */}
      {data.ownProperties?.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>My Properties</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.ownProperties.map((p, i) => (
              <div key={i} className="border p-4 rounded-lg space-y-2">
                <p>
                  <strong>Category:</strong> {p.category?.name}
                </p>
                <p>
                  <strong>Rent:</strong> TK {p.rentPrice}
                </p>
                <p>
                  <strong>Area:</strong> {p.areaInSqFt} sqft
                </p>
                <p>
                  <strong>Location:</strong> {p.location}
                </p>
                <Badge>{p.rentStatus}</Badge>
                <div className="flex gap-2 flex-wrap">
                  {p.amenities?.map((a: string, idx: number) => (
                    <Badge key={idx} variant="secondary">
                      {a}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Rental Requests (Tenant) */}
      {data.tenantRentalRequests?.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>My Rental Requests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.tenantRentalRequests.map((r, i) => (
              <div key={i} className="border p-4 rounded-lg space-y-2">
                <p>
                  <strong>Status:</strong> <Badge>{r.requestStatus}</Badge>
                </p>
                <p>
                  <strong>Paid:</strong> {r.isPaid ? "Yes" : "No"}
                </p>

                <Separator />

                <p>
                  <strong>Property Rent:</strong> TK {r.Property?.rentPrice}
                </p>
                <p>
                  <strong>Area:</strong> {r.Property?.areaInSqFt} sqft
                </p>
                <p>
                  <strong>Location:</strong> {r.Property?.location}
                </p>

                <Separator />

                <p>
                  <strong>Landlord:</strong> {r.landlord?.name}
                </p>
                <p>
                  <strong>Contact:</strong> {r.landlord?.contactNo}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Reviews */}
      {data.tenantReviews?.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>My Reviews</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.tenantReviews.map((rev, i) => (
              <div key={i} className="border p-4 rounded-lg space-y-2">
                <p>
                  <strong>Rating:</strong> ⭐ {rev.rating}
                </p>
                <p>{rev.content}</p>

                <Separator />

                <p>
                  <strong>Property Rent:</strong> TK {rev.property?.rentPrice}
                </p>
                <p>
                  <strong>Location:</strong> {rev.property?.location}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Approved Rentals */}
      {data.approvedRentalProperties?.length > 0 && (
        <Card>
          {" "}
          <CardHeader>
            {" "}
            <CardTitle>Approved Rentals</CardTitle>{" "}
          </CardHeader>{" "}
          <CardContent className="space-y-4">
            {data.approvedRentalProperties.map((p, i) => (
              <div key={i} className="border p-4 rounded-lg space-y-2">
                {" "}
                <p>
                  {" "}
                  <strong>Rent:</strong> TK {p.rentPrice}{" "}
                </p>{" "}
                <p>
                  {" "}
                  <strong>Area:</strong> {p.areaInSqFt} sqft{" "}
                </p>{" "}
                <p>
                  {" "}
                  <strong>Location:</strong> {p.location}{" "}
                </p>
                ```
                <div className="flex gap-2 flex-wrap">
                  {p.amenities?.map((a: string, idx: number) => (
                    <Badge key={idx} variant="secondary">
                      {a}
                    </Badge>
                  ))}
                </div>
                <div className="pt-2 border-t">
                  <p>
                    <strong>Landlord:</strong> {p.landlord?.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {p.landlord?.email}
                  </p>
                  <p>
                    <strong>Contact:</strong> {p.landlord?.contactNo}
                  </p>
                  <p>
                    <strong>Address:</strong> {p.landlord?.address}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
          ```
        </Card>
      )}
    </div>
  );
}

export default MyProfileJSX