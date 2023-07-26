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
                <Box 
                sx={(theme)=>({
                    backgroundColor:"green",
                    textAlign: 'center',
                    borderRadius: theme.radius.sm,
                    width: "20vw",
                    [theme.fn.smallerThan('sm')] : {
                        width:"50vw"
                    }
                })
                }
                >
                        <TypeAnimation
                            sequence={[message.message]}
                            wrapper="span"
                            speed={50}
                            style={{ fontSize: '13m', display: 'inline-block' }}
                            repeat={0}
                        />   
                    
                </Box>
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
                <Box 
                sx={(theme)=>({
                    backgroundColor:"green",
                    textAlign: 'center',
                    borderRadius: theme.radius.sm,
                    width: l.toString() + "vw",
                    [theme.fn.smallerThan('sm')]:{
                        width:"20vw"
                    }
                })
                }
                >
                    <Text>{message.message}</Text>
                </Box>
            </Group>
        </Container>
    )
}