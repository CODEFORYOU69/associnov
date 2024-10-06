import { customAlphabet, nanoid } from "nanoid";

export const formatId = (id: string) => {
  return id
    .replace(/\s/g, "-")
    .replace(/[^a-zA-Z0-9_-]/g, "")
    .toLowerCase();
};

export const generateSlug = (value: string) => {
  const id = customAlphabet("1234567890abcdef", 10);
  return [formatId(value), id(4)].join("-");
};

export const getIdFromUser = (user: {
  name?: string | null;
  email?: string | null;
}) => {
  if (user.name) {
    return `${formatId(user.name)}-${nanoid(3)}`;
  }

  if (user.email) {
    const name = getNameFromEmail(user.email);
    return `${formatId(name)}-${nanoid(3)}`;
  }

  return nanoid(6);
};

export const getSlugFromUser = getIdFromUser;

export const getNameFromEmail = (email: string) => {
  return email.split("@")[0].split("+")[0];
};
