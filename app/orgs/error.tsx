"use client";

import { NavigationWrapper } from "@/features/navigation/NavigationWrapper";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import { Page400 } from "@/features/page/Page400";
import { logger } from "@/lib/logger";
import type { ErrorParams } from "@/types/next";
import { useEffect } from "react";

export default function RouteError({ error }: ErrorParams) {
  useEffect(() => {
    logger.error(error);
  }, [error]);

  return (
    <NavigationWrapper>
      <Layout>
        <LayoutHeader>
          <LayoutTitle>Organization error</LayoutTitle>
        </LayoutHeader>
        <LayoutContent>
          <Page400 />
        </LayoutContent>
      </Layout>
    </NavigationWrapper>
  );
}
