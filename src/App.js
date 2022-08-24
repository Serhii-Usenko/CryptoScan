import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import './App.css';
import CoinPage from './pages/CoinPage';
import ErrorPass from './components/ErrorPass';

function App() {

  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Route exact path="/" component={Homepage} />
        <Route exact path="/coins/:id" component={CoinPage} />
      </div>
      <ErrorPass />
    </BrowserRouter>
  )
}

export default App;
