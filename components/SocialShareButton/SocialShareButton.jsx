import Tooltip from "../Tooltip/Tooltip";

/**
  * @param {string} icon - FontAwesome icon name, eg. fab fa-facebook
  * @param children - maybe usefull for tooltip
  */
export default function SocialShareButton(props) {
  const { href, icon, children, tooltipContent, tooltipDirection } = props
  return tooltipContent ? (
    <Tooltip content={tooltipContent} direction={tooltipDirection}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer follow"
        {...props}
      >
        <i className={`text-3xl text-gray-600 hover:text-yellow-600 ${icon}`} />
        {children}
      </a>
    </Tooltip>
  ) : (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer follow"
      {...props}
    >
      <i className={`text-3xl text-gray-600 hover:text-yellow-600 ${icon}`} />
      {children}
    </a>
  )

}
