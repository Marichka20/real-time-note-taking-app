import bcrypt from "bcrypt";

// Simulated user database with hashed passwords
export const users: { [key: string]: string } = {
  user1: "$2b$10$E4Ojke.zn4N/2ToTYcDqN.FzRuMoA4Mg38z6v5E45B9z8KbR63Ipe", // "password1"
  user2: "$2b$10$zdfAxdTmVgD0Zgx7nY7XfOXh7yb.C19vX83QQlzBQGuS08E5QWziW", // "password2"
};

// Function to validate user credentials
export const validateUser = async (
  username: string,
  password: string
): Promise<boolean> => {
  if (!users[username]) return false;
  return await bcrypt.compare(password, users[username]);
};

// Function to hash a new password (Use this when adding new users)
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};
