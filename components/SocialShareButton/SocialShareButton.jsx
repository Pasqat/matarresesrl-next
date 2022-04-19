import Tooltip from '../Tooltip/Tooltip'
import {gtmEvent} from '../../lib/gtm'

/**
 * @param children - maybe usefull for tooltip
 */
export default function SocialShareButton(props) {
  const {href, icon, children, tooltip, title, social} = props
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="mr-4 hover:text-yellow-500 lg:mr-0 lg:mb-6"
      onClick={() =>
        gtmEvent('share', {
          method: social,
          content_type: 'article',
          item_id: title,
        })
      }
    >
      <Tooltip content={`condividi ${tooltip}`}>
        <div>{icon}</div>
        {/* <i className={`text-3xl text-gray-600 hover:text-yellow-500 ${icon}`} /> */}
        {children}
      </Tooltip>
    </a>
  )
}
