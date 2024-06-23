import { authors, games, reviews } from "./_db.js";
import { db } from './db.js';

export const resolvers = {
  Query: {
    async games() {
      return await db('games').select('*');
    },
    
    async authors() {
      return await db('authors').select('*');
    },
    
    async reviews() {
      return await db('reviews').select('*');
    },

    async review(parent, args) {
      return await db('reviews').where('id', args.id).first();
    },

    async game(parent, args) {
      return await db('games').where('id', args.id).first();
    },
    
    async author(parent, args) {
      return await db('authors').where('id', args.id).first();
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
    },

    addGame(parent, args) {
      const newGame = {
        ...args.game,
        id: games.length + 1
      };

      games.push(newGame);

      return newGame;
    },

    updateGame(parent, args) {
      const game = games.find(g => g.id == args.id);

      if (!game) return null;

      game.title = args.edits.title;
      game.platform = args.edits.platform;

      return game;
    }
  }
};