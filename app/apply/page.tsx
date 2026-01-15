import { Suspense } from "react"
import ApplyForm from "./apply-form"

export default function ApplyPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading application…</div>}>
      <ApplyForm />
    </Suspense>
  )
}
