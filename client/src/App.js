import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import './App.css';

// Components
import GlobalStream from './components/global-stream';
import MainMenu from './components/menu';

// Apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});


function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
          <section id="main-header">
          <h1>Welcome to GrafTag.</h1>
          <h2>A collaborative aggregation of the world's graffiti, street art, throwups, tags, slaps, etc.</h2>
          <h3>If it's dope, shoot it, tag it, and post it.</h3>
        </section>
        <section id="main-menu">
          <MainMenu></MainMenu>
        </section>
        <section id="main-content">
          <GlobalStream></GlobalStream>
        </section>
      </div>
    </ApolloProvider>
  );
}

export default App;
