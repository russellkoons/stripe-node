const app = require("express")();
const stripe = require("stripe")("sk_test_vo319kn4BiDIDF0orZp1ym6j00Kc7INuXS");

app.use(require("body-parser").text());

app.get('/', (req, res) => {
  res.send({statusText: 'Hello'});
});

app.post("/charge", async (req, res) => {
  try {
    let {status} = await stripe.charges.create({
      amount: 2000,
      currency: "usd",
      description: "An example charge",
      source: req.body
    });

    res.json({status});
  } catch (err) {
    res.status(500).end();
  }
});

app.listen(9000, () => console.log("Listening on port 9000"));