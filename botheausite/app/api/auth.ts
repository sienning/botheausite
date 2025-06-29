'use server'
import { SignInFormSchema, FormState } from '@/app/lib/definitions'
import { matchMDP } from '@/app/lib/db'

export async function signin(state:FormState, formData: FormData) {
    // Validate form fields
    const validatedFields = SignInFormSchema.safeParse({
        name: formData.get('name'),
        password: formData.get('password')
    })

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }
 
    // Call the db to check if the user exists
    const match = matchMDP(validatedFields.data.name, validatedFields.data.password); 
    console.log('match', match);  
}