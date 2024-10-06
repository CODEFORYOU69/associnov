import { getRequiredCurrentOrgCache } from "@/lib/react/cache";
import type { PageParams } from "@/types/next";
import { OrgDetailsForm } from "./(details)/OrgDetailsForm";

export default async function RoutePage(props: PageParams) {
  const { org: organization } = await getRequiredCurrentOrgCache(["ADMIN"]);
  return <OrgDetailsForm defaultValues={organization} />;
}
