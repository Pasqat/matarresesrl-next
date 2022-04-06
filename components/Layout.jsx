// import Alert from '../components/alert'
import Footer from './Footer/Footer'
import Meta from '../components/meta'
import Navbar from './Navbars/Navbar'

export default function Layout({children, navbarTransparent}) {
  return (
    <>
      <Meta />
      <Navbar isTransparent={navbarTransparent} />
      {/* Google Tag manager (noscript) */}
      <iframe
        src="https://www.googletagmanager.com/ns.html?id=GTM-5M9RQ4B"
        height="0"
        width="0"
        style="display:none;visibility:hidden"
      ></iframe>
      {/* Google Tag manager (noscript) */}
      <div className="min-h-screen selection:bg-yellow-500 selection:text-white">
        {/* <Alert preview={preview} /> */}
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}
