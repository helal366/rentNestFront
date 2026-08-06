"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // Implements instant toast popups

import { createPropertyFormSchema, ICreatePropertyFormInput, ICreatePropertyFormParsedOutput, ICreatePropertyFormRawInput } from "@/zod_schemas/create_property_schema";
import { createPropertyAction } from "../../_actions/createPropertyActions";
import { PropertyCategory, PropertyCategoryEnum, PropertyLocation, PropertyLocationEnum } from "@/lib/types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AmenitiesCheckboxGroup } from "./AmenitiesCheckboxGroup";
import { FormStatusBanner } from "./FormStatusBanner";
import { useTopLoader } from "nextjs-toploader";


export default function CreatePropertyForm() {
  const loader= useTopLoader()
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);

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

  const onSubmit = (rawData: ICreatePropertyFormRawInput) => {
    setStatus(null);
    loader.start();
    startTransition(async () => {
    try {
        const parsedData = rawData as ICreatePropertyFormParsedOutput;
        const response = await createPropertyAction(parsedData as ICreatePropertyFormInput);
  
        if (response.success) {
          loader.done();
          // 1. Trigger Sonner toast immediately
          toast.success(response.message || "Property listing published successfully!");
          
          // 2. Keep the success message in the UI body
          setStatus({ type: "success", text: response.message });
          reset();
  
          // 3. Delay redirection by 2 seconds to let the user see everything
          setTimeout(() => {
            router.push("/my_properties_landlord");
          }, 2000);
          
        } else {
          loader.done()
          const errorText = response.message || response.errors?.[0] || "An unexpected error occurred.";
          
          // Handle failure instantly across both channels
          toast.error(errorText);
          setStatus({ type: "error", text: errorText });
        }
      } catch {
         loader.done();
         toast.error("A network error occurred. Please try again.");
         setStatus({ type: "error", text: "A network error occurred." });
      }
      });      
  };

  return (
    <div className="w-full bg-white p-6 md:p-8 rounded-xl border border-neutral-200 shadow-sm">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* In-body notification alert banner */}
        <FormStatusBanner status={status} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Category Dropdown */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-black">Property Category</label>
            <Select
              defaultValue="APARTMENT"
              onValueChange={(val) => setValue("category", val as PropertyCategory, { shouldValidate: true })}
            >
              <SelectTrigger className="bg-white border-neutral-300 text-black focus:ring-green-700">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent className="bg-white border-neutral-200">
                {PropertyCategoryEnum.options.map((cat) => (
                  <SelectItem key={cat} value={cat} className="text-black focus:bg-neutral-100">
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && <p className="text-xs font-medium text-red-500">{errors.category.message}</p>}
          </div>

          {/* Location Dropdown */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-black">Location Area</label>
            <Select
              defaultValue="JATRABARI"
              onValueChange={(val) => setValue("location", val as PropertyLocation)}
            >
              <SelectTrigger className="bg-white border-neutral-300 text-black focus:ring-green-700">
                <SelectValue placeholder="Select Area" />
              </SelectTrigger>
              <SelectContent className="bg-white border-neutral-200 max-h-60 overflow-y-auto">
                {PropertyLocationEnum.options.map((loc) => (
                  <SelectItem key={loc} value={loc} className="text-black focus:bg-neutral-100">
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.location && <p className="text-xs font-medium text-red-500">{errors.location.message}</p>}
          </div>

          {/* Rent Pricing Input */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-black">Rent Price (BDT / Month)</label>
            <Input
              type="number"
              placeholder="e.g. 15000"
              className="bg-white border-neutral-300 text-black focus-visible:ring-green-700"
              {...register("rentPrice", {
                setValueAs: (value) => (value === "" || value === null ? undefined : Number(value)),
              })}
            />
            {errors.rentPrice && <p className="text-xs font-medium text-red-500">{errors.rentPrice.message}</p>}
          </div>

          {/* Size Area Input */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-black">Area Size (SqFt)</label>
            <Input
              type="number"
              placeholder="e.g. 1200"
              className="bg-white border-neutral-300 text-black focus-visible:ring-green-700"
              {...register("areaInSqFt", {
                setValueAs: (value) => (value === "" || value === null ? undefined : Number(value)),
              })}
            />
            {errors.areaInSqFt && <p className="text-xs font-medium text-red-500">{errors.areaInSqFt.message}</p>}
          </div>
        </div>

        {/* Separated Amenities Checkbox Array Component */}
        <AmenitiesCheckboxGroup 
          getValues={getValues} 
          setValue={setValue} 
          errorMessage={errors.amenities?.message} 
        />

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
