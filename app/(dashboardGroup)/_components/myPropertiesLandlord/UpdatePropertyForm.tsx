"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {updatePropertyAction} from "../../_actions/updatePropertyAction";
import {
  PropertyLocationEnum,
  PropertyAmenityEnum,
  RentStatusEnum,
  PropertyAmenity,
  PropertyCategory,
} from "@/lib/types";
import { PropertyDetails } from "@/app/(commonGroup)/_types/singlePropertyTypes";
import {  UpdatePropertyFormValues, updatePropertyValidationSchema} from "@/zod_schemas/update_property_zod_schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {  UpdatePropertyFieldsRHF } from "../../_types/my_property_updata_landlord_types";

interface UpdatePropertyFormProps {
  property: PropertyDetails;
}

export function UpdatePropertyForm({ property }: UpdatePropertyFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Extract valid lists from your global Zod Enum descriptors definition layers
  const locations = Object.keys(PropertyLocationEnum.enum);
  const amenitiesList = Object.keys(PropertyAmenityEnum.enum);
  const statuses = Object.keys(RentStatusEnum.enum);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<UpdatePropertyFormValues>({
    resolver: zodResolver(updatePropertyValidationSchema),
    defaultValues: {
      category: property.category.name as PropertyCategory,
      rentPrice: property.rentPrice,
      location: property.location,
      areaInSqFt: property.areaInSqFt,
      amenities: property.amenities,
      rentStatus: property.rentStatus,
    },
  });

  const [localAmenities, setLocalAmenities] = useState<PropertyAmenity[]>(
    property.amenities,
  );

  const handleAmenityToggle = (amenity: PropertyAmenity) => {
    const currentAmenities = getValues("amenities") || [];
    let updatedAmenities: PropertyAmenity[] = [];

    if (currentAmenities.includes(amenity)) {
      updatedAmenities = currentAmenities.filter((a) => a !== amenity);
    } else {
      updatedAmenities = [...currentAmenities, amenity];
    }

    setValue("amenities", updatedAmenities);
    setLocalAmenities(updatedAmenities); 
  };

  const onSubmit = (data: UpdatePropertyFieldsRHF) => {
    // Structural Conversion: Enforce numbers to clean integer payloads matching backend rules
    const formattedPayload = {
      ...data,
      rentPrice: Number(data.rentPrice),
      areaInSqFt: Number(data.areaInSqFt),
    };

    startTransition(async () => {
      const response = await updatePropertyAction(
        property.id,
        formattedPayload,
      );
      if (response.success) {
        toast.success("Success", { description: response.message });
        router.push(`/my_properties_landlord/${property.id}`);
      } else {
        toast.error("Update Blocked", { description: response.message });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-left">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input: Category */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-black">
            Category Class
          </label>
          <Input
            className="border-neutral-200 bg-white"
            placeholder="e.g. APARTMENT"
            {...register("category", {
              required: "Category label string value required.",
            })}
          />
          <p className="text-[10px] text-muted-foreground font-semibold px-1">
            Cannot vary if rental history is active.
          </p>
        </div>

        {/* Input: Rent Price */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-black">
            Rent Pricing Value (TK)
          </label>
          <Input
            type="number"
            min={1}
            className="border-neutral-200 bg-white"
            {...register("rentPrice", {
              setValueAs: (value) =>
                value === "" || value === null ? undefined : Number(value),
            })}
          />

          {errors.rentPrice && (
            <p className="text-xs text-red-600 font-bold px-1">
              {errors.rentPrice.message}
            </p>
          )}
        </div>

        {/* Selection Drop: Location */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-black">
            Dhaka Zone Placement
          </label>
          <select
            className="w-full h-9 rounded-md border border-neutral-200 bg-white px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-green-600"
            {...register("location", { required: true })}
          >
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Selection Drop: Rental Availability Status */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-black">
            Availability Matrices
          </label>
          <select
            className="w-full h-9 rounded-md border border-neutral-200 bg-white px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-green-600"
            {...register("rentStatus", { required: true })}
          >
            {statuses.map((stat) => (
              <option key={stat} value={stat}>
                {stat}
              </option>
            ))}
          </select>
        </div>

        {/* Input: Area in square feet */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-black">
            Total Area (Sq Ft)
          </label>
          <Input
            type="number"
            min={1}
            className="border-neutral-200 bg-white"
            {...register("areaInSqFt", {
              setValueAs: (value) =>
                value === "" || value === null ? undefined : Number(value),
            })}
          />

          {errors.areaInSqFt && (
            <p className="text-xs text-red-600 font-bold px-1">
              {errors.areaInSqFt.message}
            </p>
          )}
        </div>
      </div>

      {/* Multi-Select Group: Amenities Grid */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-black block">
          Included Platform Amenities
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-neutral-50 p-4 rounded-xl border border-neutral-200/60">
          {amenitiesList.map((amenity) => {
            const isChecked = localAmenities.includes(
              amenity as PropertyAmenity,
            );
            return (
              <button
                type="button"
                key={amenity}
                onClick={() => handleAmenityToggle(amenity as PropertyAmenity)}
                className={`p-2 rounded-lg text-left text-xs font-bold border transition-all flex items-center justify-between cursor-pointer ${
                  isChecked
                    ? "bg-green-600 text-white border-green-600"
                    : "bg-white text-black border-neutral-200 hover:border-olive-300"
                }`}
              >
                <span>{amenity.replace("_", " ")}</span>
                {isChecked && <span className="text-[10px]">✓</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Form Submission Action Buttons Row */}
      <div className="flex gap-4 pt-4 border-t border-olive-300/40">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push(`/my_properties_landlord/${property.id}`)}
          className="flex-1 border-olive-300 text-black hover:bg-olive-100/40 font-bold text-xs h-10 cursor-pointer shadow-none"
        >
          Discard Changes
        </Button>
        <Button
          type="submit"
          disabled={isPending}
          className="flex-1 bg-green-600 text-white hover:bg-green-700 font-bold text-xs h-10 cursor-pointer shadow-none"
        >
          {isPending ? "Applying Changes..." : "Commit Update Parameters"}
        </Button>
      </div>
    </form>
  );
}
