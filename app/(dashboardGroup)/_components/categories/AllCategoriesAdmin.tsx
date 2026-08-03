import React from 'react'
import { CategoryWithProperties } from '../../_types/category_types'
import AllCategoriesPartOne from './AllCategoriesPartOne'
import AllCategoriesPartTwo from './AllCategoriesPartTwo'
interface AllCategoriesAdminProps{
  categories: CategoryWithProperties[]
}
const AllCategoriesAdmin = ({categories}:AllCategoriesAdminProps) => {
  return (
    <div className="container mx-auto py-10 px-4 space-y-12">
      <AllCategoriesPartOne categories={categories} />
      <AllCategoriesPartTwo categories={categories} />
    </div>
  );
}

export default AllCategoriesAdmin