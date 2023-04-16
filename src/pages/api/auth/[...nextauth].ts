import nodemailer from 'nodemailer'
import NextAuth, { NextAuthOptions } from 'next-auth';
import GitHub from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import  EmailProvider  from 'next-auth/providers/email';
import { SanityAdapter, SanityCredentials } from 'next-auth-sanity';
import { client } from '@/lib/sanity';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    TwitterProvider({
      clientId: <string>process.env.TWITTER_CLIENT_ID!,
      clientSecret: <string>process.env.TWITTER_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
      // version: "2.0",
    }),
    FacebookProvider({
      clientId: <string>process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: <string>process.env.FACEBOOK_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
      // version: "2.0",
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: parseInt(<string>process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      async sendVerificationRequest ({
        identifier: email,
        url,
        provider: { server, from }
      }) {
        const { host } = new URL(url)
        const transport = nodemailer.createTransport(server)
        await transport.sendMail({
          to: email,
          from,
          subject: `Sign in to ${host}`,
          text: text({ url, host }),
          html: html({ url, host, email })
        })
      }
      
  
    }),

    SanityCredentials(client)
    
  ],
  
 

  session: {
    strategy: 'jwt'
  },
  secret: 'any-secret-word',
  adapter: SanityAdapter(client),
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
};

export default NextAuth(authOptions);


function html (params:{ url:string, host:string, email:string }) {

  const { url, host, email } = params
  const escapedEmail = `${email.replace(/\./g, '&#8203;.')}`
  const escapedHost = `${host.replace(/\./g, '&#8203;.')}`
  // Your email template here
  return `
      <body>
        <h1>Lasuhub</h1>
        <h1>Your magic link! 🪄</h1>
        <h3>Your email is ${escapedEmail}</h3>
        <p>
          <a href="${url}">Sign in to ${escapedHost}</a>
      </body>
  `
}

// Fallback for non-HTML email clients
function text (params:{ url:string, host:string }) {
  const { url, host } = params
  return `Sign in to ${host}\n${url}\n\n`
}