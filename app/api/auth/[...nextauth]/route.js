import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME || 'admin@sachinvsvirat',
  passwordHash: process.env.ADMIN_PASSWORD_HASH || '$2a$10$rqJ5tXzq3e9Yn8F/HxYHLOrM1ypOmVBbKF.QqGxJ3TJmN2LqD8pFm'
};

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          if (credentials.username !== ADMIN_CREDENTIALS.username) {
            return null;
          }

          const isValidPassword = await bcrypt.compare(
            credentials.password,
            ADMIN_CREDENTIALS.passwordHash
          );

          if (!isValidPassword) {
            return null;
          }

          return {
            id: '1',
            name: 'Admin',
            email: credentials.username
          };
        } catch (error) {
          console.error('Authentication error:', error);
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
