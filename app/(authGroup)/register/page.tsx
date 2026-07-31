import React from 'react'
import RegisterForm from '../_components/RegisterForm'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Create an Account | RentNest",
  description: "Join RentNest to discover incredible rentals or list your property today.",
};
const RegisterPage = () => {
  return (
     <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-muted/40">
          <div className="w-full max-w-md">
            <RegisterForm />
          </div>
        </main>
  )
}

export default RegisterPage