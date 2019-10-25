import { importSchema } from 'graphql-import';
// @ts-ignore
import schema from './schema.graphql';
import resolvers from './resolvers';

const typeDefs = importSchema(schema, { schema });

export { typeDefs, resolvers };
