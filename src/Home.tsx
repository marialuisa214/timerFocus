import { createContext, useContext, useState } from 'react'

const CyclesContext = createContext({} as any) // valor inicial do contexto

export function NewCycleForm() {
  const { activeCycle, setActiveCycle } = useContext(CyclesContext)
  return (
    <div>
      <h1>NewCycleForm is name : {activeCycle}</h1>
      <button
        onClick={() => {
          setActiveCycle(23)
        }}
      >
        Soma +1
      </button>
    </div>
  )
}

export function CountDown() {
  const { activeCycle } = useContext(CyclesContext)

  return <h1>CountDown: {activeCycle}</h1>
}

export function Home() {
  const [activeCycle, setActiveCycle] = useState(0) // Home->componente pai dos outros que necessitam da info
  return (
    <CyclesContext.Provider value={{ activeCycle, setActiveCycle }}>
      <div>
        <h2>Testando</h2>
        <NewCycleForm />
        <CountDown />
      </div>
    </CyclesContext.Provider>
  )
}
