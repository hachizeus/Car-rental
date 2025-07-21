import { Helmet } from "react-helmet-async";

interface StructuredDataProps {
  type: 'website' | 'product' | 'organization' | 'breadcrumb' | 'faq';
  data: any;
}

export const StructuredData = ({ type, data }: StructuredDataProps) => {
  let structuredData;

  switch (type) {
    case 'website':
      structuredData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        ...data
      };
      break;
    case 'product':
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Product",
        ...data
      };
      break;
    case 'organization':
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        ...data
      };
      break;
    case 'breadcrumb':
      structuredData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        ...data
      };
      break;
    case 'faq':
      structuredData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        ...data
      };
      break;
    default:
      structuredData = data;
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

// Example usage for car details page
export const CarStructuredData = ({ car }: { car: any }) => {
  const carData = {
    name: car.title,
    description: car.description,
    image: car.images?.[0]?.url || '',
    brand: car.title.split(' ')[0],
    model: car.title.split(' ').slice(1).join(' '),
    vehicleConfiguration: car.category,
    fuelType: car.fuel_type,
    numberOfDoors: car.seats > 5 ? 5 : 4,
    numberOfAirbags: 6,
    vehicleTransmission: car.transmission,
    vehicleEngine: car.engine,
    offers: {
      "@type": "Offer",
      price: car.price_per_day,
      priceCurrency: "KES",
      availability: car.is_available ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      validFrom: car.createdAt,
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]
    }
  };

  return <StructuredData type="product" data={carData} />;
};