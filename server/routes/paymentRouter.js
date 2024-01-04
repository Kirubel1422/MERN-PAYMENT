const express = require("express");
const router = express.Router();
const {
  PayPalHttpClient,
  OrdersCreateRequest,
  OrdersCaptureRequest,
} = require("@paypal/checkout-server-sdk");

const clientId = process.env.clientId;
const clientSecret = process.env.clientSecret;
const environment = new PayPalHttpClient.Environment.Sandbox();
const client = new PayPalHttpClient(environment, clientId, clientSecret);

router.post("/create-paypal-order", async (req, res) => {
  try {
    const request = new OrdersCreateRequest();
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "AED",
            value: "100.00",
          },
        },
      ],
    });

    const response = await client.execute(request);
    res.json({ orderId: response.result.id });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/capture-paypal-order", async (req, res) => {
  const orderId = req.body.orderId;
  try {
    const request = new OrdersCaptureRequest(orderId);
    request.requestBody({});

    const response = await client.execute(request);
    res.json({ status: response.result.status });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
