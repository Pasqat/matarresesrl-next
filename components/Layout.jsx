// import Alert from '../components/alert'
import Footer from './Footer/Footer'
import Meta from '../components/meta'
import Alert from '../components/alert'
import Navbar from './Navbars/Navbar'

export default function Layout({children, navbarTransparent, preview}) {
  return (
    <>
      <Meta />
      <Navbar isTransparent={navbarTransparent} />
      <div className="min-h-screen selection:bg-yellow-500 selection:text-white">
        <Alert preview={preview} />
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}
