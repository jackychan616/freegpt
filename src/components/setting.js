import { Modal,Input,Text, Container, Button,Group} from "@mantine/core"
import {IconChevronDown, IconVacuumCleaner } from "@tabler/icons-react"
import { useLocalStorage } from '@mantine/hooks';
import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";

const Iskey = async () => {
    const configuration = new Configuration({
        apiKey: "sk-vvGBBOfVq6aRewvyldj2m9Ev7ITBSQEf6u0K1qiaKg90OhOq",
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.Modal.list()
    console.log(response)
}
export function Setting(){
    const [apikey,setapikey] =useLocalStorage({
        key:"api-key",
        defaultValue:"sk-vvGBBOfVq6aRewvyldj2m9Ev7ITBSQEf6u0K1qiaKg90OhOq"
    })
    const [keyvalue,setkeyvalue] = useState([]);
    return(
        <Container>
                <Text>Openai api key</Text>
                <Group grow>
                        <Group grow>
                            <Input 
                                value = {keyvalue}
                                placeholder = "Your api key"
                                onChange={(event)=>setkeyvalue(event.currentTarget.value)}
                            />
                        </Group>
                        <Group position="right">
                            <Button size = "xs" onClick={(event)=>setapikey(keyvalue)}></Button>
                        </Group>
                </Group>
                <Text>OpenAi type</Text>
                <Input component="select" rightSection={<IconChevronDown size={14} stroke={1.5}/>}>
                    <option value = "openai">openai</option>
                    <option value="otherai">Other Ai</option>
                </Input>
        </Container>
    )
}