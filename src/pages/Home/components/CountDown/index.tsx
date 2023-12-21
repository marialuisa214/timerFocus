import { CountdonwContainer, Separator } from "./styles"

export function CountDown(){
    return {
        <CountdonwContainer>
            <span>{minutes[0]}</span>
            <span>{minutes[1]}</span>
            <Separator>:</Separator>
            <span>{seconds[0]}</span>
            <span>{seconds[1]}</span>
        </CountdonwContainer>
    }
}
