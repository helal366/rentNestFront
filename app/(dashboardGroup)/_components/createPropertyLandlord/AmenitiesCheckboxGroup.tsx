import { Checkbox } from "@/components/ui/checkbox";
import { PropertyAmenityEnum } from "@/lib/types";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { ICreatePropertyFormRawInput } from "@/zod_schemas/create_property_schema";

interface AmenitiesCheckboxGroupProps {
  getValues: UseFormGetValues<ICreatePropertyFormRawInput>;
  setValue: UseFormSetValue<ICreatePropertyFormRawInput>;
  errorMessage?: string;
}

export function AmenitiesCheckboxGroup({
  getValues,
  setValue,
  errorMessage,
}: AmenitiesCheckboxGroupProps) {
  return (
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
                  const freshAmenities = getValues("amenities") || [];
                  const updated = checked
                    ? [...freshAmenities, amenity]
                    : freshAmenities.filter((item) => item !== amenity);

                  setValue("amenities", updated, { shouldValidate: true });
                }}
              />
              <label
                htmlFor={amenity}
                className="text-xs font-medium text-black cursor-pointer select-none capitalize"
              >
                {amenity.replace(/_/g, " ").toLowerCase()}
              </label>
            </div>
          );
        })}
      </div>

      {errorMessage && (
        <p className="text-xs font-medium text-red-500">{errorMessage}</p>
      )}
    </div>
  );
}
