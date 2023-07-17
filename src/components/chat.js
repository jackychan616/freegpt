import { Container,Group,ActionIcon,Input,Button,createStyles,Modal,Text,UnstyledButton} from "@mantine/core";
import { useState } from "react";
import { sendMessage } from "@/utils/openai";
import { UserMessage,GPTMessage } from "./message";
import { IconTrashFilled,IconArrowBigRightFilled } from "@tabler/icons-react";
import { Tex } from "tabler-icons-react";
const useStyles = createStyles((theme) => ({
    chatbox: {
        [theme.fn.largerThan('sm')]: {
            width:"100%", 
            height:"35vw",
            overflowY:"scroll",
            overflow: "hidden",
        },
        [theme.fn.smallerThan('sm')]: {
            width:"100%",
            height:"75%",
        }
    },
    Input: {
        [theme.fn.largerThan('sm')]:{
            width:"65vw",
        },
        [theme.fn.smallerThan('sm')]:{
            width:"75%"
        }
    },
    hiddenMobile: {
        [theme.fn.smallerThan('sm')]: {
          display: 'none',
        },
      },
    
      hiddenDesktop: {
        [theme.fn.largerThan('sm')]: {
          display: 'none',
        },
      }
}))
export function Chat(){
    const [INvalue, setValue] = useState('');
    const [usermessage, setusermessage] = useState([]);
    const {classes} = useStyles();
    const [opened,setOpened] = useState(false)
    function handleKey(e){
        if (e.key === "Enter") {
            handleClick()
          }
    }
    const handleClick = async (e) => {
        if (INvalue != ""){
            setusermessage([
                ...usermessage,
                {
                  //id is the length of list
                  id: usermessage.length + 1,
                  message: INvalue,
                  aim:await sendMessage(INvalue)
                }
              ]);
              setValue("")
        }
    }
    const Trash = (e) => {
        setusermessage([]);
        setOpened(false);
    }
     return(
            <div style={{width:"100%",height:"100%"}}>
                    <Modal opened = {opened} onClose={e=>setOpened(false)} centered>
                        <Text>
                            是否要清理對話
                        </Text>
                        <Group position="right">
                            <Button variant ="default" onClick={e=>setOpened(false)}>
                                <Text>否</Text>
                            </Button>
                            <Button color="green" onClick={Trash}>
                                <Text>是</Text>
                            </Button>
                        </Group>
                    </Modal>
                    <Container className={classes.chatbox}>
                        <Container>
                        {usermessage.map(m => 
                        (
                        <Container key={m.id}>     
                            <UserMessage message={m.message}/>  
                            <GPTMessage message={m.aim}/>
                        </Container>

                        )
                        )}
                        </Container>
                    </Container>
                    <Container position="center" my="xl" sx={{marginBottom:'0 auto',margin:'3%'}}>
                        <Group >
                            <ActionIcon onClick={e=>setOpened(true)}>
                                <IconTrashFilled size="1.125rem" />
                            </ActionIcon>
                            <Group grow>
                                <Input className={classes.Input} onKeyDown = {handleKey} placeholder="type" value={INvalue} onChange={(event) => setValue(event.currentTarget.value)}
                                rightSection= {        
                                <UnstyledButton variant = "subtle" onClick ={e => {
                                    handleClick(); // Clear the text box
                                    }}  position="top-end">
                                    <IconArrowBigRightFilled size="1.125rem"/>
                                </UnstyledButton>
                                }>
                                </Input>  
                            </Group>
                        </Group>
                    </Container>
                </div>
     )
}