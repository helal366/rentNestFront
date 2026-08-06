"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";

import { createPropertyFormSchema, ICreatePropertyFormInput, ICreatePropertyFormParsedOutput, ICreatePropertyFormRawInput } from "@/zod_schemas/create_property_schema";
import { createPropertyAction } from "../../_actions/createPropertyActions";
import { PropertyAmenityEnum, PropertyCategory, PropertyCategoryEnum, PropertyLocation, PropertyLocationEnum } from "@/lib/types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";

export default function CreatePropertyForm() {
  const router=useRouter()
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<ICreatePropertyFormRawInput>({
    resolver: zodResolver(createPropertyFormSchema),
    defaultValues: {
      category: "APARTMENT",
      rentPrice: 5000,
      location: "JATRABARI",
      areaInSqFt: 1000,
      amenities: [],
      rentStatus: "AVAILABLE",
    },
  });
  // Replace your old onSubmit block with this:
  // 1. Change the parameter type to accept the Raw Input shape expected by handleSubmit
  const onSubmit = (rawData: ICreatePropertyFormRawInput) => {
    console.log({rawData})
    setStatus(null);
    startTransition(async () => {
      // 2. Safely cast to your Parsed Output shape inside the handler body
      const parsedData = rawData as ICreatePropertyFormParsedOutput;
      console.log("parseddata: ", parsedData)
      const response = await createPropertyAction(
        parsedData as ICreatePropertyFormInput,
      );

      if (response.success) {
        setStatus({ type: "success", text: response.message });
        reset();
      } else {
        setStatus({
          type: "error",
          text:
            response.message ||
            response.errors?.[0] ||
            "An unexpected error occurred.",
        });
      }
      router.push("/my_properties_landlord");
    });
  };

  return (
    <div className="w-full bg-white p-6 md:p-8 rounded-xl border border-neutral-200 shadow-sm">
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {status && (
          <div
            className={`p-4 rounded-md text-sm border font-medium ${status.type === "success" ? "bg-[#E8F5E9] text-green-700 border-[#C5E1A5]" : "bg-red-50 text-red-600 border-red-200"}`}
          >
            {status.text}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Category Select Dropdown */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-black">
              Property Category
            </label>
            <Select
              defaultValue="APARTMENT"
              onValueChange={(val) =>
                setValue("category", val as PropertyCategory, {
                  shouldValidate: true,
                })
              }
            >
              <SelectTrigger className="bg-white border-neutral-300 text-black focus:ring-green-700">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent className="bg-white border-neutral-200">
                {PropertyCategoryEnum.options.map((cat) => (
                  <SelectItem
                    key={cat}
                    value={cat}
                    className="text-black focus:bg-neutral-100"
                  >
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-xs font-medium text-red-500">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Location Select Dropdown */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-black">
              Location Area
            </label>
            <Select
              defaultValue="JATRABARI"
              onValueChange={(val) =>
                setValue("location", val as PropertyLocation)
              }
            >
              <SelectTrigger className="bg-white border-neutral-300 text-black focus:ring-green-700">
                <SelectValue placeholder="Select Area" />
              </SelectTrigger>
              <SelectContent className="bg-white border-neutral-200 max-h-60 overflow-y-auto">
                {PropertyLocationEnum.options.map((loc) => (
                  <SelectItem
                    key={loc}
                    value={loc}
                    className="text-black focus:bg-neutral-100"
                  >
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.location && (
              <p className="text-xs font-medium text-red-500">
                {errors.location.message}
              </p>
            )}
          </div>

          {/* Rent Price Number Input */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-black">
              Rent Price (BDT / Month)
            </label>
            <Input
              type="number"
              placeholder="e.g. 15000"
              className="bg-white border-neutral-300 text-black focus-visible:ring-green-700"
              {...register("rentPrice", {
                setValueAs: (value) =>
                  value === "" || value === null ? undefined : Number(value),
              })}
            />
            {errors.rentPrice && (
              <p className="text-xs font-medium text-red-500">
                {errors.rentPrice.message}
              </p>
            )}
          </div>

          {/* Area in SqFt Number Input */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-black">
              Area Size (SqFt)
            </label>
            <Input
              type="number"
              placeholder="e.g. 1200"
              className="bg-white border-neutral-300 text-black focus-visible:ring-green-700"
              {...register("areaInSqFt", {
                setValueAs: (value) =>
                  value === "" || value === null ? undefined : Number(value),
              })}
            />
            {errors.areaInSqFt && (
              <p className="text-xs font-medium text-red-500">
                {errors.areaInSqFt.message}
              </p>
            )}
          </div>
        </div>
        {/* Amenities Selection Blocks */}
        <div className="space-y-3 bg-neutral-50/50 p-4 rounded-lg border border-neutral-200">
          <div>
            <label className="text-sm font-semibold text-black">
              Available Amenities
            </label>
            <p className="text-xs text-neutral-500">
              Select at least one option included with the lease.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {PropertyAmenityEnum.options.map((amenity) => {
              // Read directly from form state dynamically during rendering
              const currentAmenities = getValues("amenities") || [];
              const isChecked = currentAmenities.includes(amenity);

              return (
                <div
                  key={amenity}
                  className="flex items-center space-x-3 p-2 rounded-md hover:bg-neutral-100 transition-colors"
                >
                  <Checkbox
                    id={amenity}
                    checked={isChecked}
                    className="border-neutral-400 data-[state=checked]:bg-green-700 data-[state=checked]:border-green-700"
                    onCheckedChange={(checked) => {
                      // Read fresh list inside the event callback
                      const freshAmenities = getValues("amenities") || [];
                      const updated = checked
                        ? [...freshAmenities, amenity]
                        : freshAmenities.filter((item) => item !== amenity);

                      setValue("amenities", updated, { shouldValidate: true });
                    }}
                  />
                  <label
                    htmlFor={amenity}
                    className="text-xs font-medium text-black cursor-pointer select-none"
                  >
                    {amenity.replace(/_/g, " ")}
                  </label>
                </div>
              );
            })}
          </div>

          {errors.amenities && (
            <p className="text-xs font-medium text-red-500">
              {errors.amenities.message}
            </p>
          )}
        </div>

        {/* Submit Form Elements */}
        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-green-700 hover:bg-green-800 text-white font-medium py-2.5 rounded-md transition-all disabled:opacity-70 flex justify-center items-center gap-2"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Publishing Listing...
            </>
          ) : (
            "Publish Property Listing"
          )}
        </Button>
      </form>
    </div>
  );
}
