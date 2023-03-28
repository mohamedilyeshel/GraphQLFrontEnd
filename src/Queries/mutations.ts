import { gql } from '@apollo/client';

export const LoginQ = gql`
mutation loginMutation ($email : String!, $password : String!) {
    login(loginInput: {
      email : $email,
      password : $password
    })
    {
        statusCode,
        success,
        data,
        errors {
          message
        }
    }
  }
`;