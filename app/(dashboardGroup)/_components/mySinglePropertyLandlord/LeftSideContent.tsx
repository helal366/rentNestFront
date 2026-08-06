import { PropertyDetails } from '@/app/(commonGroup)/_types/singlePropertyTypes';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Maximize } from 'lucide-react';

const LeftSideContent = ({ property }: { property: PropertyDetails }) => {
  return (
    <div className="space-y-6 lg:col-span-2">
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Badge
            variant="outline"
            className="bg-olive-200 border-olive-300 text-black text-xs font-bold uppercase tracking-wider"
          >
            {property.category.name.toLowerCase()}
          </Badge>
          <Badge
            className={
              property.rentStatus === "AVAILABLE"
                ? "bg-green-600 text-white text-xs"
                : "text-xs"
            }
          >
            {property.rentStatus}
          </Badge>
        </div>
        <h1 className="text-xl font-black tracking-tight text-neutral-900 sm:text-2xl">
          {property.areaInSqFt.toLocaleString()} Sq Ft Listing Control Node
        </h1>
        <p className="text-2xl font-black text-green-600 mt-1">
          TK {property.rentPrice.toLocaleString()}{" "}
          <span className="text-xs font-semibold text-neutral-500">
            / month base asset value
          </span>
        </p>
      </div>

      {/* Quick Specifications Info Grid */}
      <Card className="bg-olive-200 border border-olive-300 shadow-none">
        <CardHeader>
          <CardTitle className="text-base font-extrabold text-black">
            Property Informations
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 text-xs font-bold text-neutral-800">
          <div>
            <p className="text-neutral-500 font-semibold mb-0.5">Location</p>
            <p className="text-black text-sm font-black flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-green-600" />{" "}
              {property.location}
            </p>
          </div>
          <div>
            <p className="text-neutral-500 font-semibold mb-0.5">Area</p>
            <p className="text-black text-sm font-black flex items-center gap-1">
              <Maximize className="h-3.5 w-3.5 text-green-600" />{" "}
              {property.areaInSqFt} Sq Ft
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Amenities Module Grid */}
      <Card className="bg-olive-200 border border-olive-300 shadow-none">
        <CardHeader>
          <CardTitle className="text-base font-extrabold text-black">
            Amenities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-1.5">
            {property.amenities?.map((amenity: string) => (
              <Badge
                key={amenity}
                className="bg-white border border-olive-300 text-black hover:bg-white font-bold text-xs uppercase px-2.5 py-1 shadow-none"
              >
                {amenity.replace("_", " ")}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeftSideContent