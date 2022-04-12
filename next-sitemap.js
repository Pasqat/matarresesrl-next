/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl:
    `https://${process.env.NEXT_PUBLIC_DOMAIN}` || 'https://matarrese.it',
  generateRobotsTxt: true, // (optional)
  changefreq: 'weekly',
  // ... other options
}
