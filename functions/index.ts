import { BedrockRuntimeClient, ConversationRole, ConverseCommand } from "@aws-sdk/client-bedrock-runtime";

export async function getData(event: any) {
    const data = JSON.parse(event.body);
    console.log("Received event:", JSON.stringify(data.message, null, 2));
    const client = new BedrockRuntimeClient({ region: "us-east-1" });
    const modelId = "anthropic.claude-3-haiku-20240307-v1:0";
    const userMessage = data.message;
    const role: ConversationRole = "user";
    const conversation = [
        {
            role: role,
            content: [{ text: userMessage }],
        },
    ];

    const command = new ConverseCommand({
        modelId,
        messages: conversation,
        inferenceConfig: { maxTokens: 512, temperature: 0.5, topP: 0.9 },
    });

    try {
        const response = await client.send(command);
        const responseText = response.output?.message?.content?.[0]?.text ?? "";
        console.log(responseText);

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: responseText,
            }),
        };
    }
    catch (error) {
        console.error("Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "Error processing message",
            }),
        };
    }
}
