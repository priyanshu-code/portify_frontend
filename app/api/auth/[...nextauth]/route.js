import axios from 'axios';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
// import https from 'https';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'rawatpriyanshu007@gmail.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        try {
          const response = await axios.post(
            process.env.BACKEND_URL + 'auth/login',
            {
              ...credentials,
              provider: 'portify',
            }
            // Do this when missmatch urls and certificate
            // {
            //   httpsAgent: new https.Agent({
            //     rejectUnauthorized: false,
            //   }),
            // }
          );
          const user = response.data;
          if (user) {
            return user;
          } else {
            return { msg: 'Something went wrong please try again later', error: true };
          }
        } catch (error) {
          // console.log(error);
          return { ...error.response.data, error: true };
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, token }) {
      if (user?.error === true) {
        throw new Error(user?.msg);
      }
      return { token, user, account };
    },
    async jwt({ token, user, account }) {
      if (account && account.provider === 'google') {
        token.id_token = account.id_token;
        token.provider = account.provider;
      }
      return { ...token, ...user };
    },
    async session({ session, token }) {
      if (token?.provider === 'portify') {
        const { firstname, lastname, email, _id, picturePath } = token.user;
        session = { ...session, firstname, lastname, email, _id, picturePath, token: token.token, provider: token.provider };
        session.user = undefined;
      } else {
        session.id_token = token.id_token;
        session.provider = token.provider;
        session = token;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
