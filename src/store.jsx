import { applyMiddleware, combineReducers, createStore } from "redux";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";
import { thunk } from "redux-thunk";

// const initialStateAccount = {
//   balance: 0,
//   loan: 0,
//   loanPurpose: "",
// };

// //// create reducer, not allowed to modify existing state or to do any async/side effect operations
// function accountReducer(state = initialStateAccount, action) {
//   switch (action.type) {
//     case "account/deposite":
//       return { ...state, balance: state.balance + action.payload };

//     case "account/withdraw":
//       return { ...state, balance: state.balance - action.payload };

//     case "account/requestLoan":
//       if (state.loan > 0) return;
//       return {
//         ...state,
//         loan: action.payload.amount,
//         loanPurpose: action.payload.purpose,
//         balance: state.balance + action.payload.amount,
//       };

//     case "account/payLoan":
//       return { ...state, balance: state.balance - state.loan };

//     default:
//       return state;
//   }
// }

// //// create store
// // const store = createStore(reducer);

// //// dispatch action
// // store.dispatch({type:'account/deposite', payload:500})

// //// get the current state
// // console.log(store.getState());

// ////****** action creators
// function deposite(amount) {
//   return { type: "account/deposite", payload: amount };
// }

// function withdraw(amount) {
//   return { type: "account/withdraw", payload: amount };
// }

// function requestLoan(amount, purpose) {
//   return { type: "account/withdraw", payload: { amount, purpose } };
// }

// function payLoan() {
//   return { type: "account/payLoan" };
// }

// // store.dispatch(deposite(600));
// // console.log(store.getState());

// //// Lets add another state
// const initialStateCustomer = {
//   fullName: "",
//   nationalID: "",
//   createdAt: "",
// };

// function customerReducer(state = initialStateCustomer, action) {
//   switch (action.type) {
//     case "customer/createCustomer":
//       return {
//         ...state,
//         fullName: action.payload.fullName,
//         nationalID: action.payload.nationalID,
//         createdAt: action.payload.createdAt,
//       };

//     case "customer/updateName":
//       return { ...state, fullName: action.payload };

//     default:
//       return state;
//   }
// }

// //// action creators for customer
// function createCustomer(fullName, nationalID) {
//   return {
//     type: "customer/createCustomer",
//     payload: { fullName, nationalID, createdAt: new Date().toISOString() },
//   };
// }

// function updateName(fullName) {
//   return { type: "customer/updateName", payload: fullName };
// }

// //// Combining the reducers
// const rootReducers = combineReducers({
//   account: accountReducer,
//   customer: customerReducer,
// });

// const store = createStore(rootReducers);

// store.dispatch(deposite(600));
// store.dispatch(createCustomer("Shivesh", "abcdf"));
// console.log(store.getState());

////******************************************

////************************** Refactor
// first refactor
// connecting redux back to react, npm i react-redux, Let's actually provide our store to the application. And so this actually works in a very similar way as the Context API. So let me show you.
// What we need to import now from the React Redux package is the provider. so now our application knows about the Redux store which means that every single component in the application can now read data from the store
// and can dispatch actions to it.

// get the data to the application using useSlector hook => Customer.jsx
// useDispatch CreateCustomer.jsx

// Redux Middleware using Thunk, npm i redux-thunk

//// Combining the reducers
const rootReducers = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducers, applyMiddleware(thunk));

export default store;
