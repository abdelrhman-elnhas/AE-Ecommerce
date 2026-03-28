'use client'

import Link from "next/link"
import { Button } from "./components/ui/button"
import { AlertTriangle } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center space-y-6 max-w-md">
        
        {/* Icon */}
        <div className="flex justify-center">
          <div className="p-4 rounded-2xl bg-muted">
            <AlertTriangle className="h-10 w-10 text-yellow-500" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-6xl font-bold tracking-tight">
          404
        </h1>

        {/* Subtitle */}
        <h2 className="text-xl font-semibold">
          Page not found
        </h2>

        {/* Description */}
        <p className="text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex justify-center gap-3">
          <Link href="/">
            <Button>
              Go Home
            </Button>
          </Link>

          <Button variant="outline" onClick={() => history.back()}>
            Go Back
          </Button>
        </div>
      </div>
    </div>
  )
}