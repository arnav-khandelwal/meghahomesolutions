'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Property } from '@/data/properties';
import { ChevronLeft, ChevronRight, Bed, Bath, Maximize2, MapPin, ArrowRight } from 'lucide-react';
import styles from './PropertyCard.module.scss';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `${property.priceUnit}${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `${property.priceUnit}${(price / 100000).toFixed(2)} L`;
    }
    return `${property.priceUnit}${price.toLocaleString()}`;
  };

  return (
    <Link href={`/properties/${property.id}`} className={styles.cardLink}>
      <div className={styles.card}>
      <div className={styles.imageCarousel}>
        <div className={styles.imageContainer}>
          <Image
            src={property.images[currentImageIndex]}
            alt={property.title}
            fill
            className={styles.image}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className={styles.statusBadge}>
            {property.status === 'sale' ? 'For Sale' : 'For Rent'}
          </div>
          {property.featured && (
            <div className={styles.featuredBadge}>Featured</div>
          )}
        </div>
        
        {property.images.length > 1 && (
          <>
            <button
              className={`${styles.navButton} ${styles.prevButton}`}
              onClick={(e) => {
                e.preventDefault();
                prevImage();
              }}
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              className={`${styles.navButton} ${styles.nextButton}`}
              onClick={(e) => {
                e.preventDefault();
                nextImage();
              }}
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
            <div className={styles.imageIndicator}>
              {currentImageIndex + 1} / {property.images.length}
            </div>
          </>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.price}>{formatPrice(property.price)}</div>
        
        <h3 className={styles.title}>{property.title}</h3>
        
        <div className={styles.location}>
          <MapPin size={16} />
          <span>{property.address}, {property.city}</span>
        </div>

        <div className={styles.features}>
          <div className={styles.feature}>
            <Bed size={18} />
            <span>{property.bedrooms} Bedrooms</span>
          </div>
          <div className={styles.feature}>
            <Bath size={18} />
            <span>{property.bathrooms} Bathrooms</span>
          </div>
          <div className={styles.feature}>
            <Maximize2 size={18} />
            <span>{property.area} {property.areaUnit}</span>
          </div>
        </div>

        {property.description && (
          <p className={styles.description}>{property.description}</p>
        )}

        {property.amenities && property.amenities.length > 0 && (
          <div className={styles.amenities}>
            {property.amenities.slice(0, 4).map((amenity, index) => (
              <span key={index} className={styles.amenity}>
                {amenity}
              </span>
            ))}
            {property.amenities.length > 4 && (
              <span className={styles.amenity}>+{property.amenities.length - 4} more</span>
            )}
          </div>
        )}

        <div className={styles.viewMoreButton}>
          View Details
          <ArrowRight size={16} />
        </div>
      </div>
    </div>
    </Link>
  );
}
