import { User } from "./user";

export type ChatRoom = {
  id: string;
  name: string;
  members: User[];
  roomImage: string;
  createdAt: Date;
  createdBy: User,
  updatedBy: User,
  deleted: { type: Boolean, default: false, select: false },
}