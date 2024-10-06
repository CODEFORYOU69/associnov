import { buttonVariants } from "@/components/ui/button";
import {
  Layout,
  LayoutActions,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import { isInRoles } from "@/lib/organizations/isInRoles";
import { getRequiredCurrentOrgCache } from "@/lib/react/cache";
import type { PageParams } from "@/types/next";
import Link from "next/link";
import InformationCards from "./InformationCards";
import { SubscribersChart } from "./SubscribersChart";

export default async function RoutePage(
  props: PageParams<{
    orgSlug: string;
  }>,
) {
  const org = await getRequiredCurrentOrgCache();
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Dashboard</LayoutTitle>
      </LayoutHeader>
      <LayoutActions>
        {isInRoles(org.roles, ["ADMIN"]) ? (
          <Link
            href={`/orgs/${props.params.orgSlug}/settings/members`}
            className={buttonVariants({ variant: "outline" })}
          >
            Invite member
          </Link>
        ) : null}
      </LayoutActions>
      <LayoutContent className="flex flex-col gap-4 lg:gap-8">
        <InformationCards />
        <SubscribersChart />
      </LayoutContent>
    </Layout>
  );
}
