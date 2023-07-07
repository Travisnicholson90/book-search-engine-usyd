import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query user($username: String!) {
    user(username: $username) {
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


