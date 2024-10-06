"use client";
import { NavigationGroup } from "@/features/navigation/navigation.type";
import { NavigationLinks } from "@/features/navigation/NavigationLinks";
import { OrganizationMembershipRole } from "@prisma/client";
import { getOrganizationNavigation } from "./org-navigation.links";

export const OrganizationNavigationLinks = ({
  slug,
  roles,
}: {
  slug: string;
  roles: OrganizationMembershipRole[] | undefined;
}) => {
  const organizationNavigation: NavigationGroup[] = getOrganizationNavigation(
    slug,
    roles,
  );
  return <NavigationLinks navigation={organizationNavigation} />;
};
