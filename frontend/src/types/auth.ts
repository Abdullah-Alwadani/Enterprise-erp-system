export type Role = {
  id: number;
  name: string;
  description?: string | null;
};

export type CurrentUser = {
  id: number;
  email: string;
  full_name: string;
  is_active: boolean;
  role: Role;
};

export type LoginResponse = {
  access_token: string;
  token_type: string;
};
