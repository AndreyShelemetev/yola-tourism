import { SITE_URL, SITE_NAME } from '@/lib/seo';

interface OrganizationLdProps {
  name?: string;
  url?: string;
}

export function OrganizationLd({ name, url }: OrganizationLdProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: name ?? SITE_NAME,
    url: url ?? SITE_URL,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

interface TouristAttractionLdProps {
  name: string;
  description: string;
  address: string;
  image?: string;
  rating?: number;
  url: string;
}

export function TouristAttractionLd(props: TouristAttractionLdProps) {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: props.name,
    description: props.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: props.address,
      addressLocality: 'Йошкар-Ола',
      addressRegion: 'Марий Эл',
      addressCountry: 'RU',
    },
    url: props.url,
  };
  if (props.image) data.image = props.image;
  if (props.rating) {
    data.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: props.rating,
      bestRating: 5,
      worstRating: 1,
    };
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

interface LodgingLdProps {
  name: string;
  description: string;
  address: string;
  image?: string;
  rating?: number;
  stars?: number;
  priceFrom?: number;
  url: string;
}

export function LodgingLd(props: LodgingLdProps) {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: props.name,
    description: props.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: props.address,
      addressLocality: 'Йошкар-Ола',
      addressRegion: 'Марий Эл',
      addressCountry: 'RU',
    },
    url: props.url,
  };
  if (props.image) data.image = props.image;
  if (props.stars) {
    data.starRating = { '@type': 'Rating', ratingValue: props.stars };
  }
  if (props.rating) {
    data.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: props.rating,
      bestRating: 5,
      worstRating: 1,
    };
  }
  if (props.priceFrom) {
    data.priceRange = `от ${props.priceFrom} ₽`;
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

interface RestaurantLdProps {
  name: string;
  description: string;
  address: string;
  image?: string;
  rating?: number;
  cuisine?: string;
  priceRange?: string;
  phone?: string;
  url: string;
}

export function RestaurantLd(props: RestaurantLdProps) {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: props.name,
    description: props.description,
    servesCuisine: props.cuisine,
    address: {
      '@type': 'PostalAddress',
      streetAddress: props.address,
      addressLocality: 'Йошкар-Ола',
      addressRegion: 'Марий Эл',
      addressCountry: 'RU',
    },
    url: props.url,
  };
  if (props.image) data.image = props.image;
  if (props.rating) {
    data.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: props.rating,
      bestRating: 5,
      worstRating: 1,
    };
  }
  if (props.priceRange) data.priceRange = props.priceRange;
  if (props.phone) data.telephone = props.phone;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

interface EventLdProps {
  name: string;
  description: string;
  location: string;
  startDate: string;
  endDate?: string | null;
  image?: string;
  isFree: boolean;
  price?: number | null;
  url: string;
}

export function EventLd(props: EventLdProps) {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: props.name,
    description: props.description,
    startDate: props.startDate,
    location: {
      '@type': 'Place',
      name: props.location,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Йошкар-Ола',
        addressRegion: 'Марий Эл',
        addressCountry: 'RU',
      },
    },
    url: props.url,
  };
  if (props.endDate) data.endDate = props.endDate;
  if (props.image) data.image = props.image;
  if (props.isFree) {
    data.isAccessibleForFree = true;
  } else if (props.price) {
    data.offers = {
      '@type': 'Offer',
      price: props.price,
      priceCurrency: 'RUB',
    };
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
