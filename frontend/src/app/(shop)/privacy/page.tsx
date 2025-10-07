import { Mail, Phone } from 'lucide-react';
import { CONTACT_INFO } from '@/lib/constants';

export default function PrivacyPage() {
  return (
    <main className="bg-white min-h-screen pt-28 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
        <p className="text-gray-600 mb-8">Last Updated: October 6, 2025</p>

        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              At Lamafrican Fashion, we are committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, store, and protect your data when you visit our website or purchase our products. By using our services, you agree to the practices described in this policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Information</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              When you place an order or create an account, we collect:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Delivery address</li>
              <li>Payment information (processed securely through M-Pesa and card processors)</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Automatic Information</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              When you visit our website, we automatically collect:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>IP address and location data</li>
              <li>Browser type and device information</li>
              <li>Pages visited and time spent on our site</li>
              <li>Referring website or search terms</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use your personal information to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Process and fulfill your orders</li>
              <li>Communicate with you about your purchases via email, SMS, or WhatsApp</li>
              <li>Provide customer support and respond to inquiries</li>
              <li>Send promotional offers and marketing communications (you can opt-out anytime)</li>
              <li>Improve our website and customize your shopping experience</li>
              <li>Prevent fraud and ensure transaction security</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Sharing and Third Parties</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may share your information with trusted third parties who help us operate our business:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Payment Processors:</strong> M-Pesa, Safaricom, and card payment services to process transactions</li>
              <li><strong>Delivery Services:</strong> Courier companies to deliver your orders</li>
              <li><strong>Communication Tools:</strong> Email and WhatsApp services for order updates</li>
              <li><strong>Analytics:</strong> Google Analytics to understand website usage</li>
              <li><strong>Social Media:</strong> Instagram, Facebook, TikTok for marketing purposes</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              <strong>We never sell your personal information to third parties.</strong> All partners are required to protect your data and use it only for specified purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Under the Kenyan Data Protection Act, you have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Access:</strong> Request a copy of the personal data we hold about you</li>
              <li><strong>Correction:</strong> Ask us to correct inaccurate or incomplete information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal data (subject to legal obligations)</li>
              <li><strong>Opt-Out:</strong> Unsubscribe from marketing emails or SMS at any time</li>
              <li><strong>Data Portability:</strong> Request your data in a machine-readable format</li>
              <li><strong>Withdraw Consent:</strong> Withdraw consent for data processing at any time</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              To exercise any of these rights, contact us at {CONTACT_INFO.email} or {CONTACT_INFO.phone}.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
            <p className="text-gray-700 leading-relaxed">
              We take the security of your personal information seriously. We implement appropriate technical and organizational measures including secure socket layer (SSL) encryption, secure payment gateways, access controls, and regular security audits to protect your data from unauthorized access, alteration, disclosure, or destruction. However, no internet transmission is completely secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our website uses cookies to enhance your browsing experience. Cookies are small text files stored on your device that help us:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Remember your preferences and shopping cart items</li>
              <li>Understand how you use our website</li>
              <li>Provide personalized content and advertisements</li>
              <li>Analyze website traffic and performance</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              You can disable cookies in your browser settings, but this may affect website functionality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Retention</h2>
            <p className="text-gray-700 leading-relaxed">
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, resolve disputes, and enforce our agreements. Order history is typically retained for 7 years in accordance with Kenyan tax laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of significant changes by posting the updated policy on our website with a new "Last Updated" date. We encourage you to review this policy periodically.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions, concerns, or requests regarding this Privacy Policy or how we handle your personal information, please contact us:
            </p>
            <div className="bg-gray-50 rounded-xl p-6 space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#2C5326]" />
                <a href={`mailto:${CONTACT_INFO.email}`} className="text-[#2C5326] font-semibold hover:underline">
                  {CONTACT_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#2C5326]" />
                <div className="text-gray-700">
                  <a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-[#2C5326]">{CONTACT_INFO.phone}</a>
                  {' / '}
                  <a href={`tel:${CONTACT_INFO.alternatePhone}`} className="hover:text-[#2C5326]">{CONTACT_INFO.alternatePhone}</a>
                </div>
              </div>
              <p className="text-gray-700">
                <strong>Business Name:</strong> Lamafrican Fashion<br />
                <strong>Location:</strong> Nairobi, Kenya
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Compliance</h2>
            <p className="text-gray-700 leading-relaxed">
              This Privacy Policy complies with the Kenya Data Protection Act, 2019, and relevant international data protection regulations including GDPR where applicable to international customers.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
