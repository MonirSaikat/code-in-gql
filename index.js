import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { typeDefs } from './schema.js';
import { games, authors, reviews } from './_db.js';

const resolvers = {
  Query: {
    games() {
      return games;
    },

    authors() {
      return authors;
    },

    reviews() {
      return reviews;
    },

    review(parent, args) {
      return reviews.find(r => r.id == args.id);
    },

    game(parent, args) {
      return games.find(g => g.id == args.id);
    },

    author(parent, args) {
      return authors.find(a => a.id == args.id);
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const PORT = process.env.PORT || 4000;
const { url } = await startStandaloneServer(server, {
  listen: {
    port: PORT
  }
});

console.log('server is listening on port ', PORT);