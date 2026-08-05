// "use client";

// import { useTransition } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import { FileEdit, Trash2, ArrowLeft } from "lucide-react";
// import { deletePropertyAction } from "../../_actions/landlordMyPropertiesActions";

// interface PropertyManagementWidgetProps {
//   propertyId: string;
// }

// export function PropertyManagementWidget({
//   propertyId,
// }: PropertyManagementWidgetProps) {
//   const router = useRouter();
//   const [isPending, startTransition] = useTransition();

//   const handleUpdateNavigation = () => {
//     router.push(`/my_properties_landlord/${propertyId}/update`);
//   };


  
//   const handleDelete = () => {
//     const doubleCheckConfirmation = window.confirm(
//       "Are you absolutely certain you want to remove this property listing from RentNest? This action cannot be reversed.",
//     );

//     if (!doubleCheckConfirmation) return;
   
//     startTransition(async () => {
//       const response = await deletePropertyAction(propertyId);
//       if (response.success) {
//         toast.success("Success", { description: response.message });
//         router.push("/my_properties_landlord");
//       } else {
//         toast.error("Deletion Failed", { description: response.message });
//       }
//     });
//   };

//   return (
//     <div className="space-y-4">
//       <Button
//         onClick={handleUpdateNavigation}
//         className="w-full bg-green-600 text-white hover:bg-green-700 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer h-10 shadow-none"
//       >
//         <FileEdit className="h-4 w-4" /> Update Property Listing
//       </Button>

//       <Button
//         onClick={handleDelete}
        
//         disabled={isPending}
//         className="w-full bg-red-700 text-white hover:bg-red-800 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer h-10 shadow-none"
//       >
//         <Trash2 className="h-4 w-4" />{" "}
//         {isPending ? "Removing..." : "Delete Property Listing"}
//       </Button>

//       <Button
//         onClick={() => router.push("/my_properties_landlord")}
//         variant="outline"
//         className="w-full border-olive-300 text-black hover:bg-olive-100/40 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer h-10 shadow-none"
//       >
//         <ArrowLeft className="h-4 w-4" /> Back to Managed Nests
//       </Button>
//     </div>
//   );
// }

"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FileEdit, Trash2, ArrowLeft } from "lucide-react";
import { deletePropertyAction } from "../../_actions/landlordMyPropertiesActions";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

interface PropertyManagementWidgetProps {
  propertyId: string;
}

export function PropertyManagementWidget({
  propertyId,
}: PropertyManagementWidgetProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleUpdateNavigation = () => {
    router.push(`/my_properties_landlord/${propertyId}/update`);
  };

  // ✅ DELETE LOGIC HERE
  const confirmDelete = () => {
    startTransition(async () => {
      const response = await deletePropertyAction(propertyId);

      if (response.success) {
        toast.success("Success", { description: response.message });
        router.push("/my_properties_landlord");
      } else {
        toast.error("Deletion Failed", {
          description: response.message,
        });
      }
    });
  };

  return (
    <div className="space-y-4">
      {/* ✅ UPDATE BUTTON */}
      <Button
        onClick={handleUpdateNavigation}
        className="w-full bg-green-600 text-white hover:bg-green-700 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer h-10 shadow-none"
      >
        <FileEdit className="h-4 w-4" />
        Update Property Listing
      </Button>

      {/* 🔥 DELETE WITH ALERT DIALOG */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            disabled={isPending}
            className="w-full bg-red-700 text-white hover:bg-red-800 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer h-10 shadow-none"
          >
            <Trash2 className="h-4 w-4" />
            {isPending ? "Removing..." : "Delete Property Listing"}
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this property listing from RentNest.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>

            <AlertDialogAction onClick={confirmDelete} disabled={isPending}>
              {isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ✅ BACK BUTTON */}
      <Button
        onClick={() => router.push("/my_properties_landlord")}
        variant="outline"
        className="w-full border-olive-300 text-black hover:bg-olive-100/40 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer h-10 shadow-none"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Managed Nests
      </Button>
    </div>
  );
}
