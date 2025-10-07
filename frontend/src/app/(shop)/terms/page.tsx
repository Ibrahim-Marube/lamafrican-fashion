import { Mail, Phone } from 'lucide-react';
import { CONTACT_INFO } from '@/lib/constants';

export default function TermsPage() {
  return (
    <main className="bg-white min-h-screen pt-28 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Terms of Service</h1>
        <p className="text-gray-600 mb-8">Last Updated: October 6, 2025</p>

        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Agreement to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing or using Lamafrican Fashion's website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site. These terms apply to all visitors, users, and customers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Products and Services</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Lamafrican Fashion offers handcrafted African fashion products including clothing, accessories, and custom-made items. We reserve the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Modify or discontinue products without prior notice</li>
              <li>Limit quantities of any products or services</li>
              <li>Refuse service to anyone for any reason at any time</li>
              <li>Update product descriptions, prices, and availability</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              Product colors may vary slightly from images due to screen settings and photography lighting. All products are handcrafted, so minor variations in design are normal and part of their authentic charm.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ordering and Payment</h2>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Orders</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              When you place an order, you agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Provide accurate and complete information</li>
              <li>Authorize us to charge your payment method</li>
              <li>Accept responsibility for all charges incurred</li>
              <li>Receive order confirmation via email or WhatsApp</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Payment Methods</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We accept:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>M-Pesa mobile money payments</li>
              <li>Credit and debit cards (Visa, Mastercard)</li>
              <li>WhatsApp orders with payment arrangements</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              All payments are processed securely. We do not store your complete payment card information on our servers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Pricing</h2>
            <p className="text-gray-700 leading-relaxed">
              All prices are listed in Kenyan Shillings (KSh) and are subject to change without notice. We make every effort to ensure pricing accuracy, but errors may occur. If a product is listed at an incorrect price, we reserve the right to cancel or refuse any orders placed at that price. Prices include applicable taxes unless otherwise stated. Shipping and delivery fees are calculated at checkout.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Shipping and Delivery</h2>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Delivery Timeline</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Standard delivery times within Kenya:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Nairobi and major cities: 2-5 business days</li>
              <li>Other areas: 5-10 business days</li>
              <li>Custom orders: 2-4 weeks depending on complexity</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Responsibilities</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              You are responsible for:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Providing accurate delivery address and contact information</li>
              <li>Being available to receive deliveries during business hours</li>
              <li>Additional charges for failed delivery attempts due to incorrect information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Returns and Exchanges</h2>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Return Policy</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We accept returns within 7 days of delivery if:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Product is defective or damaged upon arrival</li>
              <li>Wrong item was delivered</li>
              <li>Product differs significantly from description</li>
              <li>Item is unworn, unwashed, and in original condition with tags</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Non-Returnable Items</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Custom-made or personalized items</li>
              <li>Sale or clearance items</li>
              <li>Items without original tags or packaging</li>
              <li>Used, worn, or altered products</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Return Process</h3>
            <p className="text-gray-700 leading-relaxed">
              Contact us at {CONTACT_INFO.email} or {CONTACT_INFO.whatsapp} within 7 days of delivery to initiate a return. Include your order number, reason for return, and photos if applicable. Return shipping costs are the customer's responsibility unless the item is defective.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Custom Orders</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Custom orders require:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>50% deposit before production begins</li>
              <li>Full payment before delivery</li>
              <li>2-4 weeks production time</li>
              <li>Accurate measurements and specifications</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              Custom orders are non-refundable once production has started. Minor adjustments can be made within 7 days of delivery at no extra charge.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property</h2>
            <p className="text-gray-700 leading-relaxed">
              All content on this website including text, graphics, logos, images, designs, and product photos are the property of Lamafrican Fashion and are protected by Kenyan and international copyright laws. You may not reproduce, distribute, modify, or create derivative works without our explicit written permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">User Conduct</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You agree not to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Use the website for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Submit false or misleading information</li>
              <li>Harass, threaten, or harm others</li>
              <li>Upload viruses or malicious code</li>
              <li>Scrape, copy, or duplicate website content</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              To the maximum extent permitted by law, Lamafrican Fashion shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our website or products. Our total liability for any claim arising from these terms or your purchase shall not exceed the amount you paid for the product in question.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Warranty Disclaimer</h2>
            <p className="text-gray-700 leading-relaxed">
              Products are sold "as is" without any warranties, express or implied, except those that cannot be excluded under Kenyan law. We do not guarantee that products will be error-free, secure, or uninterrupted. While we take care to ensure quality, natural variations in handcrafted items are not considered defects.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms of Service are governed by and construed in accordance with the laws of Kenya. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of Kenyan courts.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to the website with an updated "Last Updated" date. Your continued use of the website after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              For questions about these Terms of Service, please contact us:
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
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-green-600" />
                <a href={`https://wa.me/${CONTACT_INFO.whatsapp.replace(/\+/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-green-600 font-semibold hover:underline">
                  WhatsApp: {CONTACT_INFO.whatsapp}
                </a>
              </div>
              <p className="text-gray-700 mt-4">
                <strong>Business Name:</strong> Lamafrican Fashion<br />
                <strong>Location:</strong> Nairobi, Kenya
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
