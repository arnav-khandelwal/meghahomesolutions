import { properties } from '@/data/properties';
import { notFound } from 'next/navigation';
import PropertyDetail from '@/components/PropertyDetail/PropertyDetail';

interface PropertyPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { id } = await params;
  const property = properties.find((p) => p.id === id);

  if (!property) {
    notFound();
  }

  return <PropertyDetail property={property} />;
}

export async function generateStaticParams() {
  return properties.map((property) => ({
    id: property.id,
  }));
}
