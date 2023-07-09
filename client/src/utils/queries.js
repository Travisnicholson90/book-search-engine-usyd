import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query getUserById ($userId: ID!) {
    user(userId: $userId) {
      _id
      username
      email
      password
      savedBooks {
        authors
        bookId
        description
        title
        link
        image
      }
    }
  }`;

export const QUERY_ME = gql`
query me {
    me {
        _id
        username
        email
        bookCount
        savedBooks {
            bookId
            authors
            description
            title
            image
            link
        }
    }
}`;

export const QUERY_BOOKS = gql`
query books {
    books {
        bookId
        authors
        description
        title
        image
        link
    }
}`;

export const QUERY_SINGLE_BOOK = gql`
query book($bookId: String!) {
    book(bookId: $bookId) {
        bookId
        authors
        description
        title
        image
        link
    }
}`;



