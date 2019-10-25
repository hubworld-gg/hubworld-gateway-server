interface AppUser {
  username: string;
  email: string;
}

export const Query = {
  user: (root: any, args: { id: string }): AppUser => {
    return { username: 'comanderguy', email: 'liam.w.muller@gmail.com' };
  }
};

const resolver = {
  Query: Query
};

export default resolver;
