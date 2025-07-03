'use server'
import { SignInFormSchema, FormState } from '@/app/lib/definitions'
import { matchMDP,getUserData } from '@/app/lib/db'
import { createSession } from '@/app/lib/session'
import { redirect } from 'next/dist/client/components/navigation'

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
    if (match === -1) {
        return {
            errors: {
                name: ['User not found or password does not match.'],
            },
        }
    }
    // If the user exists
    //get the user data from the db
    const user = getUserData(validatedFields.data.name,validatedFields.data.password);
    console.log('user', user);
    if (!user) {
        return {
            errors: {
                name: ['User data could not be retrieved.'],
            },
        }
    }
    // and create a session
    await createSession({
        email: user.email ?? '',
        role: user.role ?? '',
        userName: user.name ?? '',
        userSurname: user.userSurname ?? ''
    })
    redirect('../home')
 
}