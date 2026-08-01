// import propertyData from "../../others/properties_demodata.json";
import Link from "next/link";
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
  getAllPropertiesItem,
  GetPropertiesResponse,
  PropertiesSearchProps,
} from "../_types/propertyTypes";
import PropertyFilters from "../_components/PropertyFilters";
import { Suspense } from "react"; 
import Loading from "../loading"; 



async function fetchProperties(queryString: string): Promise<GetPropertiesResponse | null> {
  console.log({queryString})
  const baseUrl = process.env.BACKEND_VERCEL_URL?.replace(/\/$/, "");
    console.log(baseUrl);
  if (!baseUrl) {
    console.error("CRITICAL: BACKEND_VERCEL_URL environment variable is missing.");
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
  } catch{
    const errorText = await res.text();
    console.error("Backend raw error text:", errorText);
  }
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Failed to connect to the backend server architecture:", error);
    return null;
  }
}

export default async function PropertiesPage({ searchParams }: PropertiesSearchProps) {
    const resolvedParams = await searchParams;

    const urlParams = new URLSearchParams();
    console.log("berofe set: ",{urlParams})
    Object.entries(resolvedParams).forEach(([key, value]) => {
      if (value !== undefined) urlParams.set(key, String(value));
    });

    if (!urlParams.has("page")) urlParams.set("page", "1");
    console.log("frontend url params: ",urlParams)

    const apiResponse = await fetchProperties(urlParams.toString());
     if (!apiResponse || !apiResponse.success) {
      return (
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Service Temporarily Unavailable</h2>
          <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
            We are having trouble communicating with our property database servers. This might be due to a temporary network blip.
          </p>
          <Button variant="default" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      );
    }
    const properties =
      (apiResponse.data?.properties as getAllPropertiesItem[]) || [];
    const meta = apiResponse.data?.meta || { page: 1, limit: 12, total: 0, totalPages: 1 };

  return (
    <section className="max-w-7xl mx-auto px-4 py-6 sm:py-8 lg:py-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
        {/* top title part */}
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 tracking-tight">
            All Properties
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Found {meta.total} properties matching your criteria
          </p>
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
              <PropertyFilters searchParams={resolvedParams} />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
        <aside className="hidden md:block md:col-span-1 bg-white p-5 rounded-xl border border-gray-200 h-fit sticky top-6 shadow-sm">
          <h2 className="text-base font-bold text-gray-900 mb-4 tracking-tight">
            Filter Rules
          </h2>
          <PropertyFilters searchParams={resolvedParams} />
        </aside>

        <main className="md:col-span-2 lg:col-span-3">
          <main className="md:col-span-2 lg:col-span-3">
            {properties.length === 0 ? (
              <div className="text-center py-16 bg-gray-50 rounded-xl border border-dashed text-gray-400 text-xs sm:text-sm px-4">
                No properties found matching your selection. Try removing filter
                parameters.
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                  {properties.map((property) => (
                    <div
                      key={property.id}
                      className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
                    >
                      <div className="p-4">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100 truncate max-w-[120px]">
                            {property.location}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded shrink-0 ${
                              property.rentStatus === "AVAILABLE"
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-amber-50 text-amber-700"
                            }`}
                          >
                            {property.rentStatus}
                          </span>
                        </div>

                        <h3 className="font-bold text-gray-800 text-sm sm:text-base mt-3 line-clamp-1">
                          {property.category?.name || "Standard Rental Space"}
                        </h3>

                        <div className="flex justify-between items-baseline mt-1 gap-2">
                          <p className="text-lg font-black text-emerald-600 truncate">
                            Tk {property.rentPrice.toLocaleString()}
                            <span className="text-xs text-gray-400 font-normal">
                              /mo
                            </span>
                          </p>
                          <span className="text-[11px] text-gray-400 font-medium shrink-0">
                            {property.areaInSqFt} Sq Ft
                          </span>
                        </div>
                      </div>

                      <div className="p-4 pt-0">
                        <div className="flex flex-wrap gap-1 pt-3 border-t border-gray-100">
                          {property.amenities?.map((amenity) => {
                            const isMatched =
                              typeof resolvedParams.amenities === "string" &&
                              resolvedParams.amenities
                                .split(",")
                                .includes(amenity);
                            return (
                              <span
                                key={amenity}
                                className={`text-[9px] font-bold border px-1.5 py-0.5 rounded tracking-tight uppercase ${
                                  isMatched
                                    ? "bg-blue-50 text-blue-600 border-blue-200"
                                    : "bg-gray-50 text-gray-400 border-gray-200"
                                }`}
                              >
                                {amenity.replace("_", " ")}
                              </span>
                            );
                          })}
                        </div>
                      </div>

                      <Button
                        asChild
                        className="w-full font-bold text-white bg-gray-900 hover:bg-gray-800 cursor-pointer"
                      >
                        <Link href={`/properties/${property.id}`}>Details</Link>
                      </Button>
                    </div>
                  ))}
                </div>

                {meta.totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 mt-10 pt-6 border-t border-gray-100">
                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
                      {/* PREVIOUS BUTTON */}
                      {meta.page <= 1 ? (
                        <Button
                          variant="outline"
                          size="sm"
                          disabled
                          className="h-9 text-xs"
                        >
                          Previous
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="h-9 text-xs"
                        >
                          <Link
                            href={{
                              pathname: "/properties",
                              query: { ...resolvedParams, page: meta.page - 1 },
                            }}
                          >
                            Previous
                          </Link>
                        </Button>
                      )}

                      <span className="text-xs sm:text-sm font-semibold text-gray-600 shrink-0">
                        Page {meta.page} of {meta.totalPages}
                      </span>

                      {/* NEXT BUTTON */}
                      {meta.page >= meta.totalPages ? (
                        <Button
                          variant="outline"
                          size="sm"
                          disabled
                          className="h-9 text-xs"
                        >
                          Next
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="h-9 text-xs"
                        >
                          <Link
                            href={{
                              pathname: "/properties",
                              query: { ...resolvedParams, page: meta.page + 1 },
                            }}
                          >
                            Next
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </main>
        </main>
      </div>
    </section>
  );
   
  
  
  
  
  // return (
  //     <section className="max-w-7xl mx-auto px-4 py-6 sm:py-8 lg:py-10">

  //       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
  //           <div>
  //             <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 tracking-tight">
  //               All Properties
  //             </h1>
  //             <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
  //               Found {meta.total} properties matching your criteria
  //             </p>
  //           </div>

  //         <div className="block md:hidden">
  //           <Sheet>
  //             <SheetTrigger asChild>
  //               <Button variant="outline" className="w-full flex items-center justify-center gap-2 bg-white text-xs font-semibold py-5">
  //                 <SlidersHorizontal className="w-3.5 h-3.5" />
  //                 Filter & Refine Options
  //               </Button>
  //             </SheetTrigger>
  //             <SheetContent side="left" className="w-[85vw] max-w-sm sm:max-w-md overflow-y-auto">
  //               <SheetHeader className="mb-4">
  //                 <SheetTitle className="text-left font-bold text-gray-900">Search Filters</SheetTitle>
  //               </SheetHeader>
  //               <PropertyFilters searchParams={resolvedParams} />
  //             </SheetContent>
  //           </Sheet>
  //         </div>
  //       </div>

  //       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">

  //         <aside className="hidden md:block md:col-span-1 bg-white p-5 rounded-xl border border-gray-200 h-fit sticky top-6 shadow-sm">
  //           <h2 className="text-base font-bold text-gray-900 mb-4 tracking-tight">Filter Rules</h2>
  //           <PropertyFilters searchParams={resolvedParams} />
  //         </aside>

          // <main className="md:col-span-2 lg:col-span-3">
          //   {properties.length === 0 ? (
          //     <div className="text-center py-16 bg-gray-50 rounded-xl border border-dashed text-gray-400 text-xs sm:text-sm px-4">
          //       No properties found matching your selection. Try removing filter parameters.
          //     </div>
          //   ) : (
          //     <>
          //       <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          //         {properties.map((property: getAllPropertiesItem) => (
          //           <div key={property.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between">
          //             <div className="p-4">
          //               <div className="flex items-center justify-between gap-2">
          //                 <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100 truncate max-w-[120px]">
          //                   {property.location}
          //                 </span>
          //                 <span className={`text-[10px] font-bold px-2 py-0.5 rounded shrink-0 ${
          //                   property.rentStatus === "AVAILABLE" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
          //                 }`}>
          //                   {property.rentStatus}
          //                 </span>
          //               </div>

          //               <h3 className="font-bold text-gray-800 text-sm sm:text-base mt-3 line-clamp-1">
          //                 {property.category?.name || "Standard Rental Space"}
          //               </h3>

          //               <div className="flex justify-between items-baseline mt-1 gap-2">
          //                 <p className="text-lg font-black text-emerald-600 truncate">
          //                   Tk {property.rentPrice.toLocaleString()}<span className="text-xs text-gray-400 font-normal">/mo</span>
          //                 </p>
          //                 <span className="text-[11px] text-gray-400 font-medium shrink-0">
          //                   {property.areaInSqFt} Sq Ft
          //                 </span>
          //               </div>
          //             </div>

          //             <div className="p-4 pt-0">
          //               <div className="flex flex-wrap gap-1 pt-3 border-t border-gray-100">
          //                 {property.amenities?.map((amenity) => {
          //                   const isMatched = typeof resolvedParams.amenities === "string" &&
          //                     resolvedParams.amenities.split(",").includes(amenity);
          //                   return (
          //                     <span
          //                       key={amenity}
          //                       className={`text-[9px] font-bold border px-1.5 py-0.5 rounded tracking-tight uppercase ${
          //                         isMatched
          //                           ? "bg-blue-50 text-blue-600 border-blue-200"
          //                           : "bg-gray-50 text-gray-400 border-gray-200"
          //                       }`}
          //                     >
          //                       {amenity.replace("_", " ")}
          //                     </span>
          //                   );
          //                 })}
          //               </div>
          //             </div>
          //           </div>
          //         ))}
          //       </div>

          //       {meta.totalPages > 1 && (
          //         <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 mt-10 pt-6 border-t border-gray-100">
          //           <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
          //             <Button variant="outline" size="sm" asChild disabled={meta.page <= 1} className="h-9 text-xs">
          //               <Link href={{ pathname: "/properties", query: { ...resolvedParams, page: meta.page - 1 } }}>
          //                 Previous
          //               </Link>
          //             </Button>

          //             <span className="text-xs sm:text-sm font-semibold text-gray-600 shrink-0">
          //               Page {meta.page} of {meta.totalPages}
          //             </span>

          //             <Button variant="outline" size="sm" asChild disabled={meta.page >= meta.totalPages} className="h-9 text-xs">
          //               <Link href={{ pathname: "/properties", query: { ...resolvedParams, page: meta.page + 1 } }}>
          //                 Next
          //               </Link>
          //             </Button>
          //           </div>
          //         </div>
          //       )}
          //     </>
          //   )}
          // </main>
  //       </div>
  //     </section>
  //   );


}
