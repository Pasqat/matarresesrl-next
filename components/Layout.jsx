// import Alert from '../components/alert'
import {useRouter} from 'next/router'
import Footer from './Footer/Footer'
import Meta from '../components/meta'
import Alert from '../components/alert'
import Navbar from './Navbars/Navbar'
import StructuredData from './StructuredData'
import {globalSchema} from '../lib/seo/schema'

export default function Layout({children, navbarTransparent, preview}) {
  const {pathname} = useRouter()
  return (
    <>
      <Meta />
      <StructuredData data={globalSchema()} />
      <Navbar isTransparent={navbarTransparent} />
      <main
        className="site-content"
        id="contenuto"
        tabIndex={-1}
        data-page={pathname}
      >
        <Alert preview={preview} />
        <div className="page-content">{children}</div>
      </main>
      <Footer />
    </>
  )
}
