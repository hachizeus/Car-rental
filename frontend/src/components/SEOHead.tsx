import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  structuredData?: object;
  noIndex?: boolean;
  language?: string;
  author?: string;
}

export const SEOHead = ({ 
  title, 
  description, 
  keywords, 
  canonical, 
  ogImage = "https://pattrentals.com/og-image.jpg",
  ogType = "website",
  structuredData,
  noIndex = false,
  language = "en",
  author = "Pattrentals"
}: SEOHeadProps) => {
  const fullTitle = title.includes("Pattrentals") ? title : `${title} | Pattrentals - Premium Car Rental Kenya`;
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const canonicalUrl = canonical || currentUrl;
  
  // Default structured data for the organization
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Pattrentals",
    "url": "https://pattrentals.com",
    "logo": "https://pattrentals.com/logo.png",
    "description": "Premium Car Rental Services in Kenya",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Nairobi",
      "addressRegion": "Kenya"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+254-XXX-XXXX",
      "contactType": "customer service"
    },
    "sameAs": [
      "https://www.facebook.com/pattrentals",
      "https://www.instagram.com/pattrentals",
      "https://twitter.com/pattrentals"
    ]
  };
  
  const finalStructuredData = structuredData || defaultStructuredData;
  
  return (
    <Helmet>
      {/* Basic Metadata */}
      <html lang={language} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={author} />
      
      {/* Robots */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="Pattrentals" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@pattrentals" />
      
      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#e11d48" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData)}
      </script>
    </Helmet>
  );
};