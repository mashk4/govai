import type { NextApiRequest, NextApiResponse } from 'next'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
    return res.status(500).json({ error: 'OpenAI API key is not set' });
  }

  try {
    const thread = await openai.beta.threads.create();

    await openai.beta.threads.messages.create(
      thread.id,
      {
        role: "user",
        content: message
      }
    );

    const run = await openai.beta.threads.runs.create(
      thread.id,
      {
        assistant_id: process.env.ASSISTANT_ID as string,
      }
    );

    let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    while (runStatus.status !== "completed") {
      await sleep(1000);
      runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    }

    const messages = await openai.beta.threads.messages.list(thread.id);
    const lastMessage = messages.data[0];

    if (lastMessage.role === 'assistant' && lastMessage.content[0].type === 'text') {
      return res.status(200).json({ response: lastMessage.content[0].text.value });
    }

    return res.status(200).json({ response: "I'm sorry, I couldn't generate a response." });
  } catch (error) {
    console.error('Error in API route:', error);
    return res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
}

