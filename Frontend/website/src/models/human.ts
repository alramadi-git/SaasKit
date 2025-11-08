import { tImage } from "./image";

export type tHumanModel = {
  uuid: string;

  avatar?: tImage;

  username: string;
  dateOfBirth: string;

  email: string;

  updatedAt: string;
  createdAt: string;
};
