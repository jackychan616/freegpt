import { Container,Group,ActionIcon,Input,Button,createStyles,Modal,Text,UnstyledButton,Badge, Center,Space } from "@mantine/core";
import { useState } from "react";
import { sendMessage } from "@/utils/openai";
import { UserMessage,GPTMessage } from "./message";
import { IconTrashFilled,IconArrowBigRightFilled,} from "@tabler/icons-react";
import { AlertTriangle,FreeRights } from "tabler-icons-react";
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
            height:"85%",
            position:"relative",
            top:"10vw"
        }
    },
    Input: {
        [theme.fn.largerThan('sm')]:{
            width:"65vw",
        },
        [theme.fn.smallerThan('sm')]:{
            
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
function DefaultPage(){
    const {classes} = useStyles();
    return(
        <div>
            <Container style={{width:"100%"}} className={classes.hiddenMobile}>
                <Badge color="green">GPT 3</Badge>
                <Text fw={500} fz={45}>FreeGPT</Text>   
                <Text fw={500} fz = {20}>免費的ChatGPT</Text>
            </Container>
            <Center className={classes.hiddenDesktop} style={{height:"60%"}}>
                <Container style={{width:"100%"}}>
                <Badge color="green">GPT 3</Badge>
                <Text fw={500} fz={45}>FreeGPT</Text>   
                <Text fw={500} fz = {20}>免費的ChatGPT</Text>
                </Container>
            </Center>
        </div>
    )
}
export function Chat(){
    const [INvalue, setValue] = useState('');
    const [usermessage, setusermessage] = useState([]);
    const {classes} = useStyles();
    const [opened,setOpened] = useState(false);
    const [isType,setisTyped] = useState(false);
    
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
              setisTyped(true);
              setValue("")
        }
    }
    const Trash = (e) => {
        setusermessage([]);
        setOpened(false);
        setisTyped(false)
    }
     return(
            <div style={{width:"100%",height:"100%"}}>
                    <Modal opened = {opened} onClose={e=>setOpened(false)} centered>
                        <Group position="top">
                            <AlertTriangle size={48} strokeWidth={2} color={'#40bf54'}/>
                            <Text>
                                是否要清理對話
                            </Text>
                        </Group>
                        <Group position="right">
                            <Button variant ="default" onClick={e=>setOpened(false)}>
                                <Text>否</Text>
                            </Button>
                            <Button color="green" onClick={Trash}>
                                <Text>是</Text>
                            </Button>
                        </Group>
                    </Modal>
                    
                    <Container style={{position:isType?"relative":"absolute",display:isType?"none":"flex",width:"100%"}} className={classes.chatbox}> 
                        <DefaultPage/>
                    </Container>
                    <div className={classes.chatbox}>
                        {usermessage.map(m => 
                        (
                        <div key={m.id}>     
                            <UserMessage message={m.message}/>  
                            <Space h="md"/>
                            <GPTMessage message={m.aim}/>
                        </div>

                        )
                        )}
                    </div>
                    <Container position="center" my="xl" sx={{marginBottom:'0 auto',margin:'3%'}}>
                        <Group >
                            <ActionIcon onClick={e=>setOpened(true)}>
                                <IconTrashFilled size="1.125rem" />
                            </ActionIcon>
                            <Group grow>
                                <Input 
                                styles={(theme) => ({
                                    input: {
                                      '&:focus-within': {
                                        borderColor: theme.colors.green[7],
                                      },
                                    },
                                  })}
                                className={classes.Input}
                                onKeyDown = {handleKey} 
                                placeholder="type" 
                                value={INvalue} 
                                onChange={(event) => setValue(event.currentTarget.value)}
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