'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Upload, Ruler, User } from 'lucide-react';

export default function CustomOrderPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    neck: '',
    overBust: '',
    bust: '',
    underBust: '',
    waist: '',
    hips: '',
    neckToHeel: '',
    neckToAboveKnee: '',
    aboveKneeToAnkle: '',
    armLength: '',
    shoulderSeam: '',
    armHole: '',
    bicep: '',
    foreArm: '',
    wrist: '',
    vNeckCut: '',
    shoulderToWaist: '',
    waistToAboveKnee: '',
    preferredMaterial: '',
    customRequest: '',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage('✅ Order submitted successfully! We will contact you soon.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        neck: '',
        overBust: '',
        bust: '',
        underBust: '',
        waist: '',
        hips: '',
        neckToHeel: '',
        neckToAboveKnee: '',
        aboveKneeToAnkle: '',
        armLength: '',
        shoulderSeam: '',
        armHole: '',
        bicep: '',
        foreArm: '',
        wrist: '',
        vNeckCut: '',
        shoulderToWaist: '',
        waistToAboveKnee: '',
        preferredMaterial: '',
        customRequest: '',
      });
      setImageFile(null);
    }, 2000);
  };

  return (
    <div className="bg-white min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#2C5326] mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Custom Order</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get a perfectly fitted garment tailored just for you. Fill in your measurements below and we'll create your dream outfit.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* LEFT: How to Measure Guide */}
          <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-100 sticky top-24 h-fit">
            <div className="flex items-center gap-3 mb-6">
              <Ruler className="w-8 h-8 text-[#2C5326]" />
              <h2 className="text-3xl font-bold text-gray-900">How to Measure</h2>
            </div>

            <div className="space-y-6">
              {/* Measurement Guide Image */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-100">
                <div className="relative w-full h-[500px] bg-white rounded-lg overflow-hidden shadow-inner">
                  <Image
                    src="/images/measurement-guide.png"
                    alt="How to take accurate body measurements for custom clothing"
                    fill
                    className="object-contain p-4"
                    priority
                  />
                </div>
                <p className="text-sm text-gray-600 text-center mt-4 font-medium">
                  Follow the numbered measurement points shown above
                </p>
              </div>

              {/* Measurement Tips */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-gray-900">Measurement Tips:</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex gap-3">
                    <span className="text-[#2C5326] font-bold">1.</span>
                    <span>Use a flexible measuring tape</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#2C5326] font-bold">2.</span>
                    <span>Measure over light clothing or undergarments</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#2C5326] font-bold">3.</span>
                    <span>Keep the tape snug but not tight</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#2C5326] font-bold">4.</span>
                    <span>Stand straight with arms relaxed</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#2C5326] font-bold">5.</span>
                    <span>Take measurements in centimeters (cm)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#2C5326] font-bold">6.</span>
                    <span>Have someone help you for accuracy</span>
                  </li>
                </ul>
              </div>

              {/* Video Tutorial Placeholder */}
              <div className="bg-[#2C5326] text-white p-6 rounded-xl">
                <h3 className="font-semibold text-lg mb-2">Need Help?</h3>
                <p className="text-sm mb-4">
                  Watch our video tutorial on how to take accurate measurements.
                </p>
                <button className="bg-white text-[#2C5326] px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-all">
                  Watch Tutorial
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Order Form */}
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-8 h-8 text-[#2C5326]" />
              <h2 className="text-3xl font-bold text-gray-900">Fill The Form Below</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 border-b pb-2">Personal Information</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5326] focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5326] focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5326] focus:border-transparent"
                    placeholder="+254 712 345 678"
                  />
                </div>
              </div>

              {/* Body Measurements */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 border-b pb-2">Body Measurements (cm)</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Neck</label>
                    <input
                      type="number"
                      name="neck"
                      value={formData.neck}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5326] focus:border-transparent"
                      placeholder="cm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Over Bust</label>
                    <input
                      type="number"
                      name="overBust"
                      value={formData.overBust}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5326] focus:border-transparent"
                      placeholder="cm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bust</label>
                    <input
                      type="number"
                      name="bust"
                      value={formData.bust}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5326] focus:border-transparent"
                      placeholder="cm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Under Bust</label>
                    <input
                      type="number"
                      name="underBust"
                      value={formData.underBust}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5326] focus:border-transparent"
                      placeholder="cm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Waist</label>
                    <input
                      type="number"
                      name="waist"
                      value={formData.waist}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5326] focus:border-transparent"
                      placeholder="cm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hips</label>
                    <input
                      type="number"
                      name="hips"
                      value={formData.hips}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5326] focus:border-transparent"
                      placeholder="cm"
                    />
                  </div>
                </div>
              </div>

              {/* Length Measurements */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 border-b pb-2">Length Measurements (cm)</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Neck to Heel</label>
                    <input
                      type="number"
                      name="neckToHeel"
                      value={formData.neckToHeel}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5326] focus:border-transparent"
                      placeholder="cm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Neck to Above Knee</label>
                    <input
                      type="number"
                      name="neckToAboveKnee"
                      value={formData.neckToAboveKnee}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5326] focus:border-transparent"
                      placeholder="cm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Above Knee to Ankle</label>
                    <input
                      type="number"
                      name="aboveKneeToAnkle"
                      value={formData.aboveKneeToAnkle}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5326] focus:border-transparent"
                      placeholder="cm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Shoulder to Waist</label>
                    <input
                      type="number"
                      name="shoulderToWaist"
                      value={formData.shoulderToWaist}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5326] focus:border-transparent"
                      placeholder="cm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Waist to Above Knee</label>
                    <input
                      type="number"
                      name="waistToAboveKnee"
                      value={formData.waistToAboveKnee}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5326] focus:border-transparent"
                      placeholder="cm"
                    />
                  </div>
                </div>
              </div>

              {/* Arm Measurements */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 border-b pb-2">Arm Measurements (cm)</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Arm Length</label>
                    <input
                      type="number"
                      name="armLength"
                      value={formData.armLength}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5326] focus:border-transparent"
                      placeholder="cm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Shoulder Seam</label>
                    <input
                      type="number"
                      name="shoulderSeam"
                      value={formData.shoulderSeam}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5326] focus:border-transparent"
                      placeholder="cm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Arm Hole</label>
                    <input
                      type="number"
                      name="armHole"
                      value={formData.armHole}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5326] focus:border-transparent"
                      placeholder="cm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bicep</label>
                    <input
                      type="number"
                      name="bicep"
                      value={formData.bicep}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5326] focus:border-transparent"
                      placeholder="cm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Fore Arm</label>
                    <input
                      type="number"
                      name="foreArm"
                      value={formData.foreArm}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5326] focus:border-transparent"
                      placeholder="cm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Wrist</label>
                    <input
                      type="number"
                      name="wrist"
                      value={formData.wrist}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5326] focus:border-transparent"
                      placeholder="cm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">V Neck Cut</label>
                    <input
                      type="number"
                      name="vNeckCut"
                      value={formData.vNeckCut}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5326] focus:border-transparent"
                      placeholder="cm"
                    />
                  </div>
                </div>
              </div>

              {/* Preferences */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 border-b pb-2">Preferences</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Material</label>
                  <input
                    type="text"
                    name="preferredMaterial"
                    value={formData.preferredMaterial}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5326] focus:border-transparent"
                    placeholder="e.g., Ankara, Kitenge, Cotton"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Custom Request</label>
                  <textarea
                    name="customRequest"
                    value={formData.customRequest}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5326] focus:border-transparent"
                    placeholder="Describe your design ideas, color preferences, style details, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Reference Image</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-[#2C5326] transition-colors">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-[#2C5326] hover:text-[#234219]">
                          <span>Upload a file</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      {imageFile && (
                        <p className="text-sm text-[#2C5326] font-medium mt-2">
                          Selected: {imageFile.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#2C5326] text-white py-4 rounded-full hover:bg-[#234219] transition-all font-semibold text-lg disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'Submitting...' : 'Send Custom Order'}
              </button>

              {submitMessage && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-lg text-center">
                  {submitMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}