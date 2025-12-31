import "dotenv/config";
import ngrok from "@ngrok/ngrok";
import express from "express";
import usersRouter from "./routes/users";
import customersRouter from "./routes/customers";
import transactionsRouter from "./routes/transactions";

// Initialize express app
const app = express();

// Use global middlewares
app.use(express.json());

// Use routes
app.use("/users", usersRouter);
app.use("/customers", customersRouter);
app.use("/transactions", transactionsRouter);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
  ngrok
    .forward({
      proto: "http",
      authtoken: process.env.NGROK_AUTH_TOKEN!,
      addr: port,
      domain: process.env.NGROK_DOMAIN!,
    })
    .then((listener) => {
      console.log(`Ngrok tunnel started on ${listener.url()}`);
    })
    .catch((err) => {
      console.error("Failed to start ngrok tunnel", err);
    });
});
