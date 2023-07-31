// const Codemessage = res.split('```').pop().split('```')[0]
export const sendMessage = async (messages) => {
    const { Configuration, OpenAIApi } = require("openai");
    const api = localStorage.getItem('api-key')
    const configuration = new Configuration({
        apiKey: "sk-vvGBBOfVq6aRewvyldj2m9Ev7ITBSQEf6u0K1qiaKg90OhOq",
        basePath: "https://api.chatanywhere.cn/v1"
    });
    const openai = new OpenAIApi(configuration);
    const body = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: messages}],
        max_tokens:4000
    });
    const res = body.data.choices[0].message.content; 
    return res

}
//error handles 50%