import {BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import './App.css';
//import header
import Header from './components/layout/header';
import Footer from './components/layout/footer';
import Home from './components/home';
import ProductDetails from './components/product/productDetail';
function App() {
  return (
   <Router>
     <div className="App">
      <Header />
      <div className="container container-fluid">
      <Routes>
      <Route exact path="/" element={<Home/>}  />
      <Route  path="/search/:keyword" element={<Home/>} />
      <Route  path="/product/:id" element={<ProductDetails/>} exact/>

      </Routes>
      </div>
      <Footer />
    </div>
   </Router>
  );
}
export default App;
