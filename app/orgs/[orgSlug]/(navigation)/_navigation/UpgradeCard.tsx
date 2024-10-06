import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getRequiredCurrentOrgCache } from "@/lib/react/cache";
import Link from "next/link";

export const UpgradeCard = async () => {
  const { org: organization } = await getRequiredCurrentOrgCache();

  if (organization.plan.id !== "FREE") return null;

  return (
    <Card x-chunk="dashboard-02-chunk-0">
      <CardHeader className="p-2 pt-0 md:p-4">
        <CardTitle>Upgrade to PRO</CardTitle>
        <CardDescription>
          Unlock all features and get unlimited access to our app.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
        <Link
          href={`/orgs/${organization.slug}/settings/billing`}
          className={buttonVariants({ className: "w-full" })}
        >
          Upgrade
        </Link>
      </CardContent>
    </Card>
  );
};
