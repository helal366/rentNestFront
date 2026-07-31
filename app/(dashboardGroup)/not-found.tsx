"use client" // Required for using the useRouter hook

import Link from "next/link"
import { useRouter } from "next/navigation" // Correct import for App Router
import { FileQuestion, ArrowLeft, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 overflow-hidden">
      {/* Decorative background glow ambient effects */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-teal-500/10 dark:bg-teal-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl" />

      <Card className="relative w-full max-w-md border-slate-200/60 dark:border-slate-800/60 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-xl text-center">
        <CardHeader className="pt-10 pb-4">
          {/* Animated Centered Icon */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400 mb-4 animate-bounce animation-duration-[2s]">
            <FileQuestion className="h-10 w-10" />
          </div>
          
          {/* Huge Status Code */}
          <span className="text-sm font-semibold tracking-wider text-teal-600 dark:text-teal-400 uppercase">
            Error 404
          </span>
          
          <CardTitle className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 mt-1">
            Page Not Found
          </CardTitle>
        </CardHeader>

        <CardContent className="pb-8">
          <p className="text-sm text-muted-foreground max-w-xs mx-auto">
            Sorry, we couldn&apos;t find the resource you were looking for. It might have been moved or deleted.
          </p>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row gap-3 justify-center border-t border-slate-100 dark:border-slate-800/50 pt-6 pb-8">
          {/* SECURE GO BACK BUTTON: Removed <Link> and added onClick with router.back() */}
          <Button 
            variant="outline" 
            className="w-full sm:w-auto gap-2"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
          
          <Button asChild className="w-full sm:w-auto gap-2 shadow-sm bg-teal-600 hover:bg-teal-500 text-white dark:bg-teal-600 dark:hover:bg-teal-700">
            <Link href="/">
              <Home className="h-4 w-4" />
              Return Home
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
