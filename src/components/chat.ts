"use server"

import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const getResponseFromGPT = async (prompt: string) => {
  try {
    const systemMessage = `we have the following proposals:
const proposals = [
  ${proposals}
]
const currentProposal = ${proposal}

User will send info about a proposal and you need to do what user asks to do, for example summarize proposal, list advantages and disadvantages. If user asks whether this proposal is going to pass just say your opinion. Don't give too long answers. Make them short or moderate, several paragraphs. Please remember that user can only ask 3 types of questions:
1. Give me a summary of this proposal. (it might be rephrased by user by sense should be the same)
2. What problem is this proposal going to tackle? (it might be rephrased by user by sense should be the same)
3. What advantages and disadvantages are in this proposal? (it might be rephrased by user by sense should be the same)
4. What's the possibility of this proposal to pass? (it might be rephrased by user by sense should be the same, just give your opinion here)

if user asks a different question, answer: "Sorry, for now I can't help with this requests. But I'll be able very soon :)"`

    const response = await client.chat.completions.create({
      messages: [
        {
          role: 'user', content: prompt,
        },
        {
          role: 'system', content: systemMessage,
        }
      ],
      model: 'gpt-4o-mini'
    }
    );
    return response.choices[0]?.message.content || "";

  } catch (error) {
    console.error("Error with ChatGPT API:", error);
  }
};

export { getResponseFromGPT }
