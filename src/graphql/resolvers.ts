interface AppUser {
  username: string;
  email: string;
}

export const Query = {
  user: (root: any, args: { id: string }): AppUser => {
    return { username: 'comanderguy', email: 'liam.w.muller@gmail.com' };
  },
  me: (root: any, args: any): any => ({ a: 'a' })
};

const resolver = {
  Query: Query
};

export default resolver;
