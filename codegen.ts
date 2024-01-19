import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:3001/graphql',
  documents: 'src/graphql/**/*.graphql',
  generates: {
    'src/api/graphql/generated/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        withHooks: true,
      },
    },
    'src/graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
};

export default config;
