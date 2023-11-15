// const Codemessage = res.split('```').pop().split('```')[0]
import http, { IncomingMessage } from 'http';


const chat_messages = [];
export const sendMessage = async (messages) => {
    chat_messages.push({role: "user", content: messages});
    const body = await fetch("/api/openaiapi",{
        headers:{
            "Content-Type" : "application/json",
        },
        method: "POST",
        body : JSON.stringify({data:chat_messages})
        })
    const res = await body.json()
    console.log(res)
    chat_messages.push(res)
    return res.content
    } 
export const SendImage = async () => {
    const deepai = require('deepai'); // OR include deepai.min.js as a script tag in your HTML
    deepai.setApiKey('bb2ce213-bb0e-4a5a-a1fd-e49e8f5aab70');
    const res = await deepai.callStandardApi("cute-creature-generator", {
        text: "dog",
    });
    console.log(res)
}

//error handles 50%     