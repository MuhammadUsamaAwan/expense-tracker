export type JWTPayload = {
  username: string;
};

export type Category = {
  id: string;
  name: string;
  color: string;
};

export type Expense = {
  id: string;
  amount: number;
  date: Date;
  category: Category;
  description: string | null;
};
