import { Container } from "react-bootstrap";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Footer from "./components/Footer";
import Header from "./components/Header";
import CartPage from "./pages/CartPage";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <main className="py-3">
          <Container>
            <Switch>
              <Route path="/" exact>
                <HomePage />
              </Route>
              <Route path="/product/:id">
                <ProductPage />
              </Route>
              <Route path="/cart/:id?">
                <CartPage />
              </Route>
            </Switch>
          </Container>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
