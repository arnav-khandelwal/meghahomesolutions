'use client';
import { useState } from 'react';
import { Lock, Home, CheckCircle } from 'lucide-react';
import styles from './LeadCaptureForm.module.scss';

interface LeadCaptureFormProps {
  onSubmit: (data: { name: string; email: string; phone: string; propertyName?: string }) => void;
  isLoading?: boolean;
  propertyName?: string;
}

export default function LeadCaptureForm({ onSubmit, isLoading = false, propertyName }: LeadCaptureFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else {
      const cleanPhone = formData.phone.replace(/\D/g, '');
      if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
        newErrors.phone = 'Invalid Indian phone number (must start with 6-9 and have 10 digits)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit({ ...formData, propertyName });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formCard}>
        <div className={styles.iconWrapper}>
          <Lock size={32} />
        </div>
        
        <h2 className={styles.title}>Before You View Details</h2>
        
        <p className={styles.subtitle}>
          Let us help you find your best home. Get exclusive access to property videos, detailed floor plans, and schedule personalized viewings.
        </p>

        <div className={styles.benefits}>
          <div className={styles.benefit}>
            <CheckCircle size={18} />
            <span>Exclusive property videos</span>
          </div>
          <div className={styles.benefit}>
            <CheckCircle size={18} />
            <span>Detailed floor plans</span>
          </div>
          <div className={styles.benefit}>
            <CheckCircle size={18} />
            <span>Personalized assistance</span>
          </div>
          <div className={styles.benefit}>
            <CheckCircle size={18} />
            <span>Schedule viewings</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={`${styles.input} ${errors.name ? styles.error : ''}`}
            />
            {errors.name && <span className={styles.errorMessage}>{errors.name}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={`${styles.input} ${errors.email ? styles.error : ''}`}
            />
            {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone" className={styles.label}>Phone Number *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your 10-digit phone number"
              className={`${styles.input} ${errors.phone ? styles.error : ''}`}
            />
            {errors.phone && <span className={styles.errorMessage}>{errors.phone}</span>}
          </div>

          <button type="submit" className={styles.submitButton} disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'View Property Details'}
            {!isLoading && <Home size={18} />}
          </button>
        </form>

        <p className={styles.privacyNote}>
          Your information is secure and will only be used to help you find your perfect property.
        </p>
      </div>
    </div>
  );
}
