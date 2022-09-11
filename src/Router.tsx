import { Route, Routes } from 'react-router-dom'
import { DefaultLayout } from './Layouts/DefaultLayout'
import { Home } from './pages/Home'
import { Order } from './pages/Order'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<Order />} />
      </Route>
    </Routes>
  )
}
