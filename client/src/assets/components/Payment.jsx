import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";

const Payment = () => {
  const url = "http://localhost:3000/payment";
  const createOrder = async () => {
    try {
      const response = await axios.post(url + "/create-paypal-order");
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onApprove = async (data) => {
    try {
      const response = await axios.post(url + "capture-paypal-order");
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PayPalScriptProvider options={{ clientId: "test" }}>
      <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
    </PayPalScriptProvider>
  );
};

export default Payment;
