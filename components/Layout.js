// import Alert from '../components/alert'
import Footer from '../components/Footer'
import Meta from '../components/meta'
import Navbar from './Navbars/Navbar'

export default function Layout({ preview, children }) {
  return (
    <>
      <Meta />
      <Navbar />
      <div className="min-h-screen">
        {/* <Alert preview={preview} /> */}
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}