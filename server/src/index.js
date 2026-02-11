import express from "express";
import cors from "cors";
import { challenges } from "./challenges.js";
import { runChallengeTests } from "./evaluator.js";

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ limit: "100kb" }));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/challenges", (_req, res) => {
  res.json(
    challenges.map(({ tests, ...challenge }) => ({
      ...challenge,
      testCount: tests.length
    }))
  );
});

app.post("/api/challenges/:id/run", (req, res) => {
  const challenge = challenges.find((item) => item.id === req.params.id);

  if (!challenge) {
    return res.status(404).json({ message: "Challenge not found." });
  }

  const { code } = req.body;

  if (typeof code !== "string" || code.trim().length === 0) {
    return res.status(400).json({ message: "Code is required." });
  }

  const report = runChallengeTests(challenge, code);
  return res.json(report);
});

app.listen(port, () => {
  console.log(`Learning lab server running at http://localhost:${port}`);
});
