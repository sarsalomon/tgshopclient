import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserStore from './store/UserStore';
import CategoryStore from './store/CategoryStore';
import MemberStore from './store/MemberStore';
import ProductStore from './store/ProductStore';
import ServiceStore from './store/ServiceStore';
import OrderStore from './store/OrderStore';
export const Context = createContext(null)


ReactDOM.render(
  <Context.Provider value={{
    user: new UserStore(),
    category : new CategoryStore(),
    member: new MemberStore(),
    product: new ProductStore(),
    service: new ServiceStore(),
    order: new OrderStore()
  }}>
    <App />
  </Context.Provider>,

  document.getElementById('root')
);