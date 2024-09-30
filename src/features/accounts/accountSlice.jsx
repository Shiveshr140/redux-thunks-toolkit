import { createSlice } from "@reduxjs/toolkit";

// const initialStateAccount = {
//   balance: 0,
//   loan: 0,
//   loanPurpose: "",
//   isLoading: false,
// };

// //// create reducer, not allowed to modify existing state or to do any async/side effect operations
// export default function accountReducer(state = initialStateAccount, action) {
//   switch (action.type) {
//     case "account/deposite":
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//         isLoading: false,
//       };

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

//     case "account/convertingCurrency":
//       return { ...state, isLoading: true };

//     default:
//       return state;
//   }
// }

// ////****** action creators
// export function deposite(amount, currency) {
//   if (currency === "INR") return { type: "account/deposite", payload: amount };
//   return async function (dispatch, getState) {
//     dispatch({ type: "account/convertingCurrency" });
//     const res = await fetch(
//       `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=INR`
//     );
//     const data = await res.json();
//     const converted = data.rates.INR;
//     dispatch({ type: "account/deposite", payload: converted });
//   };
// }

// export function withdraw(amount) {
//   return { type: "account/withdraw", payload: amount };
// }

// export function requestLoan(amount, purpose) {
//   return { type: "account/requestLoan", payload: { amount, purpose } };
// }

// export function payLoan() {
//   return { type: "account/payLoan" };
// }

////****************************************

////********************************* Redux Toolkit: RTK
//// Create slice

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

export const accountSlice = createSlice({
  name: "account",
  initialState: initialStateAccount,
  reducers: {
    deposite(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        };
      },
      reducer(state, action) {
        if (state.loan < 0) return;
        state.loan = action.payload.amount;
        state.balance = state.balance + state.loan;
        state.loanPurpose = action.payload.purpose;
      },
    },
    payLoan(state) {
      state.balance = state.balance - state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
  },
});

console.log(accountSlice);

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

// We will not export deposite at above, thunk will automatically provided by redux-toolkit need not install anything.
export function deposite(amount, currency) {
  if (currency === "INR") return { type: "account/deposite", payload: amount };
  return async function (dispatch, getState) {
    dispatch({ type: "account/convertingCurrency" });
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=INR`
    );
    const data = await res.json();
    const converted = data.rates.INR;
    dispatch({ type: "account/deposite", payload: converted });
  };
}

export default accountSlice.reducer;
