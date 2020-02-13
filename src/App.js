import React from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import PageWrapper from './components/PageWrapper';


// pages
import Home from './components/pages/Home';
import SearchResult from './components/pages/SearchResult';

function App() {
  return (
    <Router>
    <PageWrapper>
      <Route exact={true} path="/" component={Home}/>
      <Route  path="/search" component={SearchResult}/>
    </PageWrapper>
    </Router>
  );
}

export default App;
