import { OrganizationMembershipRole } from "@prisma/client";
import { LucideIcon } from "lucide-react";

export type NavigationGroup = {
  title: string;
  roles?: OrganizationMembershipRole[];
  links: NavigationLink[];
};

export type NavigationLink = {
  href: string;
  Icon: LucideIcon;
  label: string;
  roles?: OrganizationMembershipRole[];
  hidden?: boolean;
};
