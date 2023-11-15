import { Container,Group,ActionIcon,Input,Button,createStyles,Modal,Text,UnstyledButton,Badge, Center,Space, SimpleGrid, Card,Loader  } from "@mantine/core";
import { useState,useEffect,useRef  } from "react";
import { sendMessage } from "@/utils/openai";
import { UserMessage,GPTMessage } from "../message";
import { IconTrashFilled,IconArrowBigRightFilled,} from "@tabler/icons-react";
import { AlertTriangle,BorderBottom,FreeRights, Tex } from "tabler-icons-react";
const useStyles = createStyles((theme) => ({
    card: {
        transition: 'transform 150ms ease, box-shadow 150ms ease',
    
        '&:hover': {
          transform: 'scale(1.01)',
          boxShadow: theme.shadows.md,
        },
      },
    
      title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 600,
      },
    chatbox: {
        [theme.fn.largerThan('sm')]: {
            width:"100%", 
            height:"35vw",
            overflowY:"scroll",
        },
        [theme.fn.smallerThan('sm')]: {
            width:"100%",
            height:"130vw",
            top:"10vw",
            overflowY:"scroll"
        },
        
    },
    Input: {
        [theme.fn.largerThan('sm')]:{
            width:"60vw"
        },
        [theme.fn.smallerThan('sm')]:{
            width : "60vw"
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
    const [aimessage,setaimessage] = useState([]);
    const {classes,theme} = useStyles();
    const [opened,setOpened] = useState(false);
    const [isType,setisTyped] = useState(false);
    const [onTyping,setontyping] = useState(false)
    function handleKey(e){
        if (e.key === "Enter") {
            handleClick();
          }
    }
    const handleClick = async (e) => {
        setontyping(true);
        const tempvalue = INvalue;
        setValue("");
        if (tempvalue != ""){
            var res = await sendMessage(tempvalue);
            setusermessage([
                ...usermessage,
                {
                  //id is the length of list
                  id: usermessage.length + 1,
                  message: tempvalue,
                  aim:res
                }
              ]);
            setaimessage([
                ...aimessage,
                {
                    id: aimessage.length + 1,
                    message: res
                }
            ]);
              setisTyped(true);
              setontyping(false);
        }
    }
    const Trash = (e) => {
        setusermessage([]);
        setOpened(false);
        setisTyped(false)
    }
    const Status = async (e)=>{
        e=>setontyping(true);
        console.log(onTyping)
        var timeoutID = setTimeout(setontyping(false), 5000);
    }
    function DefaultPage(){
        const {classes} = useStyles();
        function Example({arg}){
            return (<Card component="a" p="md" onClick={e=>setValue(arg) && setusermessage(arg)} className = {classes.card}><Text fz={"md"}>{arg}</Text></Card>);
        }
        function Link({arg,url}){
            return (<Card component="a" target="_blank"  p="md" href = {url} className = {classes.card}><Text fz={"md"}>{arg}</Text></Card>);
        }
        function Blog(){
            return ( 
                <>
                            <SimpleGrid cols = {1}>
                                <Text c="dimmed">Get start</Text>
                                <Example arg={"Hi ! What is the solution of 1+1?"}/>
                                <Example arg={"What happened 10 years ago first of October?"}/>
                            </SimpleGrid>
                            <SimpleGrid cols={1}>
                                <Text c = "dimmed">Learn</Text>    
                                <Example arg={"Why Pi times square of radius of circle is the area of circle?"}/>
                                <Example arg = {"What is code of Hello world in Python"}/>                           
                            </SimpleGrid>
                            <SimpleGrid cols = {1}>
                                <Text c= "dimmed">Source</Text>
                                <Link arg = {"Latest Blog of ChatGPT"} url={"https://openai.com/blog"}/>
                                <Link arg = {"News of GPT-4"} url = {"https://openai.com/gpt-4"}/>
                            </SimpleGrid>
                </>
            )
        }
        return(
            <div>                
            <Container style={{width:"100%"}} className={classes.hiddenMobile}>
            <Group>
                <Container>
                        <Badge color="green">GPT 3</Badge>
                        <Text fw={500} fz={45}>FreeGPT</Text>   
                        <Text fw={500} fz = {20}>免費的ChatGPT</Text>
                    </Container>
                    <Container>
                        <SimpleGrid cols={3}>
                            <Blog/>
                        </SimpleGrid>
                    </Container>             
                </Group>
            </Container>
            <Container className={classes.hiddenDesktop}>
                <Container>
                    <Blog/>
                </Container>
            </Container>
            </div>
        )
    };
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
        }
    useEffect(() => {
            scrollToBottom()
            }, [aimessage]);
     return(
        <Center>
                <div style={{width:"100%",height:"100%",backgroundColor: "rgba(39, 202, 88, 0.1)"}}>
                    <Modal title="清理對話" opened = {opened} onClose={e=>setOpened(false)} centered>
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
                    <div className={classes.chatbox}>
                        <Container style={{position:isType?"relative":"relative",display:isType?"none":"flex",width:"100%",top:"15%"}}> 
                            <DefaultPage/>
                        </Container>
                        {usermessage.map(m => 
                        (
                        <div fluid sx={{margin:'0'}} key={m.id} ref={messagesEndRef}>     
                            <Space h = "lg"/>
                            <UserMessage message={m.message}/>  
                            <Space h="md"/>
                            <GPTMessage message={m.aim}/>
                            <Space h="md"/>
                        </div>
                        )  
                        )}
                    </div>   
                    <Center style={{display:onTyping?"flex":"none",bottom:"0px"}}>
                                <Loader color="green" variant="dots"/>
                    </Center>  
                </div>
                <Group style={{position:"absolute",bottom:"20px"}}>
                <div className={classes.hiddenMobile}>
                    <ActionIcon onClick={e=>setOpened(true)}>
                        <IconTrashFilled color="green" size="24" />
                    </ActionIcon>
                </div>
                <div className={classes.hiddenDesktop}>
                    <ActionIcon onClick={e=>setOpened(true)}>
                        <IconTrashFilled color="green" size="24" />
                    </ActionIcon>
                </div>
                <Container>
                <div>
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
                placeholder="輸入訊息" 
                value={INvalue} 
                onChange={(event) => setValue(event.currentTarget.value) }
                rightSection= {        
                <ActionIcon variant = "subtle" onClick ={e => {
                        handleClick(); // Clear the text box
                    }}  position="top-end"
                    title="發送">
                    <IconArrowBigRightFilled size="1.125rem"/>
                </ActionIcon>
                }>
                </Input>
                </div>
                </Container>
            </Group>
        </Center>
     )
}