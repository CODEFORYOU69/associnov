import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { UserDropdown } from "@/features/auth/UserDropdown";
import { ContactFeedbackPopover } from "@/features/contact/feedback/ContactFeedbackPopover";
import { NavigationWrapper } from "@/features/navigation/NavigationWrapper";
import { getRequiredCurrentOrgCache } from "@/lib/react/cache";
import { getUsersOrgs } from "@/query/org/get-users-orgs.query";
import { Building } from "lucide-react";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { OrganizationCommand } from "./OrgCommand";
import { OrganizationNavigationLinks } from "./OrgLinks";
import { OrgsSelect } from "./OrgsSelect";
import { UpgradeCard } from "./UpgradeCard";

export async function OrgNavigation({ children }: PropsWithChildren) {
  const { org, user, roles } = await getRequiredCurrentOrgCache();

  const userOrganizations = await getUsersOrgs();

  return (
    <NavigationWrapper
      logoChildren={
        <OrgsSelect currentOrgSlug={org.slug} orgs={userOrganizations} />
      }
      navigationChildren={
        <OrganizationNavigationLinks roles={roles} slug={org.slug} />
      }
      bottomNavigationChildren={
        <div className="flex flex-col gap-2">
          <UpgradeCard />
          <Link
            className={buttonVariants({ variant: "outline", size: "sm" })}
            href={`/orgs/${org.slug}/settings`}
          >
            <Building size={16} className="mr-2" />
            Settings
          </Link>
        </div>
      }
      topBarCornerLeftChildren={
        <>
          <ContactFeedbackPopover>
            <Button size="sm" variant="outline">
              Feedback
            </Button>
          </ContactFeedbackPopover>
          <UserDropdown>
            <Button variant="ghost" className="size-10 rounded-full" size="sm">
              <Avatar className="size-8">
                <AvatarFallback>
                  {user.email ? user.email.slice(0, 2) : "??"}
                </AvatarFallback>
                {user.image && <AvatarImage src={user.image} />}
              </Avatar>
            </Button>
          </UserDropdown>
        </>
      }
      topBarChildren={<OrganizationCommand />}
    >
      {children}
    </NavigationWrapper>
  );
}
