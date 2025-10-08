'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Upload, User } from 'lucide-react';

export default function CustomOrderPage() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '',
    neck: '', overBust: '', bust: '', underBust: '', waist: '', hips: '',
    neckToHeel: '', neckToAboveKnee: '', aboveKneeToAnkle: '',
    armLength: '', shoulderSeam: '', armHole: '', bicep: '', foreArm: '', wrist: '',
    vNeckCut: '', shoulderToWaist: '', waistToAboveKnee: '',
    preferredMaterial: '', customRequest: '',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    try {
      const response = await fetch('/api/custom-orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          measurements: {
            neck: formData.neck,
            overBust: formData.overBust,
            bust: formData.bust,
            underBust: formData.underBust,
            waist: formData.waist,
            hips: formData.hips,
            neckToHeel: formData.neckToHeel,
            neckToAboveKnee: formData.neckToAboveKnee,
            aboveKneeToAnkle: formData.aboveKneeToAnkle,
            armLength: formData.armLength,
            shoulderSeam: formData.shoulderSeam,
            armHole: formData.armHole,
            bicep: formData.bicep,
            foreArm: formData.foreArm,
            wrist: formData.wrist,
            vNeckCut: formData.vNeckCut,
            shoulderToWaist: formData.shoulderToWaist,
            waistToAboveKnee: formData.waistToAboveKnee,
          },
          designPreferences: formData.customRequest,
          fabricChoice: formData.preferredMaterial,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setSubmitMessage('✅ Order submitted successfully! We will contact you soon.');
        setFormData({
          name: '', email: '', phone: '',
          neck: '', overBust: '', bust: '', underBust: '', waist: '', hips: '',
          neckToHeel: '', neckToAboveKnee: '', aboveKneeToAnkle: '',
          armLength: '', shoulderSeam: '', armHole: '', bicep: '', foreArm: '', wrist: '',
          vNeckCut: '', shoulderToWaist: '', waistToAboveKnee: '',
          preferredMaterial: '', customRequest: '',
        });
        setImageFile(null);
      } else {
        setSubmitMessage('❌ Failed to submit. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setSubmitMessage('❌ Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-screen pt-8 md:pt-12 pb-16 md:pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#2C5326] mb-4 md:mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>

        {/* Title + horizontal illustration */}
        <header className="mb-6 md:mb-10">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
            Custom Order
          </h1>

          {/* Horizontal banner illustration */}
          <div className="relative w-full overflow-hidden rounded-xl border border-gray-200 bg-white mb-4 md:mb-6">
            <div className="relative w-full aspect-[16/9] md:aspect-[21/9]">
              <Image
                src="/images/measurement-guide.png"
                alt="Measurement Guide"
                fill
                className="object-contain md:object-cover"
                priority
              />
            </div>
          </div>

          {/* Measurement Tips Section */}
          <section className="bg-gray-50 border border-gray-200 rounded-xl p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">Measurement Tips</h2>
            <ol className="list-decimal pl-5 space-y-2 text-gray-700 text-sm md:text-base">
              <li>Use a flexible measuring tape</li>
              <li>Measure over light clothing or undergarments</li>
              <li>Keep the tape snug but not tight</li>
              <li>Stand straight with arms relaxed</li>
              <li>Record in centimeters (cm)</li>
              <li>Get help for accuracy</li>
            </ol>
          </section>
        </header>

        {/* Centered Order Form */}
        <section className="max-w-3xl mx-auto bg-white p-5 md:p-7 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <User className="w-7 h-7 text-[#2C5326]" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Order Form</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 border-b pb-2">
                Personal Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5326] focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5326] focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5326] focus:border-transparent"
                    placeholder="+254 712 345 678"
                  />
                </div>
              </div>
            </div>

            {/* Body Measurements */}
            <div className="space-y-4">
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 border-b pb-2">
                Body Measurements (cm)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  ['Neck', 'neck'],
                  ['Over Bust', 'overBust'],
                  ['Bust', 'bust'],
                  ['Under Bust', 'underBust'],
                  ['Waist', 'waist'],
                  ['Hips', 'hips'],
                ].map(([label, name]) => (
                  <div key={name}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                    <input
                      type="number"
                      name={name}
                      value={(formData as any)[name]}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5326] focus:border-transparent"
                      placeholder="cm"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Length Measurements */}
            <div className="space-y-4">
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 border-b pb-2">
                Length Measurements (cm)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  ['Neck to Heel', 'neckToHeel'],
                  ['Neck to Above Knee', 'neckToAboveKnee'],
                  ['Above Knee to Ankle', 'aboveKneeToAnkle'],
                  ['Shoulder to Waist', 'shoulderToWaist'],
                  ['Waist to Above Knee', 'waistToAboveKnee'],
                ].map(([label, name]) => (
                  <div key={name}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                    <input
                      type="number"
                      name={name}
                      value={(formData as any)[name]}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5326] focus:border-transparent"
                      placeholder="cm"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Arm Measurements */}
            <div className="space-y-4">
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 border-b pb-2">
                Arm Measurements (cm)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  ['Arm Length', 'armLength'],
                  ['Shoulder Seam', 'shoulderSeam'],
                  ['Arm Hole', 'armHole'],
                  ['Bicep', 'bicep'],
                  ['Fore Arm', 'foreArm'],
                  ['Wrist', 'wrist'],
                  ['V Neck Cut', 'vNeckCut'],
                ].map(([label, name]) => (
                  <div key={name}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                    <input
                      type="number"
                      name={name}
                      value={(formData as any)[name]}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5326] focus:border-transparent"
                      placeholder="cm"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Design Preferences */}
            <div className="space-y-4">
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 border-b pb-2">
                Design Preferences
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Material</label>
                  <input
                    type="text"
                    name="preferredMaterial"
                    value={formData.preferredMaterial}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5326] focus:border-transparent"
                    placeholder="e.g., Ankara, Kitenge, Cotton"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Custom Request</label>
                  <textarea
                    name="customRequest"
                    value={formData.customRequest}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5326] focus:border-transparent"
                    placeholder="Describe your design ideas, color preferences, style details, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Upload Reference Image</label>
                  <div className="mt-1 flex justify-center px-5 pt-4 pb-4 border-2 border-gray-300 border-dashed rounded-lg hover:border-[#2C5326] transition-colors">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-10 w-10 text-gray-400" />
                      <div className="flex text-sm text-gray-600 justify-center gap-1">
                        <label className="cursor-pointer bg-white rounded-md font-medium text-[#2C5326] hover:text-[#234219]">
                          <span>Upload a file</span>
                          <input type="file" accept="image/*" onChange={handleFileChange} className="sr-only" />
                        </label>
                        <span>or drag & drop</span>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      {imageFile && <p className="text-xs text-[#2C5326] mt-2">{imageFile.name}</p>}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#2C5326] text-white py-3.5 md:py-4 rounded-full hover:bg-[#234219] transition-all font-semibold text-base md:text-lg disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? 'Submitting...' : 'Send Custom Order'}
            </button>

            {/* Success/Error Message */}
            {submitMessage && (
              <div
                className={`${
                  submitMessage.includes('✅')
                    ? 'bg-green-50 border-green-200 text-green-800'
                    : 'bg-red-50 border-red-200 text-red-800'
                } border px-4 py-3 rounded-lg text-center`}
              >
                {submitMessage}
              </div>
            )}
          </form>
        </section>
      </div>
    </div>
  );
}
