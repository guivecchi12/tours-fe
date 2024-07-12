export interface User {
  _id: string;
  photo: string;
  role: 'admin' | 'user' | 'guide' | 'lead-guide';
  active: boolean;
  name: string;
  email: string;
}
