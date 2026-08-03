import { CategoriesApiResponse } from "../_types/category_types";
import { cookies } from "next/headers";
import AllCategoriesAdmin from './../_components/categories/AllCategoriesAdmin';


async function getCategoriesData(): Promise<CategoriesApiResponse> {
  const baseUrl = process.env.BACKEND_VERCEL_URL || "http://localhost:5000";
  // console.log({baseUrl})
  if(!baseUrl){
    throw new Error("Base url not found")
  }
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if(!accessToken){
    return {
      success: false,
      statusCode: 400,
      message: "Credentials invalid. Please login.",
      data: {
        meta: {
          count: 0
        },
        categories: []
      }
    }
  }
  const res = await fetch(`${baseUrl}/api/categories`, {
    headers: {
      Cookie: `accessToken=${accessToken}`
    },
    cache: "no-store", 
  });

  if (!res.ok) {
    throw new Error("Failed to fetch backend categories data");
  }

  return res.json();
}

export default async function CategoriesPage() {
  const response = await getCategoriesData();
  const categories = response.data.categories;

  return (
    <AllCategoriesAdmin categories={categories}/>
  );
}
