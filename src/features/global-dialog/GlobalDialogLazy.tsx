import dynamic from "next/dynamic";

export const GlobalDialogLazy = dynamic(
  () => import("./GlobalDialog").then((mod) => mod.GlobalDialog),
  { ssr: false },
);
