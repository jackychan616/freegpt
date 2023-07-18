import {Container,Button,Text,Group,Input, AppShell, Navbar,createStyles,ScrollArea, Box,useMantineColorScheme,ActionIcon, Header ,MediaQuery,Burger, Drawer, Center} from '@mantine/core'
import { useState, useEffect } from 'react';
import { IconSun, IconMoonStars,IconPlus,IconTrashFilled } from '@tabler/icons-react';
import { Chat } from '@/components/chat';

const useStyles = createStyles((theme) => ({
    nav: {   
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },

    },
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
function Body(){
    const { classes,theme } = useStyles();
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const [opened, setOpened] = useState(false);
    return(
        <AppShell
            
            header={<Header>
                    <MediaQuery height = {60} largerThan="sm" styles={{ display: 'none' }} width={"100%"}>
                    <Group className={classes.hiddenDesktop} grow>
                        <Burger
                            opened={opened}
                            onClick={() => setOpened((o) => !o)}
                            size="md"
                            color={theme.colors.gray[6]}
                            mr="xl"
                        />
                        <Center><Text color = {"#00CC66"} fw={500} fz= {"xl"}>FreeGPT</Text></Center>
                        <Group position='right'>
                            <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={30}>
                                {colorScheme === 'dark' ? <IconSun size="1rem" /> : <IconMoonStars size="1rem" />}
                            </ActionIcon>
                        </Group>
                    </Group>
                    </MediaQuery>
                    
                    <Drawer
                        opened={opened}
                        onClose={e=>setOpened(false)}
                    ></Drawer>

                    </Header>
            }
            
            navbarOffsetBreakpoint="sm"
            navbar={
            <Navbar
                height={'100%'}
                p = 'xs'
                width={{base:200}}
                hidden={!opened}
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
                    <Group position="Center" grow>
                        <Text color = {"#00CC66"} fw={500} fz= {"xl"}>FreeGPT</Text>
                        <Group position="right">
                            <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={30}>
                                {colorScheme === 'dark' ? <IconSun size="1rem" /> : <IconMoonStars size="1rem" />}
                            </ActionIcon>
                        </Group>
                    </Group>
                    </Box>
                </Navbar.Section>
                <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
                    <Button fullWidth variant="outline">
                        <Group position='center'>
                            <IconPlus size="1rem"/>
                            <Text>New Chat</Text>
                        </Group>
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