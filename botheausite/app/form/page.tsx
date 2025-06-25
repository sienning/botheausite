'use client'
import { signin } from '@/app/actions/auth'
import React from 'react'
import { useActionState } from 'react'
 
export function SignInForm() {
  const [state, action, pending] = useActionState(signin, undefined)
  return (
    <form action={action}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" placeholder="Name" />
      </div>
      {state?.errors?.name && <p>{state.errors.name}</p>}
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
      </div>
       {state?.errors?.password && (
        <div>
          <p>Password must:</p>
          <ul>
            {state.errors.password.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )}
      <button type="submit" disabled={pending}>
        {pending ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  )
}

export default SignInForm