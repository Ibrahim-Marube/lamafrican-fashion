import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    role?: string
    name?: string
  }
  
  interface Session {
    user: {
      id: string
      email: string
      role: string
      name?: string
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string
    name?: string
  }
}
