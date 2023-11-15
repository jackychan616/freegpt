import { SendImage } from "@/utils/openai"

export function Image_gen(){
    const handleClick = async (e) => {
         var res = await SendImage();
    }
    handleClick()
    return (
        <></>
    )
}