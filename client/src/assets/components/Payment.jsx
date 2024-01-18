import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Payment = () => {
  const initialOptions = {
    "client-id":
      "AWZhVSinRH63vYWU1zsoxQJDzkCTsxC2Fkl-1dAd5iXq_0gn9bXVKMVmB9OE-9mdbnd-OF7zktNQzb8m",
    currency: "USD",
  };
  const url = "http://localhost:3000/api/orders";
  let orderId;
  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons
        style={{ layout: "horizontal" }}
        createOrder={async (data, actions) => {
          try {
            const response = await axios.post(
              url,
              {
                amount: {
                  currency_code: "USD",
                  value: "500",
                },
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            orderId = response.data.orderId;
            if (!orderId) {
              throw Error("Cannot get orderId");
            }
            return orderId;
          } catch (error) {
            throw Error("Failed to create paypal order.");
          }
        }}
        onApprove={async (data, actions) => {
          try {
            const response = await axios.post(
              `${url}/${orderId ? orderId : data.orderID}/capture`,
              {},
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            return response.data;
          } catch (err) {
            console.error(err);
          }
        }}
        onError={(err) => {
          console.error(
            "Payment failed. Please try again after sometime.",
            err
          );
        }}
      />
    </PayPalScriptProvider>
  );
};

export default Payment;
