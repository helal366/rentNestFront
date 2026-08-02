"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Building,
  User,
  MapPin,
  Calendar,
  Coins,
  ShieldCheck,
  FileText,
  Star,
} from "lucide-react";
import { RentalRequest } from "../../_types/rental_requests_types";

interface RentalDetailsModalProps {
  request: RentalRequest;
}

export function RentalDetailsModal({ request }: RentalDetailsModalProps) {
  const property = request.rentalRequestProperty;

  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* Simple visual button added to each table row */}
        <Button
          variant="outline"
          size="sm"
          className="hover:bg-slate-100 font-medium"
        >
          Details
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-white p-6 shadow-lg rounded-lg border border-slate-200">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="text-xl font-bold flex items-center gap-2 text-slate-900">
            <FileText className="w-5 h-5 text-teal-600" />
            Request Information
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500 mt-0.5">
            ID Referencing: {request.id}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-4 text-sm text-slate-700">
          {/* Status Breakdown Section */}
          <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-100">
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">
                Processing Status
              </p>
              <Badge className="font-semibold text-xs tracking-wide">
                {request.requestStatus}
              </Badge>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">
                Financial State
              </p>
              {request.isPaid ? (
                <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-100">
                  Paid
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="bg-amber-50 text-amber-800 border-amber-200"
                >
                  Payment Unpaid
                </Badge>
              )}
            </div>
          </div>

          {/* Property Specifications */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 border-b pb-1 text-sm uppercase tracking-wide text-slate-500">
              <Building className="w-4 h-4" /> Property Overview
            </h3>
            <div className="grid grid-cols-2 gap-y-2 gap-x-4">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400" />{" "}
                <strong>Location:</strong> {property.location}
              </p>
              <p className="flex items-center gap-2">
                <Coins className="w-4 h-4 text-slate-400" />{" "}
                <strong>Rent Cost:</strong> ৳
                {property.rentPrice.toLocaleString()} / mo
              </p>
              <p className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-slate-400" />{" "}
                <strong>Size Block:</strong> {property.areaInSqFt} SqFt
              </p>
              <p className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400" />{" "}
                <strong>Created:</strong>{" "}
                {new Date(request.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="pt-1">
              <p className="text-xs text-slate-500 mb-1">
                <strong>Included Amenities:</strong>
              </p>
              <div className="flex flex-wrap gap-1.5">
                {property.amenities?.map((amenity, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-xs bg-slate-100 text-slate-700"
                  >
                    {amenity}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Landlord Contact Specifics */}
          <div className="space-y-3">
            <h3 className="font-bold text-gray-800 flex items-center gap-2 border-b pb-1 text-sm uppercase tracking-wide text-slate-500">
              <User className="w-4 h-4" /> Landlord Specifications
            </h3>
            <div className="grid grid-cols-2 gap-y-2 text-xs">
              <p>
                <strong>Full Name:</strong> {property.landlord?.name}
              </p>
              <p>
                <strong>Email Address:</strong> {property.landlord?.email}
              </p>
              <p>
                <strong>Contact No:</strong> {property.landlord?.contactNo}
              </p>
              <p>
                <strong>Primary Address:</strong> {property.landlord?.address}
              </p>
            </div>
          </div>

          {/* Historical Reviews Mapping */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 border-b pb-1 text-sm uppercase tracking-wide text-slate-500">
              <Star className="w-4 h-4 text-amber-500" /> User Evaluation
              Reports ({property.propertyReviews?.length || 0})
            </h3>
            <div className="space-y-2">
              {property.propertyReviews?.length > 0 ? (
                property.propertyReviews.map((rev, index) => (
                  <div
                    key={index}
                    className="bg-slate-50/80 p-3 rounded border border-slate-100 text-xs"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-slate-800">
                        {rev.tenant.name} ({rev.tenant.email})
                      </span>
                      <span className="text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        ★ {rev.rating}/5
                      </span>
                    </div>
                    <p className="text-slate-600 italic">{rev.content}</p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 italic pl-1">
                  No community reviews have been registered for this property
                  unit.
                </p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
