import { tNullable } from "@/types/nullish";
import { tImage } from "./image";

type tHumanModel = {
  uuid: string;

  avatar: tNullable<tImage>;
  address: tNullable<tImage>;

  username: string;
  birthday: string;

  phoneNumber: string;
  email: string;

  updatedAt: string;
  createdAt: string;
};

export type { tHumanModel };
