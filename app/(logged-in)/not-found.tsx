import AuthNavigationWrapper from "@/features/navigation/LogInNavigationWrapper";
import { Page404 } from "@/features/page/Page404";

export default function NotFoundPage() {
  return (
    <AuthNavigationWrapper>
      <Page404 />
    </AuthNavigationWrapper>
  );
}
