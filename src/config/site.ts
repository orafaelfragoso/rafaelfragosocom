export const siteConfig = {
  name: 'Rafael Fragoso',
  url: 'https://rafaelfragoso.com',
  ogImage: 'https://rafaelfragoso.com/og.jpg',
  description:
    "I'm a software developer who loves to share my knowledge and passion for web development. On my blog, you'll find articles on javascript, react, typescript, nodejs, react native, and more.",
  author: {
    name: 'Rafael Fragoso',
    twitter: '@orafaelfragoso',
    email: 'hello@rafaelfragoso.com',
  },
  links: {
    x: 'https://x.com/orafaelfragoso',
    github: 'https://github.com/orafaelfragoso',
    linkedin: 'https://linkedin.com/in/rafaelfragosom',
    instagram: 'https://instagram.com/orafaelfragoso',
  },
  analytics: {
    plausible: {
      domain: 'rafaelfragoso.com',
      src: 'https://plausible.workbits.io/js/script.outbound-links.js',
    },
  },
}

export type SiteConfig = typeof siteConfig
