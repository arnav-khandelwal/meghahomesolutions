import PropertyCard from '@/components/PropertyCard/PropertyCard';
import { properties } from '@/data/properties';
import styles from './page.module.scss';

export default function PropertiesPage() {
  return (
    <div className={styles.propertiesPage}>
      <div className={styles.header}>
        <h1 className={styles.title}>Explore Properties</h1>
        <p className={styles.subtitle}>
          Discover premium properties in Ghaziabad, Noida, and NCR. Find your perfect home with our exclusive listings.
        </p>
      </div>

      <div className={styles.grid}>
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}
