import './App.css';
import { ApolloClient, ApolloProvider , InMemoryCache} from "@apollo/client";
import logo from './logo.png';
import Launches from "./components/launches";
import Launch from './components/launch';

import { BrowserRouter as Router, Route } from 'react-router-dom';

const client = new ApolloClient({
   uri: 'http://localhost:5000/graphql',
   cache: new InMemoryCache()
})

function App() {
  return (
     <ApolloProvider client={client}>
        <Router>
           <div className="container">
              <img
                 src={logo}
                 alt="SpaceX"
                 style={{ width: 300, display: 'block', margin: 'auto' }}
              />
              <Route exact path="/" component={Launches} />
              <Route exact path="/launch/:flight_number" component={Launch} />
           </div>
        </Router>
     </ApolloProvider>
  );
}

export default App;
