"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SiteConfig } from "@/site-config";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

type OrganizationsSelectProps = {
  currentOrgSlug?: string;
  children?: ReactNode;
  orgs: {
    id: string;
    slug: string;
    name: string;
    image: string | null;
  }[];
};

export const OrgsSelect = (props: OrganizationsSelectProps) => {
  const router = useRouter();
  return (
    <Select
      value={props.currentOrgSlug}
      onValueChange={(value) => {
        if (value === "new") {
          router.push("/orgs/new");
          return;
        }

        const newUrl = `/orgs/${value}`;

        router.push(newUrl);
      }}
    >
      <SelectTrigger className="h-8 justify-start gap-2 border-none bg-transparent px-4 hover:bg-accent [&>span]:flex [&>svg]:hidden hover:[&>svg]:block">
        {props.children ? props.children : <SelectValue />}
      </SelectTrigger>
      <SelectContent>
        {props.orgs.map((org) => (
          <SelectItem key={org.slug} value={org.slug} className="h-fit">
            <span className="inline-flex h-full items-center gap-1">
              <Avatar className="size-6">
                <AvatarFallback>
                  {org.name.slice(0, 1).toUpperCase()}
                </AvatarFallback>
                {org.image ? <AvatarImage src={org.image} /> : null}
              </Avatar>
              <span className="line-clamp-1 text-left">{org.name}</span>
            </span>
          </SelectItem>
        ))}
        {!SiteConfig.features.enableSingleMemberOrg ? (
          <SelectItem value="new">Add a new organization</SelectItem>
        ) : null}
      </SelectContent>
    </Select>
  );
};
