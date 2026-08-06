interface FormStatusBannerProps {
  status: {
    type: "success" | "error";
    text: string;
  } | null;
}

export function FormStatusBanner({ status }: FormStatusBannerProps) {
  if (!status) return null;

  const isSuccess = status.type === "success";

  return (
    <div
      className={`p-4 rounded-md text-sm border font-medium transition-all ${
        isSuccess
          ? "bg-[#E8F5E9] text-green-700 border-[#C5E1A5]"
          : "bg-red-50 text-red-600 border-red-200"
      }`}
    >
      {status.text}
    </div>
  );
}
