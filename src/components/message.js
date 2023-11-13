import { Container,Group,Text ,MediaQuery,Box,Avatar,CopyButton,Tooltip,ActionIcon ,createStyles, Center, SimpleGrid} from "@mantine/core";
import { TypeAnimation } from "react-type-animation";
import { IconCopy,IconCheck } from "@tabler/icons-react";
import moment from "moment/moment"; // get client time
export function Copy(text){
    return (
        <CopyButton value={text.text} timeout={2000}>
        {({ copied, copy }) => (
          <Tooltip label = {copied ? '已複製' : '複製'} withArrow position="r   ight">
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
        <div>
            <Group position="left">
                    <Avatar src = "/src/GPT.png" radius={"xl"}/>
                    <Container maw={500} sx={{justifyItems:'left',margin:'0',
                    display:'flex',
                    borderRadius:'5px',height:'100%',
                    width:'fit-content',padding:'1.5%',marginTop:'0.5%',backgroundColor:"#33FF99",}}>
                    
                    <SimpleGrid cols={1}>
                    <TypeAnimation
                            sequence={[message.message]}
                            wrapper="span"
                            speed={100}
                            style={{ fontSize: '13m', display: 'inline-block' }}
                            repeat={0}
                        />
                        <Group position="right">
                            <Text size = "xs" color="gray">{moment().format('h:mm')}</Text>
                        </Group>
                    </SimpleGrid>
                    </Container>          
                <Copy text = {message.message}/>
            </Group>
        </div>
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
                <Container miw={50} sx={{justifyItems:'left',margin:'0',
                    display:'flex',
                    borderRadius:'5px',height:'100%',
                    width:'fit-content',padding:'1.5%',marginTop:'0.5%',backgroundColor:"#33FF99",}}>
                    <SimpleGrid cols={1}>
                        <Text>{message.message}</Text>
                        <Group position="right">
                            <Text size = "xs" color="gray">{moment().format('h:mm')}</Text>
                        </Group>
                    </SimpleGrid>
                </Container>
                <Avatar src="/src/Userprofile.png" radius={"xl"}/>           
            </Group>
        </Container>
    )
}