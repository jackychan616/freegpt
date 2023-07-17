import {Container,Button,Text,Group,Input, AppShell, Navbar,createStyles,ScrollArea, Center, Box,useMantineColorScheme,ActionIcon  } from '@mantine/core'
import { useState, useEffect } from 'react';
import { sendMessage } from '@/utils/openai';
import { GPTMessage,UserMessage} from '@/components/message'; //not done
import { IconSun, IconMoonStars } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
    nav: {   
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },
}))
function Chat(){
    const [INvalue, setValue] = useState('');
    const [usermessage, setusermessage] = useState([]);
    const [airespond,setairespond] = useState([]);
    const [chat,setchat] = useState([]);
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
     return(
            <Container>
                
                    <Container sx={{width:"60vw", height:"35vw"}} style={{overflowY:"scroll"}}>
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
                    <Input onKeyDown = {handleKey} placeholder="type" value={INvalue} onChange={(event) => setValue(event.currentTarget.value)}
                        rightSection= {
                        <Button onClick ={e => {
                            handleClick(); // Clear the text box
                          }}  position="top-end"
                          ></Button>
                        }>
                    </Input>  
                    </Container>
                </Container>
     )
}
function Body(){
    const { classes } = useStyles();
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    return(
        <AppShell
        navbar={
            <Navbar
                height={'100%'}
                p = 'xs'
                width={{base:200}}
                className={classes.nav}
            >
                <Navbar.Section mt="xs">
                    <Box      
                        sx={(theme) => ({
                            paddingLeft: theme.spacing.xs,
                            paddingRight: theme.spacing.xs,
                            paddingBottom: theme.spacing.lg,
                            borderBottom: `${1}`,
      })}>
                    <Group position="Center" >
                        <Text color = {"#00CC66"} fw={500} fz= {"xl"}>FreeGPT</Text>
                        <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={30} sx={(theme)=>({
                        })}>
                            {colorScheme === 'dark' ? <IconSun size="1rem" /> : <IconMoonStars size="1rem" />}
                        </ActionIcon>
                    </Group>
                    </Box>
                </Navbar.Section>
                <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
                    <Button fullWidth variant="outline">
                        <Text>New Chat</Text>
                    </Button>
                </Navbar.Section>
            </Navbar>
        }>
            <Chat/>
        </AppShell>
    )
}
export default function Page(){
    return(
        <>
            <Body/>
        </>
    );
}