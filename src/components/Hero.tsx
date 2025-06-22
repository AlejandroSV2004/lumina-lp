
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield } from 'lucide-react';

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Power Through Any{' '}
                <span className="text-blue-600">Blackout</span>.{' '}
                <span className="text-green-600">Stay Connected</span> Anytime.
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Explore energy solutions trusted during nationwide outages. From power banks to diesel generators, we connect you with verified vendors for all your energy needs.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-lg transition-all hover:scale-105">
                Shop Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-4 text-lg rounded-lg transition-all">
                Become a Vendor
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-8 pt-4">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-600">Verified Vendors</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-gray-600">Fast Delivery</span>
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-bold text-green-600">50,000+</span> Products
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl p-8 lg:p-12">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Power Banks</h3>
                  <p className="text-sm text-gray-600">Portable energy for devices</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow mt-8">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Generators</h3>
                  <p className="text-sm text-gray-600">Backup power solutions</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow -mt-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                    <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Solar Panels</h3>
                  <p className="text-sm text-gray-600">Renewable energy</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <div className="w-6 h-6 bg-purple-500 rounded"></div>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Batteries</h3>
                  <p className="text-sm text-gray-600">Energy storage</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
