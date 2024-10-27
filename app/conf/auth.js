import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";
import { LOGIN } from "../constants/apiEndpoint";


export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async(credentials) => {
        try {
          const response = await axios.post(
            `${LOGIN}`,
            {
              email: credentials?.email,
              password: credentials?.password,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const { statusCode, data } = response.data;
          if (statusCode === 'SUC' && data) {
            const user = {
              id: credentials.email, // or any unique identifier from the response
              name: data.user.fullName, // replace with user's name if available
              email: credentials.email,
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
              statusCode:statusCode
            };
            return user;
          } else {
            return null
          }
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
    signOut:"/"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.statusCode = user.statusCode
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          name: token.name,
          email: token.email,
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
          statusCode: token.statusCode
        },
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
