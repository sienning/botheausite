import { z } from 'zod'
import { JWTPayload } from 'jose'
 
export const SignInFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .trim(),
})
 
export type FormState =
  | {
      errors?: {
        name?: string[]
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined

export interface SessionPayload extends JWTPayload {
  userName: string
  userSurname: string
  email: string
  role?: string
}

export interface User {
  MEMBERS_ID: number
  // Add other user properties as needed
  name?: string
  userSurname?: string
  email?: string
  role?: string
}

export interface RendezVous {
  RDV_ID: number
  RDV_DATE: string // ou Date selon votre format en base
}