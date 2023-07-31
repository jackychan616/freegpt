import { Container,Group,Text ,MediaQuery,Box,Avatar,CopyButton,Tooltip,ActionIcon ,createStyles} from "@mantine/core";
import { TypeAnimation } from "react-type-animation";
import { IconCopy,IconCheck } from "@tabler/icons-react";

export function Copy(text){
    return (
        <CopyButton value={text.text} timeout={2000}>
        {({ copied, copy }) => (
          <Tooltip label = {copied ? '已複製' : '複製'} withArrow position="right">
            <ActionIcon color={copied ? 'teal' : 'dark'} onClick={copy}>
              {copied ? <IconCheck size="1rem" /> : <IconCopy size="1rem" />}
            </ActionIcon>
          </Tooltip>
        )}
      </CopyButton>
    )
}
export function GPTMessage(message){
    return(
            <Group position="left">
                    <Avatar src = "/src/GPT.png" radius={"xl"}/>
                    <Container sx={{justifyItems:'left',margin:'0',
                    display:'flex',
                    borderRadius:'5px',height:'100%',
                    width:'fit-content',padding:'1.5%',marginTop:'0.5%',backgroundColor:"green",}}>
                    <TypeAnimation
                            sequence={[message.message]}
                            wrapper="span"
                            speed={100}
                            style={{ fontSize: '13m', display: 'inline-block' }}
                            repeat={0}
                        />
                    </Container>          
                <Copy text = {message.message}/>
            </Group>
    )
}
export function UserMessage(message){
    if (message.message.length > 10){
        var l = 20;
    } else {
        var l =2* message.message.length;
    }
    return(
        <Container>
            <Group position="right">
                <Container sx={{justifyItems:'left',margin:'0',
                    display:'flex',
                    borderRadius:'5px',height:'100%',
                    width:'fit-content',padding:'1.5%',marginTop:'0.5%',backgroundColor:"green",}}>
                    <Text>{message.message}</Text>
                </Container>
                <Avatar src="/src/Userprofile.png" radius={"xl"}/>           
            </Group>
        </Container>
    )
}