import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import User from "@/models/User";
import connectDB from "@/db/connectDB";
console.log("github provider is " + typeof GitHubProvider.default);
console.dir(GitHubProvider.default, { depth: null });

const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GitHubProvider.default({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: {
        params: {
          prompt: "login", // this forces GitHub to show the login screen
        },
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider == "github") {
        console.log("HI Route 1");
        await connectDB();
        console.log("HI Route 1");
        const currentuser = await User.findOne({ email: user.email });
        if (!currentuser) {
          const newUser = await User.create({
            email: user.email,
            username: user.email.split("@")[0],
            name: user.email.split("@")[0],
            profilepic: "",
            coverpic: "",
            razorpayId: "",
            razorpaySecret: "",
          });
          user.name = newUser.username;
        } else {
          user.name = currentuser.username;
        }
      }
      return true;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      const dbUser = await User.findOne({ email: session.user.email });
      session.user.name = dbUser.name;
      session.user.username = dbUser.username;
      console.log(session);
      return session;
    },
  },
};

console.log("NextAuth is " + typeof NextAuth.default);
console.dir(NextAuth.default, { depth: null });
export const GET = NextAuth.default(authOptions);
export const POST = NextAuth.default(authOptions);
