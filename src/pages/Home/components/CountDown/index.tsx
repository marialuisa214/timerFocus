import { useEffect, useState } from "react"
import { CountdonwContainer, Separator } from "./styles"
import { differenceInSeconds } from "date-fns"

interface CountDownProps {
    activeCycle: any
    setCycles: any
    activeCycleID:any
}

export function CountDown({activeCycle, setCycles, activeCycleID}: CountDownProps){

  const [amountSeconds, setAmountSeconds] = useState(0) // armazena o total de segundos que ja se passou desde que a variavel foi criada

  const totalSeconds = activeCycle ? activeCycle.minutes * 60 : 0
  const currentSecons = activeCycle ? totalSeconds - amountSeconds : 0

  const minutesAmount = Math.floor(currentSecons / 60)
  const secondsAmount = currentSecons % 60



  const minutes = String(minutesAmount).padStart(2, '0')
  // partStart -> se a string tiver menos de 2 caracteres, ele vai adicionar o 0 no inicio
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )
        if (secondsDifference >= totalSeconds) {
          setCycles((state) =>
            state.map((cycle) => {
              if (cycle.id === activeCycleID) {
                return { ...cycle, finishedDate: new Date() }
              } else {
                return cycle
              }
            }),
          )
          setAmountSeconds(totalSeconds)
          clearInterval(interval)
        } else {
          setAmountSeconds(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, totalSeconds, activeCycleID])
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
