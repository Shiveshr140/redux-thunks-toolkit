import { useSelector } from "react-redux";

function Customer() {
  const username = useSelector((store) => store.customer.fullName);
  return <h2>👋 Welcome, {username}</h2>;
}

export default Customer;
