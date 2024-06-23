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
  },

  Game: {
    reviews(parent) {
      return reviews.filter(r => r.game_id == parent.id);
    }
  },
  
  Author: {
    reviews(parent) {
      return reviews.filter(r => r.author_id == parent.id);
    }
  },

  Review: {
    game(parent, args) {
      return games.find(g => g.id == parent.game_id);
    },

    author(parent, args) {
      return authors.find(a => a.id == parent.author_id);
    }
  },

  Mutation: {
    deleteGame(parent, args) {
      const index = games.findIndex(g => g.id == args.id);
      games.splice(index, 1);
      return games;
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