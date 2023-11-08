import {Container,Button,Text,Group,Input, AppShell, Navbar,createStyles,ScrollArea, Box,useMantineColorScheme,ActionIcon, Header ,MediaQuery,Burger, Drawer, Center, Modal,Divider} from '@mantine/core'
import { useState, useEffect } from 'react';
import { IconSun, IconMoonStars,IconPlus,IconTrashFilled,IconSettings2,IconBrandGithub } from '@tabler/icons-react';
import { Chat } from '@/components/chat';
import { Setting } from '@/components/setting';
import Head from 'next/head';

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
export const metadata = {
    title: 'FreeGpt',
    openGraph: {
      title: 'FreeGpt',
      description: 'A strong , free Ai chat services',
    },
  }
export function Layout(){
    const { classes,theme } = useStyles();
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const [opened, setOpened] = useState(false);
    const [settingopened,setsettingopened] = useState(false);
    return(
        <>
        <Head>
            <title>FreeGPT</title>
        </Head>
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
                    >
                        
                    </Drawer>
                    </Header>
            }
            navbarOffsetBreakpoint="sm"
            navbar={
            <Navbar
                height={"100%"}
                p = 'xs'
                width={{base:300}}
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
                        <Text color = {"#00CC66"} fw={500} fz= {30}>FreeGPT</Text>
                        <Group position="right">
                            <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={30}>
                                {colorScheme === 'dark' ? <IconSun size="1rem" /> : <IconMoonStars size="1rem" />}
                            </ActionIcon>
                        </Group>
                    </Group>
                    <Divider my="md"/>
                    </Box>
                </Navbar.Section>
                <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
                    <Container>
                    <Button fullWidth variant="outline">
                        <Group position='center'>
                            
                            <IconPlus size="1rem"/>
                            <Text>New Chat</Text>
                        </Group>
                    </Button>
                    </Container>
                    
                </Navbar.Section>
                
                <Navbar.Section>
                    <Divider my="xl"/>
                    <Group style = {{position:"relative",bottom:"10px"}}>
                        <ActionIcon onClick={e=>setsettingopened(true)}>
                            <IconSettings2 color="green" size="1.125rem"/>
                        </ActionIcon>
                        <ActionIcon>
                            <IconBrandGithub color="green" size="1.125rem"/>
                        </ActionIcon>
                    </Group>
                    <Modal title ="設定" opened={settingopened} onClose={e=>setsettingopened(false)} centered>
                    <Setting/>
                    </Modal>
                </Navbar.Section>
            </Navbar>
        }>              
                <Chat/>
        </AppShell>
        </>
    )
}
