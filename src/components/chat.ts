"use server"

import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "",
    dangerouslyAllowBrowser: true
});

const getResponseFromGpt = async (message: string) => {
    try {
        const thread = await openai.beta.threads.create();

        await openai.beta.threads.messages.create(
            thread.id,
            {
                role: "user",
                content: message
            }
        );
        console.log(`User input: ${message}`)

        let run = await openai.beta.threads.runs.createAndPoll(
            thread.id,
            {
                assistant_id: "asst_kyZZu1t3NiYdfGVDvpk6cdYZ",
            },
        );

        const newMessages = await openai.beta.threads.messages.list(
            run.thread_id
        );

        const assistantMessages = newMessages.data
            .filter(message => message.role === 'assistant')
            .map(message => ({
                role: message.role,
                content: message.content[0].type === 'text' ? message.content[0].text.value : ''
            }));

        console.log(`HEYYYY ${assistantMessages}`);

        if (assistantMessages) {
            return assistantMessages
        }

        throw new Error("Failed to get Response");
    } catch (error) {
        console.error('Error in API route:', error);
        throw new Error("Failed to get Response");
    }
}

export { getResponseFromGpt }
