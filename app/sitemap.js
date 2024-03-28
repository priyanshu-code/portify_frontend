export default function sitemap() {
  return [
    {
      url: 'https://portify.website',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://portify.website/pricing',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://portify.website/explore',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: 'https://portify.website/templates',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    // Add more URLs as needed
  ];
}
