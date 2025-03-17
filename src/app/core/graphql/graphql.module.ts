import { NgModule } from '@angular/core';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { environment } from 'src/environments/environment';

export function createApollo(httpLink: HttpLink) {
  const authLink = setContext((_, { headers }) => ({
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      ...(environment.apiKey && { 'Authorization': `Bearer ${environment.apiKey}` })
    })
  }));

  const http = httpLink.create({ uri: environment.apiUrl });

  return {
    link: authLink.concat(http),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      },
      query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      },
    },
  };
}

@NgModule({
  imports: [HttpClientModule, ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
  exports: [ApolloModule]
})
export class GraphQLModule {}
