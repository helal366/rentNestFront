import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react"; // Import for filter anchor iconography
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  GetPropertiesResponse,
  PropertiesSearchProps,
  PropertySearchParams,
  ValidatedPropertySearchParams,
} from "../_types/propertyTypes";
import PropertyFilters from "../_components/properties/PropertyFilters";
import { Suspense } from "react";
import PropertiesList from "../_components/properties/PropertiesList";
import { frontendPropertySearchSchema } from "@/zod_schemas/properties_schema";
import z from "zod";
import Loading from "./loading";

export async function fetchProperties(
  queryString: string,
): Promise<GetPropertiesResponse | null> {
  console.log({ queryString });
  const baseUrl = process.env.BACKEND_VERCEL_URL?.replace(/\/$/, "");
  if (!baseUrl) {
    console.error(
      "CRITICAL: BACKEND_VERCEL_URL environment variable is missing.",
    );
    return null;
  }

  try {
    const res = await fetch(`${baseUrl}/api/properties?${queryString}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(12000),
    });

    if (!res.ok) {
      console.error(`Backend returned an error code status: ${res.status}`);
      try {
        const errorData = await res.json();
        console.error("Backend validation error details:", errorData);
      } catch {
        const errorText = await res.text();
        console.error("Backend raw error text:", errorText);
      }
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error(
      "Failed to connect to the backend server architecture:",
      error,
    );
    return null;
  }
}

export default async function PropertiesPage({
  searchParams,
}: PropertiesSearchProps) {
  const rawParams: PropertySearchParams = await searchParams;
  const parsedResult = frontendPropertySearchSchema.safeParse(rawParams);
  console.log({ parsedResult });
  if (!parsedResult.success) {
    const formattedError = z.treeifyError(parsedResult.error);
    console.dir(formattedError, { depth: null });
  }
  const validatedParams = parsedResult.success
    ? parsedResult.data
    : ({} as ValidatedPropertySearchParams);
  const plainParams = { ...validatedParams };

  const urlParams = new URLSearchParams();
  Object.entries(plainParams).forEach(([key, value]) => {
    if (value !== undefined) urlParams.set(key, String(value));
  });

  if (!urlParams.has("page")) urlParams.set("page", "1");

  const queryString = urlParams.toString();
  return (
    <section className="max-w-7xl mx-auto px-4 py-6 sm:py-8 lg:py-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 tracking-tight">
            All Properties
          </h1>
        </div>

        {/* mobile view of side bar filter options*/}
        <div className="block md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2 bg-white text-xs font-semibold py-5"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Filter & Refine Options
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[85vw] max-w-sm sm:max-w-md overflow-y-auto"
            >
              <SheetHeader className="mb-4">
                <SheetTitle className="text-left font-bold text-gray-900">
                  Search Filters
                </SheetTitle>
              </SheetHeader>
              <PropertyFilters
                key={JSON.stringify(plainParams)}
                searchParams={plainParams}
              />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
        <aside className="hidden md:block md:col-span-1 bg-white p-5 rounded-xl border border-gray-200 h-fit sticky top-6 shadow-sm">
          <h2 className="text-base font-bold text-gray-900 mb-4 tracking-tight">
            Filter Rules
          </h2>
          <PropertyFilters searchParams={plainParams} />
        </aside>

        <main className="md:col-span-2 lg:col-span-3">
          <Suspense fallback={<Loading />}>
            <PropertiesList
              queryString={queryString}
              searchParams={plainParams}
            />
          </Suspense>
        </main>
      </div>
    </section>
  );
}
