'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Property } from '@/data/properties';
import { ChevronLeft, ChevronRight, Bed, Bath, Maximize2, MapPin, ArrowLeft, Phone, Mail, Calendar, MessageCircle } from 'lucide-react';
import LeadCaptureForm from '@/components/LeadCaptureForm/LeadCaptureForm';
import styles from './PropertyDetail.module.scss';

interface PropertyDetailProps {
  property: Property;
}

export default function PropertyDetail({ property }: PropertyDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showForm, setShowForm] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check for mss cookie with value 2512
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
      return null;
    };

    const mssCookie = getCookie('mss');
    if (mssCookie === '2512') {
      setShowForm(false);
    }
  }, []);

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

  const handleFormSubmit = async (data: { name: string; email: string; phone: string; propertyName?: string }) => {
    setIsSubmitting(true);
    
    try {
      const payload = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        propertyName: `${property.title}, ${property.address}` || 'not given'
      };
      
      console.log('Submitting data:', payload);
      
      const response = await fetch('https://script.google.com/macros/s/AKfycbyhFhqG4tcCMFV1tYjhHPyifQpSMTq1kuUPwb7axgWhX0uTai-t4BlqugMDGhC2Hu3g/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Set mss cookie with value 2512 for 30 days
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 30);
      document.cookie = `mss=2512; expires=${expirationDate.toUTCString()}; path=/`;

      setShowForm(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      // Still show the details even if there's an error
      setShowForm(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {showForm && (
        <LeadCaptureForm onSubmit={handleFormSubmit} isLoading={isSubmitting} propertyName={property.title} />
      )}
      
      <div className={styles.propertyDetail}>
        <div className={`${styles.container} ${showForm ? styles.blurred : ''}`}>
        <Link href="/properties" className={styles.backButton}>
          <ArrowLeft size={20} />
          Back to Properties
        </Link>

        <div className={styles.header}>
          <div className={styles.titleSection}>
            <h1 className={styles.title}>{property.title}</h1>
            <div className={styles.location}>
              <MapPin size={20} />
              <span>{property.address}, {property.city}</span>
            </div>
          </div>
          <div className={styles.pricing}>
            <div className={styles.price}>{formatPrice(property.price)}</div>
            <div className={styles.status}>
              {property.status === 'sale' ? 'For Sale' : 'For Rent'}
            </div>
          </div>
        </div>

        <div className={styles.imageGallery}>
          <div className={styles.mainImage}>
            <Image
              src={property.images[currentImageIndex]}
              alt={property.title}
              fill
              className={styles.image}
              priority
            />
            {property.images.length > 1 && (
              <>
                <button
                  className={`${styles.navButton} ${styles.prevButton}`}
                  onClick={prevImage}
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  className={`${styles.navButton} ${styles.nextButton}`}
                  onClick={nextImage}
                  aria-label="Next image"
                >
                  <ChevronRight size={24} />
                </button>
                <div className={styles.imageIndicator}>
                  {currentImageIndex + 1} / {property.images.length}
                </div>
              </>
            )}
          </div>

          {property.images.length > 1 && (
            <div className={styles.thumbnails}>
              {property.images.map((image, index) => (
                <button
                  key={index}
                  className={`${styles.thumbnail} ${index === currentImageIndex ? styles.active : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                  aria-label={`View image ${index + 1}`}
                >
                  <Image
                    src={image}
                    alt={`${property.title} - Image ${index + 1}`}
                    fill
                    className={styles.thumbnailImage}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className={styles.content}>
          <div className={styles.mainContent}>
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Property Description</h2>
              <p className={styles.description}>
                {property.description || 'No description available for this property.'}
              </p>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Property Details</h2>
              <div className={styles.detailsGrid}>
                <div className={styles.detailItem}>
                  <Bed size={24} />
                  <div>
                    <div className={styles.detailLabel}>Bedrooms</div>
                    <div className={styles.detailValue}>{property.bedrooms}</div>
                  </div>
                </div>
                <div className={styles.detailItem}>
                  <Bath size={24} />
                  <div>
                    <div className={styles.detailLabel}>Bathrooms</div>
                    <div className={styles.detailValue}>{property.bathrooms}</div>
                  </div>
                </div>
                <div className={styles.detailItem}>
                  <Maximize2 size={24} />
                  <div>
                    <div className={styles.detailLabel}>Area</div>
                    <div className={styles.detailValue}>{property.area} {property.areaUnit}</div>
                  </div>
                </div>
                <div className={styles.detailItem}>
                  <Calendar size={24} />
                  <div>
                    <div className={styles.detailLabel}>Status</div>
                    <div className={styles.detailValue}>
                      {property.status === 'sale' ? 'For Sale' : 'For Rent'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {property.amenities && property.amenities.length > 0 && (
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Amenities</h2>
                <div className={styles.amenitiesGrid}>
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className={styles.amenityItem}>
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className={styles.sidebar}>
            <div className={styles.contactCard}>
              <h3 className={styles.contactTitle}>Interested in this property?</h3>
              <p className={styles.contactText}>Contact us to schedule a viewing or get more information.</p>
              
              <a href="tel:+919910384484" className={styles.contactButton}>
                <Phone size={20} />
                Call Now
              </a>
              
              <a href="https://wa.me/919910384484?text=Hi, I'm interested in the property: ${encodeURIComponent(property.title)}" target="_blank" rel="noopener noreferrer" className={styles.contactButton}>
                <MessageCircle size={20} />
                WhatsApp
              </a>
              
              <a href="mailto:sulabh.hr@gmail.com?subject=Interest in property: ${encodeURIComponent(property.title)}" className={styles.contactButton}>
                <Mail size={20} />
                Send Email
              </a>

              <div className={styles.contactInfo}>
                <div className={styles.contactItem}>
                  <Phone size={18} />
                  <span>+91 99103 84484</span>
                </div>
                <div className={styles.contactItem}>
                  <Mail size={18} />
                  <span>sulabh.hr@gmail.com</span>
                </div>
              </div>
            </div>

            {property.featured && (
              <div className={styles.featuredCard}>
                <div className={styles.featuredBadge}>Featured Property</div>
                <p className={styles.featuredText}>
                  This is a premium listing with exclusive features and prime location.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
