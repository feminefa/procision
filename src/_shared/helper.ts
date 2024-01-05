// import "openai/shims/node";
import OpenAI from "openai";
import { type ChatCompletionMessageParam } from "openai/resources/index.mjs";

export const setToLocalStore = (key: string, value: string) => {
  return localStorage.setItem(key, value);
};

export const deleteFromLocalStore = (key: string) => {
  return localStorage.removeItem(key);
};

export const getFromLocalStore = (key: string) => {
  return localStorage.getItem(key);
};

export const parsePrompt = async (
  systemCommand: string,
  prompt: string,
): Promise<Record<string, unknown> | null> => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  if (typeof window != "undefined") {
    console.log("this code will only run on the server");
    return null;
  }
  const messages: ChatCompletionMessageParam[] = [
    { role: "system", content: systemCommand },
    {
      role: "user",
      content: prompt,
    },
  ];

  const completion = await openai.chat?.completions.create({
    messages,
    model: "gpt-3.5-turbo",
  });
  const output = completion.choices?.[0];

  try {
    return JSON.parse(output?.message.content || "");
  } catch (e) {
    console.log("PROMTERROR", e);
    return null;
  }
};
