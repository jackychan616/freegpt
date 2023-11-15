import {Container,Button,Text,Group,Input, AppShell, Navbar,createStyles,ScrollArea, Box,useMantineColorScheme,ActionIcon, Header ,MediaQuery,Burger, Drawer, Center, Modal,Divider} from '@mantine/core'
import { useState, useEffect } from 'react';
import { IconSun, IconMoonStars,IconPlus,IconTrashFilled,IconSettings2,IconBrandGithub } from '@tabler/icons-react';
import {Chat} from '@/components/Services/chat';
import { Image_gen } from './Services/Image_genrate';
import { Setting } from '@/components/setting';
import { Metadata } from 'next'
import Link from 'next/link';
import { Tab } from "@headlessui/react";
import classNames from 'classnames';
import { useRouter } from 'next/router';




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

export function Layout(props){
    const { classes,theme } = useStyles();
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const [opened, setOpened] = useState(false);
    const [settingopened,setsettingopened] = useState(false);
    const tabs = ["profile", "subscription", "settings"];
                /*<Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
                    <Container>
                    <Button fullWidth variant="outline">
                        <Group position='center'>
                            
                            <IconPlus size="1rem"/>
                            <Text>New Chat</Text>
                        </Group>
                    </Button>
                    </Container>
                    
                </Navbar.Section>*/
    return(
        <Tab.Group>
        
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
                <Tab.List>
                {tabs.map((tab) => (
                  <Tab key={tab}>{tab + "/"}</Tab>
                ))}
                </Tab.List>
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
            <Tab.Panels>
                <Tab.Panel><Chat/></Tab.Panel>
                <Tab.Panel><Image_gen/></Tab.Panel>
                <Tab.Panel>Settings Content</Tab.Panel>
            </Tab.Panels> 
        </AppShell>
        </Tab.Group>
    )
}
