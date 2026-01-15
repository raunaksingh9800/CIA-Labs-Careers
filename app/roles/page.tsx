import { Suspense } from "react"
import RolesPage from "@/components/roles"

export default function ApplyPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading application…</div>}>
      <RolesPage />
    </Suspense>
  )
}
