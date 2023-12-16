import { Routes, Route } from 'react-router-dom'
import { Home } from '../pages/Home/index'
import { History } from '../pages/Histoy/index'
import { DefaultLayout } from '../layouts/DefaultLayout'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  )
}
