export const getMetaTags = (page) => {
  const defaultMeta = {
    title: 'MRM Handicrafts - Handcrafted Idols',
    description: 'Discover exquisite handcrafted idols for your home temple. Pure marble, poshak & sringar collections.',
    image: '/images/hero/main-idol.png',
  }

  const pageMeta = {
    home: {
      title: 'MRM Idols - Home',
      description: 'Bring divine blessings to your home with our exquisite collection of handcrafted idols.',
    },
    collections: {
      title: 'Collections | MRM Idols',
      description: 'Browse our collections of marble, poshak & sringar, and dust idols.',
    },
    about: {
      title: 'About Us | MRM Idols',
      description: 'Learn about MRM Handicrafts and our commitment to quality.',
    },
    contact: {
      title: 'Contact Us | MRM Idols',
      description: 'Get in touch with MRM Handicrafts for inquiries and orders.',
    },
  }

  return { ...defaultMeta, ...pageMeta[page] }
}

export const setMetaTags = ({ title, description, image, url }) => {
  document.title = title
  updateMetaTag('description', description)
  updateMetaTag('image', image)
  updateMetaTag('og:title', title)
  updateMetaTag('og:description', description)
  updateMetaTag('og:image', image)
  updateMetaTag('twitter:title', title)
  updateMetaTag('twitter:description', description)
  updateMetaTag('twitter:image', image)
}

const updateMetaTag = (name, content) => {
  let tag = document.querySelector(`meta[name="${name}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('name', name)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}
