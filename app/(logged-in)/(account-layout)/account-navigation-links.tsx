"use client";

import { NavigationLinks } from "@/features/navigation/NavigationLinks";
import { getAccountNavigation } from "./account.links";

export const AccountNavigationLinks = () => {
  const accountNavigation = getAccountNavigation();

  return <NavigationLinks navigation={accountNavigation} />;
};
