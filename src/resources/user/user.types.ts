export type User = {
  _id: string;
  createdOn: Date;
  updatedOn: Date;
  deletedOn?: Date;
  avatarUrl: string | null;
  passwordHash: string | null;
};
