import { gql } from '@apollo/client';

export const LoginQ = gql`
mutation ($email : String!, $password : String!) {
    login(loginInput: {
      email : $email,
      password : $password
    })
  }
`;