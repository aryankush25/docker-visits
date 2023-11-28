const express = require("express");
const redis = require("redis");
const process = require("process");

const bootstrap = async () => {
  const app = express();
  const client = await redis
    .createClient({
      url: "redis://redis-server:6379",
    })
    .on("error", (err) => console.log("Redis Client Error", err))
    .connect();

  console.log("Redis Client Connected");

  await client.set("visits", 0);

  app.get("/", async (req, res) => {
    process.exit(0);

    const visits = await client.get("visits");

    await client.set("visits", parseInt(visits) + 1);

    res.send("Number of visits is " + visits);
  });

  app.listen(3000, () => {
    console.log("Server is listening on port 3000");
  });
};

bootstrap();
