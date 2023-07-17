import { Container,Group,Text ,MediaQuery,Box} from "@mantine/core";

export function Copy(text){
    console.log(text)
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
    console.log(message)
    return(
        <Container>
            <Group position="left">
                <Box 
                sx={(theme)=>({
                    backgroundColor:"#99FFCC",
                    textAlign: 'center',
                    borderRadius: theme.radius.sm,
                    width: "20vw"
                })
                }
                >
                    <Text>{message.message}</Text>
                </Box>
            </Group>
        </Container>
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
                    backgroundColor:"#99FFCC",
                    textAlign: 'center',
                    borderRadius: theme.radius.sm,
                    width: l.toString() + "vw"
                })
                }
                >
                    <Text>{message.message}</Text>
                </Box>
            </Group>
        </Container>
    )
}