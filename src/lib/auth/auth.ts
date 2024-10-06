import { PrismaAdapter } from "@auth/prisma-adapter";
import type { User } from "@prisma/client";
import type { Session } from "next-auth";
import NextAuth from "next-auth";
import { env } from "../env";
import { prisma } from "../prisma";
import {
  setupDefaultOrganizationsOrInviteUser,
  setupResendCustomer,
} from "./auth-config-setup";
import {
  credentialsOverrideJwt,
  credentialsSignInCallback,
} from "./credentials-provider";
import { getNextAuthConfigProviders } from "./getNextAuthConfigProviders";

export const { handlers, auth: baseAuth } = NextAuth((req) => ({
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
    newUser: "/orgs",
  },
  adapter: PrismaAdapter(prisma),
  providers: getNextAuthConfigProviders(),
  session: {
    strategy: "database",
  },
  secret: env.NEXTAUTH_SECRET,
  callbacks: {
    session(params) {
      if (params.newSession) return params.session;

      const typedParams = params as unknown as {
        session: Session;
        user?: User;
      };

      if (!typedParams.user) return typedParams.session;

      typedParams.user.passwordHash = null;

      return typedParams.session;
    },
  },
  events: {
    // 🔑 Add this line and the import to add credentials provider
    signIn: credentialsSignInCallback(req),
    createUser: async (message) => {
      const user = message.user;

      if (!user.email) {
        return;
      }

      const resendContactId = await setupResendCustomer(user);

      await setupDefaultOrganizationsOrInviteUser(user);

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          resendContactId,
        },
      });
    },
  },
  // 🔑 Add this line and the import to add credentials provider
  jwt: credentialsOverrideJwt,
}));
