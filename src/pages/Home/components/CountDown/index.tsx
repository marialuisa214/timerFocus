import { useContext, useEffect, useState } from 'react'
import { CountdonwContainer, Separator } from './styles'
import { differenceInSeconds } from 'date-fns'
import { CyclesContext } from '../..'

export function CountDown() {
  const { activeCycle, activeCycleID, markCurrentCycleAsFinished } =
    useContext(CyclesContext)

  const [amountSeconds, setAmountSeconds] = useState(0) // armazena o total de segundos que ja se passou desde que a variavel foi criada

  const totalSeconds = activeCycle ? activeCycle.minutes * 60 : 0
  const currentSecons = activeCycle ? totalSeconds - amountSeconds : 0

  const minutesAmount = Math.floor(currentSecons / 60)
  const secondsAmount = currentSecons % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  // partStart -> se a string tiver menos de 2 caracteres, ele vai adicionar o 0 no inicio
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds} `
    }
  }, [minutes, seconds, activeCycle])

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )
        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished()
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
  }, [activeCycle, totalSeconds, activeCycleID, markCurrentCycleAsFinished])
  return (
    <CountdonwContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdonwContainer>
  )
}
