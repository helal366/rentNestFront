import React from 'react'

const CreatePropertyHeader = () => {
  return (
    <div className="p-6 md:p-8 rounded-xl bg-white border border-neutral-200 shadow-sm relative overflow-hidden">
      {/* Top structural accent bar using your signature olive-300 palette color */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#C5E1A5]" />

      <div className="flex flex-col space-y-2">
        <span className="text-xs uppercase font-bold tracking-widest text-green-700">
          Landlord Portal
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-black">
          List a New Rental Property
        </h1>
        <p className="text-sm text-neutral-600 max-w-xl">
          Fill out the details below to add a property. Once published, your
          listing will become instantly visible to active tenants searching in
          your location area.
        </p>
      </div>
    </div>
  );
}

export default CreatePropertyHeader