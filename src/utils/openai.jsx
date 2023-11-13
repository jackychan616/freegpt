// const Codemessage = res.split('```').pop().split('```')[0]
const chat_messages = [];
export const sendMessage = async (messages) => {
    chat_messages.push({role: "user", content: messages});
    console.log(chat_messages)
    const { Configuration, OpenAIApi } = require("openai");
    const api = localStorage.getItem('api-key')
    const configuration = new Configuration({
        apiKey: "sk-vvGBBOfVq6aRewvyldj2m9Ev7ITBSQEf6u0K1qiaKg90OhOq",
        basePath: "https://api.chatanywhere.com.cn/v1"
    });
    const openai = new OpenAIApi(configuration);
    const body = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: chat_messages,
        max_tokens:4000
    });
    const res = body.data.choices[0].message
    chat_messages.push(res)
    return res.content

}
//export const Image_gen = async (messages) => {

//}

//error handles 50%     