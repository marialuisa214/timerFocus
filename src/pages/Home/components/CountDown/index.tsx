import { useContext, useEffect } from 'react'
import { CountdonwContainer, Separator } from './styles'
import { differenceInSeconds } from 'date-fns'
import { CyclesContext } from '../../../../contexts/CycleContext'

export function CountDown() {
  const {
    activeCycle,
    activeCycleID,
    markCurrentCycleAsFinished,
    amountSeconds,
    setSecondsPassed,
  } = useContext(CyclesContext)

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
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate),
        )
        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished()
          setSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycle,
    totalSeconds,
    activeCycleID,
    markCurrentCycleAsFinished,
    setSecondsPassed,
  ])
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
