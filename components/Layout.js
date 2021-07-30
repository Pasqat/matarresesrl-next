// import Alert from '../components/alert'
import Footer from './Footer/Footer'
import Meta from '../components/meta'
import Navbar from './Navbars/Navbar'

export default function Layout({ preview, children, navbarTransparent }) {
  return (
    <>
      <Meta />
      <Navbar isTransparent={navbarTransparent} />
      <div className="min-h-screen selection:bg-yellow-600 selection:text-white">
        {/* <Alert preview={preview} /> */}
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}