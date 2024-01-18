const express = require("express");
const router = express.Router();
const axios = require("axios");

const clientSecret = process.env.clientSecret;
const clientId = process.env.clientId;
const base = "https://api-m.sandbox.paypal.com";

const generateAccessToken = async () => {
  try {
    if (!clientId || !clientSecret) {
      throw new Error("MISSING_API_CREDENTIALS");
    }
    const auth = Buffer.from(clientId + ":" + clientSecret).toString("base64");
    const response = await axios.post(
      `${base}/v1/oauth2/token`,
      "grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    const data = response.data;
    return data.access_token;
  } catch (error) {
    console.error("Failed to generate Access Token:", error);
  }
};

const createOrder = async (cart) => {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders`;
  const payload = {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: cart.amount.currency_code,
          value: cart.amount.value,
        },
      },
    ],
  };

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.post(url, JSON.stringify(payload), config);
    return handleResponse(response);
  } catch (error) {
    console.error(error.response.data);
  }
};

const captureOrder = async (orderID) => {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders/${orderID}/capture`;

  const response = await axios.post(
    url,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return handleResponse(response);
};

async function handleResponse(response) {
  try {
    const jsonResponse = await response.data;
    return {
      jsonResponse,
      httpStatusCode: response.status,
    };
  } catch (err) {
    const errorMessage = await response.statusText;
    throw Error(errorMessage);
  }
}

router.post("/", async (req, res) => {
  try {
    const cart = req.body;
    const { jsonResponse, httpStatusCode } = await createOrder(cart);
    res.status(httpStatusCode).json({ orderId: jsonResponse.id });
  } catch (error) {
    console.error("Failed to create order");
    res.status(500).json({ error: "Failed to create order." });
  }
});

router.post("/:orderID/capture", async (req, res) => {
  try {
    const orderId = req.params.orderID;
    const { jsonResponse, httpStatusCode } = await captureOrder(orderId);
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create order", error);
    res.status(500).json({ error: "Failed to capture order." });
  }
});

module.exports = router;
