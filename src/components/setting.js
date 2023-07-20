import { Modal,Input,Text, Container, Button,Group} from "@mantine/core"
import {IconChevronDown } from "@tabler/icons-react"
export function Setting(){
    return(
        <Container>
                <Text>Openai api key</Text>
                <Group grow>
                        <Group grow><Input placeholder = "Your api key"/></Group>
                        <Group position="right">
                            <Button size = "xs"></Button>
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