// import ApolloClient, { createNetworkInterface } from 'apollo-client';
//
// export const client = new ApolloClient({
//   networkInterface: createNetworkInterface({
//     uri: 'https://api-useast.graphcms.com/v1/ck573d2vv261901gihz5i4qa3/master'
//   })
// });


import ApolloClient from 'apollo-boost';

export const client = new ApolloClient({
  uri: 'https://api-us-east-1.graphcms.com/v2/ck573d2vv261901gihz5i4qa3/master',
});
