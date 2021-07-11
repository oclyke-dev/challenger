/*
// This file is subject to the terms and conditions defined in
// file 'LICENSE.md', which is part of this source code package.
*/

import {
  ObjectID,
} from 'mongodb';

import {
  QueryResolvers,
  MutationResolvers,
} from './generated/graphql';

import {
  TaskType,
  UserType,
} from './schema';

import {
  collections,
} from './db';

type Resolvers = {
  Query: QueryResolvers,
  Mutation: MutationResolvers,
}

/*
// remember: resolver args are: (parent, args, context, info)
*/

const resolvers: Resolvers = {
  Query: {
    listTasks: async () => {
      const results: TaskType[] = [];
      // const cursor = await collections.tasks().find({}, {});
      // await cursor.forEach((e) => results.push(new Task({ storage: e })));
      throw new Error('unimplemented');
      return results;
    },
    listUsers: async () => {
      const results: UserType[] = [];
      // const cursor = await collections.skills().find({}, {});
      // await cursor.forEach((e) => results.push(new User({ storage: e })));
      throw new Error('unimplemented');
      return results;
    },
  },
  Mutation: {
    createTask: async () => {
      throw new Error('unimplemented');
    },
    createUser: async () => {
      throw new Error('unimplemented');
    },
  },
};

export default resolvers;
