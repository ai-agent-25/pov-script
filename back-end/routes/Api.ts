import express, { Router, Request, Response } from "express";
import { openai } from "../utils/globals";

export const router: Router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const messages = req.body;
  openai.chat.completions
    .create({
      messages,
      model: "gpt-4",
    })
    .then((data) => {
      return res
        .status(200)
        .json({ confirmation: "success", data: data.choices[0].message });
    })
    .catch((error) => {
      return res
        .status(400)
        .json({ confirmation: "fail", error: error.message });
    });
});
