import { createAuthClient } from 'better-auth/react'
export const authClient = createAuthClient()

export const signInWithGithub = async () => {
  await authClient.signIn.social({
    provider: 'github',
    callbackURL: '/app'
  })
}

export const signInWithGoogle = async () => {
  await authClient.signIn.social({
    provider: 'google',
    callbackURL: '/app'
  })
}