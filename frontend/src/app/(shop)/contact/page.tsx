'use client';

import { useState } from 'react';
import { Mail, Phone, MessageCircle, MapPin, Send } from 'lucide-react';
import { CONTACT_INFO } from '@/lib/constants';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus(''), 3000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('error');
    }
  };

  return (
    <main className="bg-gradient-to-b from-white via-gray-50 to-white min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-20 max-w-5xl mx-auto">
          <span className="inline-block px-4 py-1.5 bg-[#2C5326]/10 text-[#2C5326] rounded-full text-sm font-medium mb-6 tracking-wide">
            EST. 2020
          </span>
          <h1 className="text-5xl md:text-6xl font-normal text-gray-900 mb-10 tracking-tight" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif' }}>
            About Lamafrican
          </h1>
          <div className="text-xl md:text-2xl text-gray-600 leading-relaxed font-normal" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif' }}>
            <p>
              For over five years, Lamafrican Fashion has been redefining African elegance through the marriage of traditional craftsmanship and contemporary design. Our experience in bespoke tailoring and custom design has been shaped by thousands of creations, each one a unique conversation between our master artisans and our clients. From carefully selected premium Ankara fabrics to the final stitch, every garment undergoes meticulous attention to detail. Whether you seek a flowing maxi dress, a statement bomber jacket, or a perfectly tailored shirt, our atelier at Westfield Mall Lavington brings decades of combined expertise to every piece, creating not just clothing, but confidence and timeless sophistication.
            </p>
          </div>
        </div>

        <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#2C5326] to-transparent mx-auto mb-20"></div>

        <div className="grid lg:grid-cols-5 gap-12 mb-20">
          
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="text-3xl font-normal text-gray-900 mb-8" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif' }}>Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="group">
                  <div className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-gray-100 hover:border-[#2C5326]/20 transition-all duration-300 hover:shadow-lg">
                    <div className="w-12 h-12 rounded-full bg-[#2C5326]/5 flex items-center justify-center flex-shrink-0 group-hover:bg-[#2C5326]/10 transition-colors">
                      <MapPin className="w-5 h-5 text-[#2C5326]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2 text-sm uppercase tracking-wider">Atelier Location</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Westfield Mall Lavington<br />
                        Gitanga Road, Lavington<br />
                        Nairobi, Kenya
                      </p>
                    </div>
                  </div>
                </div>

                <a href={`mailto:${CONTACT_INFO.email}`} className="block group">
                  <div className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-gray-100 hover:border-[#2C5326]/20 transition-all duration-300 hover:shadow-lg">
                    <div className="w-12 h-12 rounded-full bg-[#2C5326]/5 flex items-center justify-center flex-shrink-0 group-hover:bg-[#2C5326]/10 transition-colors">
                      <Mail className="w-5 h-5 text-[#2C5326]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2 text-sm uppercase tracking-wider">Email</h3>
                      <p className="text-gray-600">{CONTACT_INFO.email}</p>
                    </div>
                  </div>
                </a>

                <div className="group">
                  <div className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-gray-100 hover:border-[#2C5326]/20 transition-all duration-300 hover:shadow-lg">
                    <div className="w-12 h-12 rounded-full bg-[#2C5326]/5 flex items-center justify-center flex-shrink-0 group-hover:bg-[#2C5326]/10 transition-colors">
                      <Phone className="w-5 h-5 text-[#2C5326]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2 text-sm uppercase tracking-wider">Phone</h3>
                      <p className="text-gray-600">
                        <a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-[#2C5326] transition-colors block">
                          {CONTACT_INFO.phone}
                        </a>
                        <a href={`tel:${CONTACT_INFO.alternatePhone}`} className="hover:text-[#2C5326] transition-colors block">
                          {CONTACT_INFO.alternatePhone}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                <a 
                  href={`https://wa.me/${CONTACT_INFO.whatsapp.replace(/\+/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <div className="flex items-start gap-4 p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 hover:border-green-200 transition-all duration-300 hover:shadow-lg">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 group-hover:bg-green-200 transition-colors">
                      <MessageCircle className="w-5 h-5 text-green-700" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2 text-sm uppercase tracking-wider">WhatsApp Orders</h3>
                      <p className="text-gray-600">{CONTACT_INFO.whatsapp}</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-xl">
              <h2 className="text-3xl font-normal text-gray-900 mb-2" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif' }}>Send a Message</h2>
              <p className="text-gray-500 mb-8">We'll respond within 24 hours</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-3 uppercase tracking-wider">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:border-[#2C5326] focus:ring-2 focus:ring-[#2C5326]/10 outline-none transition-all bg-gray-50 focus:bg-white"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-3 uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:border-[#2C5326] focus:ring-2 focus:ring-[#2C5326]/10 outline-none transition-all bg-gray-50 focus:bg-white"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-3 uppercase tracking-wider">Your Message</label>
                  <textarea
                    rows={7}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:border-[#2C5326] focus:ring-2 focus:ring-[#2C5326]/10 outline-none transition-all resize-none bg-gray-50 focus:bg-white"
                    placeholder="Tell us about your project or inquiry..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full bg-[#2C5326] text-white py-5 rounded-xl font-medium hover:bg-[#1f3d1c] transition-all shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center gap-3 text-lg"
                >
                  {status === 'sending' ? (
                    'Sending...'
                  ) : status === 'success' ? (
                    '✓ Message Sent Successfully'
                  ) : status === 'error' ? (
                    '✗ Failed to send. Try again.'
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#2C5326] via-[#3d6e33] to-[#2C5326] p-16 text-center text-white">
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
          <div className="relative z-10">
            <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-6 tracking-wide">
              BESPOKE SERVICES
            </span>
            <h2 className="text-4xl md:text-5xl font-normal mb-4" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif' }}>Custom Tailoring</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto font-normal">
              Experience the art of personalized craftsmanship. Visit our atelier at Westfield Mall Lavington for a consultation.
            </p>
            <a
              href={`https://wa.me/${CONTACT_INFO.whatsapp.replace(/\+/g, '')}?text=Hi! I'm interested in bespoke tailoring services`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white text-[#2C5326] px-10 py-5 rounded-xl font-medium hover:bg-gray-50 transform hover:scale-105 transition-all shadow-2xl text-lg"
            >
              <MessageCircle className="w-6 h-6" />
              Book Consultation
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
