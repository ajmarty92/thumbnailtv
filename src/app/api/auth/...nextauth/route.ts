import NextAuth, { DefaultSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      plan: 'free' | 'pro'
      credits: number
    } & DefaultSession['user']
  }
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      // Persist the OAuth access_token and user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from the provider
      session.user.id = token.id as string
      session.user.plan = 'free' // You can fetch this from your database
      session.user.credits = 50 // You can fetch this from your database
      return session
    }
  },
  pages: {
    signIn: '/auth',
  },
})

export { handler as GET, handler as POST }
