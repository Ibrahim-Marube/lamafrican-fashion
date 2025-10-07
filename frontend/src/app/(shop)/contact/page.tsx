'use client';
import { useState } from 'react';
import { Send, MapPin, Phone, Mail, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-[50vh] bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold tracking-tight text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-600 font-light">We'd love to hear from you</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-8">Visit Our Atelier</h2>
            
            <div className="group p-8 bg-gray-50 rounded-3xl hover:shadow-xl transition-all duration-300">
              <MapPin className="w-8 h-8 text-green-700 mb-4" />
              <h3 className="text-xl font-bold mb-2">Location</h3>
              <p className="text-gray-600 leading-relaxed">
                Westfield Mall Lavington<br />
                Gitanga Road, Lavington<br />
                Nairobi, Kenya
              </p>
            </div>

            <div className="group p-8 bg-gray-50 rounded-3xl hover:shadow-xl transition-all duration-300">
              <Phone className="w-8 h-8 text-green-700 mb-4" />
              <h3 className="text-xl font-bold mb-2">Phone</h3>
              <a href="tel:+254703129084" className="text-gray-600 hover:text-green-700 block">+254 703 129 084</a>
              <a href="tel:+254724483229" className="text-gray-600 hover:text-green-700 block">+254 724 483 229</a>
            </div>

            <div className="group p-8 bg-gray-50 rounded-3xl hover:shadow-xl transition-all duration-300">
              <Mail className="w-8 h-8 text-green-700 mb-4" />
              <h3 className="text-xl font-bold mb-2">Email</h3>
              <a href="mailto:lamafricanfashion@gmail.com" className="text-gray-600 hover:text-green-700">
                lamafricanfashion@gmail.com
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-8">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-6 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-green-700 transition-all"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-6 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-green-700 transition-all"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-6 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-green-700 transition-all"
              />
              <input
                type="text"
                placeholder="Subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-6 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-green-700 transition-all"
              />
              <textarea
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={6}
                className="w-full px-6 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-green-700 transition-all resize-none"
              />
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-green-700 text-white py-4 rounded-full font-medium hover:bg-green-800 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {status === 'success' ? (
                  <><CheckCircle className="w-5 h-5" /> Sent Successfully!</>
                ) : status === 'sending' ? (
                  'Sending...'
                ) : (
                  <><Send className="w-5 h-5" /> Send Message</>
                )}
              </button>
              {status === 'error' && (
                <p className="text-red-600 text-center">Failed to send. Please try again.</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
