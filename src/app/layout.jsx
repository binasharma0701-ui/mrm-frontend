import Navbar from '../components/layout/Navbar/Navbar'
import Footer from '../components/layout/Footer/Footer'
import MobileMenu from '../components/layout/MobileMenu/MobileMenu'
import '../styles/global.css'

export default function Layout({ children }) {
  return (
    <div className="app-layout">
      <Navbar />
      <MobileMenu />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  )
}
