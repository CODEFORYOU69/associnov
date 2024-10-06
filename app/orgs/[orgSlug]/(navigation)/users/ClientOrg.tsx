"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { alertDialog } from "@/features/alert-dialog/alert-dialog-store";
import { useCurrentOrg } from "../../useCurrentOrg";

export const ClientOrg = () => {
  const org = useCurrentOrg();

  if (!org) {
    return (
      <Card>
        <CardHeader>No org</CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{org.name}</CardTitle>
        <CardDescription>{org.slug}</CardDescription>
      </CardHeader>
      <Button
        onClick={() => {
          alertDialog.add({
            title: "Are you sure ?",
            description: "You will delete your organization ?",
            action: {
              label: "Yes, I confirm",
              onClick: async () => {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                alert("I confirm");
              },
            },
          });
        }}
      >
        Click me
      </Button>
    </Card>
  );
};
