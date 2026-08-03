import { Role } from "./role";

export class User {
  id: number = -1;
  title: string = '';
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  role: string = Role.User;
  password: string = '';
  isDeleting: boolean = false;
}