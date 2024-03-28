export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard*', '/auth*'],
    },
    sitemap: 'https://portify.website/sitemap.xml',
  };
}
