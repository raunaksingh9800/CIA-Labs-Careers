"use server"

import { prisma } from "@/lib/db"
import { redirect } from "next/navigation"

export async function apply(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string | null
  const resumeUrl = formData.get("resumeUrl") as string
  const answers = formData.get("answers") as string
  const roleSlug = formData.get("roleSlug") as string

  // -------- basic validation --------
  if (!name || !email || !resumeUrl || !roleSlug) {
    throw new Error("Missing required fields")
  }

  // -------- fetch role --------
  const role = await prisma.role.findUnique({
    where: { slug: roleSlug },
  })

  if (!role || !role.isOpen) {
    throw new Error("Role not found or closed")
  }

  // -------- store application --------
  await prisma.application.create({
    data: {
      name,
      email,
      phone,
      resumeUrl,
      answers,
      roleId: role.id,
    },
  })

  // later: email + sheets go here

  redirect("/thanks")
}
