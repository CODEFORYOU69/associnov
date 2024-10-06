import { requiredAuth } from "@/lib/auth/helper";
import { OrgSelectQuery } from "@/lib/organizations/getOrg";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { OrganizationBilling } from "../../../../orgs/[orgSlug]/(navigation)/settings/billing/page";

export default async function RoutePage() {
  const user = await requiredAuth();
  const org = await prisma.organization.findFirst({
    where: {
      members: {
        some: {
          userId: user.id,
        },
      },
    },
    select: OrgSelectQuery(user.id),
  });

  console.log(org);

  if (!org) {
    console.log("no org", org);
    notFound();
  }

  return <OrganizationBilling org={org} />;
}
