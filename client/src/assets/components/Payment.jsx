import axios from "axios";
import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Payment = () => {
  const initialOptions = {
    "client-id":
      "AWZhVSinRH63vYWU1zsoxQJDzkCTsxC2Fkl-1dAd5iXq_0gn9bXVKMVmB9OE-9mdbnd-OF7zktNQzb8m",
    currency: "USD",
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          style={{ layout: "horizontal" }}
          createOrder={(data, actions) => {
            return axios
              .post(
                "http://localhost:3000/api/orders",
                {
                  amount: {
                    currency_code: "USD",
                    value: "110",
                  },
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              )
              .then((response) => {
                const orderId = response.data.orderId;
                if (!orderId) {
                  throw new Error("Failed to get a valid order ID");
                }
                return orderId;
              })
              .catch((error) => {
                console.error(error);
                throw new Error("Failed to create PayPal order");
              });
          }}
          onApprove={(data, actions) => {
            return axios
              .post(
                `http://localhost:3000/api/orders/${data.orderId}/capture`,
                {
                  orderId: data.orderID,
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              )
              .then((response) => response.data)
              .then((data) => {
                console.log("Success!", data);
              })
              .catch((error) => {
                console.log("Error capturing the order", error);
              });
          }}
          onError={(err) => {
            console.error("Payment failed. Please try again after sometime.");
          }}
        />
      </PayPalScriptProvider>
    </PayPalScriptProvider>
  );
};

export default Payment;
