import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-lg">
        <h1 className="card-title text-center text-primary mb-4">Privacy Policy - CineNiche</h1>

        <p className="mb-4">
          Welcome to CineNiche! Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal data in compliance with the General Data Protection Regulation (GDPR).
        </p>

        <h2 className="h4 font-weight-bold mb-3">1. Who We Are</h2>
        <p className="mb-4">
          CineNiche is an up-and-coming movie streaming company dedicated to delivering curated, hard-to-find content. Our catalog spans cult classics, international cinema, indie films, and niche documentaries.
        </p>

        <h2 className="h4 font-weight-bold mb-3">2. What Data We Collect</h2>
        <p className="mb-4">We collect the following personal data to provide you with our services:</p>
        <ul className="list-unstyled ml-4 mb-4">
          <li>• Name and contact details (email address, phone number)</li>
          <li>• Payment information (processed securely through our payment provider)</li>
          <li>• Device and usage data (app activity, streaming history)</li>
          <li>• Cookies and tracking technologies for app and website optimization</li>
        </ul>

        <h2 className="h4 font-weight-bold mb-3">3. Why We Collect Your Data</h2>
        <ul className="list-unstyled ml-4 mb-4">
          <li>• To provide and improve our streaming services</li>
          <li>• To personalize your content recommendations</li>
          <li>• To process your payments securely</li>
          <li>• To comply with legal obligations</li>
          <li>• To send you updates, offers, and service-related notifications</li>
        </ul>

        <h2 className="h4 font-weight-bold mb-3">4. Your Rights</h2>
        <p className="mb-4">Under the GDPR, you have the following rights:</p>
        <ul className="list-unstyled ml-4 mb-4">
          <li>• Right to access your personal data</li>
          <li>• Right to correct inaccurate data</li>
          <li>• Right to request data deletion</li>
          <li>• Right to restrict processing</li>
          <li>• Right to data portability</li>
          <li>• Right to object to data processing</li>
        </ul>

        <h2 className="h4 font-weight-bold mb-3">5. Data Security</h2>
        <p className="mb-4">
          We implement robust security measures to protect your data from unauthorized access, alteration, disclosure, or destruction.
        </p>

        <h2 className="h4 font-weight-bold mb-3">6. Data Retention</h2>
        <p className="mb-4">
          We retain your personal data only as long as necessary to provide our services and comply with legal obligations.
        </p>

        <h2 className="h4 font-weight-bold mb-3">7. Third-Party Services</h2>
        <p className="mb-4">
          We may use trusted third-party services for payment processing, analytics, and marketing. These providers are contractually obligated to protect your data.
        </p>

        <h2 className="h4 font-weight-bold mb-3">8. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about this Privacy Policy or your personal data, please contact us at <a href="mailto:privacy@cineniche.com" className="text-primary">privacy@cineniche.com</a>.
        </p>

        <p className="mt-6 text-muted text-center">
          This policy was last updated on April 7, 2025.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

