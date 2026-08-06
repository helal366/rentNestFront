import React from 'react'

const CreatePropertyBottom = () => {
  return (
    <div className="p-4 rounded-lg bg-olive-100 border border-[#DCEDC8] flex items-start space-x-3">
      <div className="mt-0.5 rounded-full p-1 bg-[#C5E1A5]/40 text-green-700">
        <svg
          xmlns="http://w3.org"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      </div>
      <div className="space-y-1">
        <h4 className="text-xs font-bold text-black uppercase tracking-wider">
          Verification Note
        </h4>
        <p className="text-xs text-neutral-700 leading-relaxed">
          Ensure accuracy for variables like{" "}
          <strong className="text-green-700">Rent Price</strong> and{" "}
          <strong className="text-green-700">Location Area</strong>. Falsifying
          system entries could get your landlord access privileges restricted
          under global platform standards.
        </p>
      </div>
    </div>
  );
}

export default CreatePropertyBottom