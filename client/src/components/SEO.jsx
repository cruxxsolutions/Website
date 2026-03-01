import React, { useEffect } from 'react';

const SEO = ({ 
  title = 'Cruxx Solutions - Advanced Aerial Solutions & Drone Services',
  description = 'Cruxx Solutions provides cutting-edge aerial technology services including 3D mapping, NDVI sensing, agricultural drones, and aerial photography.',
  image = 'https://cruxxsolutions.com/og-image.jpg',
  url = 'https://cruxxsolutions.com',
  type = 'website',
  keywords = 'drone services, aerial solutions, UAV systems'
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    const updateMetaTag = (name, content, isProperty = false) => {
      let element = document.querySelector(
        isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`
      );
      
      if (!element) {
        element = document.createElement('meta');
        isProperty ? element.setAttribute('property', name) : element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Basic SEO
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;

  }, [title, description, image, url, type, keywords]);

  return null;
};

export default SEO;
