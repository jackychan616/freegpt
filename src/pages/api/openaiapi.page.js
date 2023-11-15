const Openai = () => {
    const { Configuration, OpenAIApi } = require("openai");
    const configuration = new Configuration({
        
        //sk-vvGBBOfVq6aRewvyldj2m9Ev7ITBSQEf6u0K1qiaKg90OhOq
        apiKey: "sk-vvGBBOfVq6aRewvyldj2m9Ev7ITBSQEf6u0K1qiaKg90OhOq",
        basePath: "https://api.chatanywhere.com.cn/v1"
    });
    const openai = new OpenAIApi(configuration);
    return openai;
}
export default async function handler(req,res){
    const chat_messages = req.body.data
    const openai = Openai();
    const body = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: chat_messages,
    max_tokens:4000
    });

    res.status(200).json(body.data.choices[0].message)
}