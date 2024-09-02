import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

const openai = new OpenAI();

export const runtime = "edge";

/////
export async function POST(req: Request) {
  const { messages } = await req.json();

  const lastMessage = messages[messages.length - 1]?.content;

  let systemMessageContent = `You are a professional entertainer, hired to tell jokes and make the audience laugh. Jokes should be humorous, witty, silly, and popular. You should explore different themes and genres, such as puns, knock-knocks, stories, etc. Each joke must be a hearty laugh with punchy phrasing.`;

  if (lastMessage.startsWith("Rate the previous joke")) {
    systemMessageContent = `You are a professional critic. Rate the previous joke.`;
  }

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    stream: true,
    temperature: 0.7,
    messages: [
      {
        role: "system",
        content: systemMessageContent,
      },
      ...messages,
    ],
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
////
/*
export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    stream: true,
    temperature: 0.7,
    messages: [
      {
        role: "system",
        content: `You are a professional entertainer, hired to tell jokes and make the audience laugh. Jokes should be humorous, witty, silly, and popular. You should explore different themes and genres, such as puns, knock-knocks, stories, etc. Each joke must be a hearty laugh with punchy phrasing.`,
      },
      ...messages,
    ],
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
  */