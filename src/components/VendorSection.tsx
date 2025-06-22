
import React from 'react';
import { Store, TrendingUp, Users, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';

const VendorSection = () => {
  const benefits = [
    {
      icon: Store,
      title: 'Reach More Customers',
      description: 'Access thousands of businesses and consumers looking for energy solutions'
    },
    {
      icon: TrendingUp,
      title: 'Grow Your Sales',
      description: 'Increase revenue with our optimized marketplace and marketing tools'
    },
    {
      icon: Users,
      title: 'Expert Support',
      description: 'Get dedicated account management and technical assistance'
    },
    {
      icon: Headphones,
      title: '24/7 Platform Support',
      description: 'Round-the-clock help to keep your business running smoothly'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Partner With PowerGrid
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of energy solution providers reaching customers worldwide
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Benefits */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Why Sell on PowerGrid?
              </h3>
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {benefit.title}
                      </h4>
                      <p className="text-gray-600">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - CTA */}
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-500 rounded-full mx-auto flex items-center justify-center">
                <Store className="w-10 h-10 text-white" />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Ready to Start Selling?
                </h3>
                <p className="text-gray-600 mb-6">
                  Join our marketplace and start reaching customers who need reliable energy solutions. Our streamlined onboarding process gets you selling in days, not weeks.
                </p>
              </div>

              <div className="space-y-4">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg">
                  Apply to Become a Vendor
                </Button>
                <Button variant="outline" className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white py-3">
                  Download Vendor Guide
                </Button>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Already a vendor? <a href="#" className="text-blue-600 font-medium">Sign in to your dashboard</a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-white rounded-xl p-8 shadow-lg">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
              <div className="text-gray-600">Active Vendors</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">50K+</div>
              <div className="text-gray-600">Products Listed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">$2M+</div>
              <div className="text-gray-600">Monthly Sales</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">95%</div>
              <div className="text-gray-600">Vendor Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VendorSection;
