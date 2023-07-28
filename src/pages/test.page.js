import { Container, Text } from "@mantine/core";

export default function Page(){
    return(
        <Container sx={{display:'flex',flexDirection:'column',width:'80vw',background:'#9BA4B5',marginLeft:'0',marginRight:'0',margin:'3%',borderRadius:'10px'}}>
        <Container sx={{display:'flex',flexDirection:'column',width:"100%",height:'100%'}} style={{overflowY:"scroll",}}>
            <Text>hi</Text>
        </Container>
        </Container>
    )
}