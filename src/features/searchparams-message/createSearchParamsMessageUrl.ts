import { getServerUrl } from "@/lib/server-url";

export const SearchParamsMessageKeys = {
  error: "spm-error",
  message: "spm-message",
  success: "spm-success",
};

type SearchParamsMessageKey = keyof typeof SearchParamsMessageKeys;

export const createSearchParamsMessageUrl = (
  baseUrl: string,
  message: {
    type: SearchParamsMessageKey;
    message: string;
  },
): string => {
  // Determine if running on the server or client
  const isServer = typeof window === "undefined";

  // Convert relative URL to absolute URL if necessary
  const absoluteBaseUrl = baseUrl.startsWith("/")
    ? isServer
      ? `${getServerUrl()}/${baseUrl}`
      : `${window.location.origin}${baseUrl}`
    : baseUrl;

  const searchParamsKey = SearchParamsMessageKeys[message.type];
  const url = new URL(absoluteBaseUrl);

  url.searchParams.set(searchParamsKey, message.message);

  return url.toString();
};

export const deleteSearchParamsMessageUrl = () => {
  const url = new URL(window.location.href);
  url.searchParams.delete(SearchParamsMessageKeys.error);
  url.searchParams.delete(SearchParamsMessageKeys.message);
  url.searchParams.delete(SearchParamsMessageKeys.success);

  window.history.replaceState(window.history.state, "", url.toString());
};
