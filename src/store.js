import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from 'redux-thunk';

import { reducers } from "./reducers/index";

// add the middlewares
let middlewares = [];

// add the thunk middleware
middlewares.push(thunkMiddleware);

// apply the middleware
let middleware = applyMiddleware(...middlewares);

// add the redux dev tools
if (process.env.NODE_ENV !== 'production' && window.devToolsExtension) {
  middleware = compose(middleware, window.devToolsExtension());
}

// create the store
const store = createStore(reducers, middleware);

// export
export { store };
