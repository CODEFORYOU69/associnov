import { SettingsNavigation } from "@/features/layout/SettingsNavigation";
import {
  Layout,
  LayoutContent,
  LayoutDescription,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import { createSearchParamsMessageUrl } from "@/features/searchparams-message/createSearchParamsMessageUrl";
import { combineWithParentMetadata } from "@/lib/metadata";
import { getRequiredCurrentOrgCache } from "@/lib/react/cache";
import { getServerUrl } from "@/lib/server-url";
import { SiteConfig } from "@/site-config";
import type { LayoutParams } from "@/types/next";
import { redirect } from "next/navigation";

export const generateMetadata = combineWithParentMetadata({
  title: "Settings",
  description: "Manage your organization settings.",
});

export default async function RouteLayout(
  props: LayoutParams<{ productId: string; orgSlug: string }>,
) {
  if (SiteConfig.features.enableSingleMemberOrg) {
    redirect(
      createSearchParamsMessageUrl(
        `${getServerUrl()}org/${props.params.orgSlug}`,
        {
          type: "message",
          message: "You need to update your account settings.",
        },
      ),
    );
  }

  const { roles } = await getRequiredCurrentOrgCache();

  const orgPath = `/orgs/${props.params.orgSlug}`;

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Organization</LayoutTitle>
        <LayoutDescription>
          The organization is the hub for your billing, members, and more.
        </LayoutDescription>
      </LayoutHeader>
      <LayoutContent className="mt-8 flex items-start gap-4 max-lg:flex-col">
        <SettingsNavigation
          roles={roles}
          links={[
            {
              href: `${orgPath}/settings`,
              label: "General",
              roles: ["ADMIN"],
            },
            {
              href: `${orgPath}/settings/members`,
              label: "Members",
              roles: ["ADMIN"],
            },
            {
              href: `${orgPath}/settings/billing`,
              label: "Billing",
              roles: ["ADMIN"],
            },
            {
              href: `${orgPath}/settings/danger`,
              label: "Danger Zone",
              roles: ["OWNER"],
            },
          ]}
        />
        <div className="mb-12 w-full flex-1">{props.children}</div>
      </LayoutContent>
    </Layout>
  );
}
