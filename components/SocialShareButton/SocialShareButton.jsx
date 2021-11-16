// import Tooltip from "../Tooltip/Tooltip";

/**
 * @param {string} icon - FontAwesome icon name, eg. fab fa-facebook
 * @param children - maybe usefull for tooltip
 */
export default function SocialShareButton(props) {
  const { href, icon, children } = props;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="mr-4 lg:mr-0 lg:mb-6"
    >
      <i className={`text-3xl text-gray-600 hover:text-yellow-500 ${icon}`} />
      {children}
    </a>
  );
}
