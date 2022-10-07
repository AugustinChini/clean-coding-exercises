/**
 * Should we use interface like this one to deal with the
 * creation / listing queries or the UserModel and
 * the snapshot method ? or this class is more for the business logic ?
 * Should we call this interface UserModel ?
 */
export type User = {
  userName: string;
  email: string;
};
