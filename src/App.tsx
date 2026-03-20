import { Analytics } from '@vercel/analytics/react'
import { AppLayout } from './components/layout/AppLayout'

function App() {
  return (
    <>
      <AppLayout />
      <Analytics />
    </>
  )
}

export default App