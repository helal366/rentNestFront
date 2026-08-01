"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { handleFilterSubmit } from "../_actions/propertyActions";
import {
  PropertyAmenity,
  PropertyAmenityEnum,
  PropertyCategoryEnum,
  PropertyLocationEnum,
  RentStatusEnum,
} from "@/lib/types";
import { ValidatedPropertySearchParams } from "../_types/propertyTypes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


export default function PropertyFilters({
  searchParams
}: {
  searchParams: ValidatedPropertySearchParams
}) {

  const amenitiesParam = searchParams.amenities as string | undefined;
  const [selectedAmenities, setSelectedAmenities] = useState<PropertyAmenity[]>(
    (amenitiesParam?.split(",") as PropertyAmenity[]) ?? [],
  );

  const [minPriceState, setMinPriceState] = useState<string>(
    searchParams.minPrice?.toString() || "",
  );

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const handleAmenityChange = (amenity: PropertyAmenity, checked: boolean) => {
    setSelectedAmenities((prev) =>
      checked ? [...prev, amenity] : prev.filter((a) => a !== amenity),
    );
  };
  return (
    <form
      action={(formData) => startTransition(() => handleFilterSubmit(formData))}
      className="space-y-6 text-sm"
    >
      {/* Shadcn Location Select Menu */}
      <div className="space-y-2">
        <Label htmlFor="location" className="font-bold text-gray-700">
          Location
        </Label>
        <Select name="location" defaultValue={searchParams.location || "ALL"}>
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="All Locations" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Locations</SelectItem>
            {PropertyLocationEnum.options.map((loc) => (
              <SelectItem key={loc} value={loc}>
                {loc}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Shadcn Rent Status Select Menu */}
      <div className="space-y-2">
        <Label htmlFor="rentStatus" className="font-bold text-gray-700">
          Availability Status
        </Label>
        <Select
          name="rentStatus"
          defaultValue={searchParams.rentStatus || "ALL"}
        >
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Any Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Any Status</SelectItem>
            {RentStatusEnum.options.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Shadcn Category Select Menu */}
      <div className="space-y-2">
        <Label htmlFor="category" className="font-bold text-gray-700">
          Category
        </Label>
        <Select name="category" defaultValue={searchParams.category || "ALL"}>
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Categories</SelectItem>
            {PropertyCategoryEnum.options.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Shadcn Input Price Fields */}
      <div className="space-y-2">
        <Label className="font-bold text-gray-700">Monthly Rent (BDT)</Label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            name="minPrice"
            type="number"
            min="0"
            value={minPriceState}
            onChange={(e) => setMinPriceState(e.target.value)}
            placeholder="Min"
            className="bg-white"
          />
          <Input
            name="maxPrice"
            type="number"
            min={minPriceState}
            placeholder="Max"
            defaultValue={searchParams.maxPrice || ""}
            className="bg-white"
          />
        </div>
      </div>

      {/* Shadcn Checkboxes Layer (Triggers hasSome matching arrays) */}
      <div className="space-y-2">
        <Label className="font-bold text-gray-700">
          Amenities (Matches Any)
        </Label>
        <div className="space-y-2 max-h-44 overflow-y-auto border p-3 rounded-lg bg-gray-50">
          {PropertyAmenityEnum.options.map((amenity) => (
            <div key={amenity} className="flex items-center space-x-2">
              <Checkbox
                id={amenity}
                name="amenities"
                value={amenity}
                checked={selectedAmenities.includes(amenity)}
                onCheckedChange={(checked) =>
                  handleAmenityChange(amenity, checked === true)
                }
              />
              <label
                htmlFor={amenity}
                className="text-xs font-medium text-gray-600 cursor-pointer uppercase select-none"
              >
                {amenity.replace("_", " ")}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Control Buttons */}
      <div className="space-y-2 pt-2">
        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? "Applying Filters..." : "Apply Filters"}
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setMinPriceState("");
            router.replace("/properties");
          }}
          className="w-full bg-white text-gray-700 hover:bg-gray-50"
        >
          Clear All
        </Button>
      </div>
    </form>
  );
}
