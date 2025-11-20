import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // Hardcoded credentials for testing
        const ADMIN_USERNAME = 'admin@sachinvsvirat';
        const ADMIN_PASSWORD = 'admin123';

        console.log('=== LOGIN ATTEMPT ===');
        console.log('Entered username:', credentials.username);
        console.log('Expected username:', ADMIN_USERNAME);
        console.log('Username match:', credentials.username === ADMIN_USERNAME);
        console.log('Entered password:', credentials.password);
        console.log('Expected password:', ADMIN_PASSWORD);
        console.log('Password match:', credentials.password === ADMIN_PASSWORD);

        // Simple direct comparison (no hashing for now)
        if (credentials.username === ADMIN_USERNAME && credentials.password === ADMIN_PASSWORD) {
          console.log('✅ LOGIN SUCCESS');
          return {
            id: '1',
            name: 'Admin',
            email: credentials.username
          };
        }

        console.log('❌ LOGIN FAILED');
        return null;
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