import { Providers } from './providers'
import Layout from './layout'
import Routes from './routes'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <Providers>
      <Layout>
        <Routes />
        <Toaster position="top-right" />
      </Layout>
    </Providers>
  )
}

export default App
