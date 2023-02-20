import { User } from "./user";

export type Newsletter = {
  id: string;
  code: string;
  title: string;
  subject: string;
  message: string;
  status: "PENDING" | "PUBLISHED" | "DECLINED";
  subscribers: string[];
  createdAt: Date;
  createdBy: User;
  updatedAt: Date;
  updatedBy: User;
  deleted: boolean;
  deletedAt: Date;
  deletedBy: User;
};
