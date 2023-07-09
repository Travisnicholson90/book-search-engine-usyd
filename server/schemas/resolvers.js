const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {

    Query: {
        users: async () => {
            return User.find(); // returns all users
        },
        // return a single user by username
        user: async (parent, { userId }) => { 
            return User.findById({ _id: userId });
        },
        // me query to find the logged in user
        me: async (parent, args, context) => { 
            // if there is a user in the context
            if (context.user) { 
                // find the user by id
                const userData = await User.findOne({ _id: context.user._id }) 
                // exclude the password 
                    .select('-__v -password') 
                return userData;
            }
            throw new AuthenticationError('Not logged in');
        }
    },

    Mutation: {
        // create a new user
        addUser: async (parent, {username, email, password }) => { 
            const user = await User.create({ username, email, password });
            const token = signToken(user); // create token
            return { token, user }; // return token and user
    },

    login: async (parent, { email, password }) => { // login a user
        const user = await User.findOne({ email }); // find user by email

        if (!user) {
            throw new AuthenticationError('No user fount with these credentials');
        }

        // check password is correct
        const correctPw = await user.isCorrectPassword(password); 

        if (!correctPw) {
            throw new AuthenticationError('Incorrect password');
        }

        const token = signToken(user); // create token
        return { token, user }; // return token and user
        console.log('user logged in!', token);

    },

// save a book to a user
// pass in bookData as args
saveBook: async (parent, { bookData }, context) => {
  if (context.user) { // if there is a user in the context
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id }, // find user by id
        { $addToSet: { savedBooks: bookData } }, // add book to savedBooks array
        { new: true, runValidators: true } 
      );

      return updatedUser;
    } catch (error) {
      throw new Error('Failed to save the book.');
    }
  } else {
    throw new AuthenticationError('You need to be logged in!');
  }
},


    // remove a book from `savedBooks`
    removeBook: async (parent, { bookId, userId }, context) => {
        const updatedUser = await User.findOneAndUpdate(
            { _id: userId }, // find user by id passed in args
            { $pull: { savedBooks: { bookId } } }, // remove book from savedBooks array by the book id
            { new: true } // return updated user
        );
        return updatedUser;
    }
  }
}


module.exports = resolvers;