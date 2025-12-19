import React, { useState, useEffect } from 'react';
import { Check, Star, Zap, Shield, Clock } from 'lucide-react';

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animatedPrices, setAnimatedPrices] = useState({
    starter: 49,
    professional: 149,
    enterprise: "Custom"
  });
  const [animatedText, setAnimatedText] = useState({
    starter: "per month",
    professional: "per month"
  });

  const animatePrice = (startPrice: number, endPrice: number, planKey: string) => {
    const duration = 800; // Animation duration in ms
    const steps = 20; // Number of steps
    const stepDuration = duration / steps;
    const priceStep = (endPrice - startPrice) / steps;
    
    let currentStep = 0;
    
    const timer = setInterval(() => {
      currentStep++;
      const currentPrice = Math.round(startPrice + (priceStep * currentStep));
      
      setAnimatedPrices(prev => ({
        ...prev,
        [planKey]: currentPrice
      }));
      
      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedPrices(prev => ({
          ...prev,
          [planKey]: endPrice
        }));
      }
    }, stepDuration);
  };

  const handleToggle = (annual: boolean) => {
    if (annual !== isAnnual) {
      setIsAnimating(true);
      
      // Animate the prices
      if (annual) {
        // Switching to annual (lower prices)
        animatePrice(49, 44, 'starter');
        animatePrice(149, 134, 'professional');
        // Animate text to annual
        setAnimatedText({
          starter: "per month (billed annually)",
          professional: "per month (billed annually)"
        });
      } else {
        // Switching to monthly (higher prices)
        animatePrice(44, 49, 'starter');
        animatePrice(134, 149, 'professional');
        // Animate text to monthly
        setAnimatedText({
          starter: "per month",
          professional: "per month"
        });
      }
      
      setTimeout(() => {
        setIsAnnual(annual);
        setTimeout(() => setIsAnimating(false), 800);
      }, 100);
    }
  };

  const plans = [
    {
      name: "Starter",
      price: `$${animatedPrices.starter}`,
      description: "Perfect for small retail stores",
      features: [
        "Up to 1,000 products",
        "1 store location",
        "Basic AI insights",
        "Email support",
        "Mobile app access",
        "Standard reporting"
      ],
      cta: "Get Started",
      highlighted: false,
      icon: Clock
    },
    {
      name: "Professional",
      price: `$${animatedPrices.professional}`,
      description: "For growing retail businesses",
      features: [
        "Up to 10,000 products",
        "5 store locations",
        "Advanced AI predictions",
        "Priority support",
        "Custom integrations",
        "Advanced analytics",
        "Automated reordering",
        "API access"
      ],
      cta: "Upgrade to Pro",
      highlighted: true,
      icon: Zap
    },
    {
      name: "Enterprise",
      price: animatedPrices.enterprise,
      description: "For large retail operations",
      features: [
        "Unlimited products",
        "Unlimited locations",
        "Full AI suite",
        "24/7 phone support",
        "Custom workflows",
        "Dedicated success manager",
        "White-label options",
        "Advanced security features",
        "Custom reporting",
        "Priority feature requests"
      ],
      cta: "Start with Enterprise",
      highlighted: false,
      icon: Shield
    }
  ];

  return (
    <div className="bg-slate-100 mt-14 relative overflow-hidden">
      {/* Big Glowing Balls */}
      <div className="absolute top-20 left-16 w-60 h-60 bg-sky-400/20 rounded-full blur-3xl animate-pulse delay-600"></div>
      <div className="absolute bottom-24 right-20 w-52 h-52 bg-lime-400/15 rounded-full blur-2xl animate-pulse delay-900"></div>
      <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-fuchsia-400/20 rounded-full blur-xl animate-pulse delay-1300"></div>
      <div className="absolute top-40 right-8 w-68 h-68 bg-orange-400/15 rounded-full blur-3xl animate-pulse delay-300"></div>
      <div className="absolute bottom-60 left-24 w-56 h-56 bg-teal-400/20 rounded-full blur-2xl animate-pulse delay-700"></div>
      <div className="absolute top-80 right-1/2 w-44 h-44 bg-rose-400/15 rounded-full blur-xl animate-pulse delay-1100"></div>
      <div className="absolute bottom-80 left-8 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-xs sm:max-w-2xl lg:max-w-3xl mx-auto mb-8 sm:mb-12 px-4 sm:px-0">
          <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            Trusted by 10,000+ retailers
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 mb-3 sm:mb-4 tracking-tight">
            Simple, transparent pricing
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 mb-4 sm:mb-6">
            Choose the plan that fits your business needs. No hidden fees, no surprises.
          </p>

          <div className="inline-flex items-center bg-white rounded-full p-1 shadow-sm border border-slate-200">
            <button
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${!isAnnual
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
                }`}
              onClick={() => handleToggle(false)}
            >
              Monthly
            </button>
            <button
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${isAnnual
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
                }`}
              onClick={() => handleToggle(true)}
            >
              Annual
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <div
                key={plan.name}
                className={`relative rounded-xl sm:rounded-2xl border bg-white ${plan.highlighted
                    ? 'border-blue-500/30 bg-gradient-to-br from-blue-50 to-white scale-[1.02] shadow-xl'
                    : 'border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md'
                  } p-4 sm:p-6 transition-all duration-500 ${
                    isAnimating ? 'transform scale-[1.01] shadow-lg' : 'transform scale-100'
                  }`}
              >
                {plan.highlighted && (
                  <>
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div className="relative">
                        <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-[2px]" />

                        <div className="relative px-4 py-1.5 bg-blue-500 text-white backdrop-blur-sm rounded-full border border-blue-500/20">
                          <div className="flex items-center gap-1.5">
                            <span className="inline-block w-1 h-1 rounded-full bg-white/80 animate-pulse" />
                            <span className="text-xs font-medium">Most Popular</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className="mb-4 sm:mb-6">
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg sm:rounded-xl ${
                      plan.highlighted 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-medium text-slate-900">{plan.name}</h3>
                  </div>
                  <div className="flex items-baseline gap-1 sm:gap-2">
                    <div className="relative min-w-[60px] sm:min-w-[80px] h-10 sm:h-12 flex items-center">
                      <span className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 transition-all duration-300 ${
                        isAnimating ? 'transform scale-105' : 'transform scale-100'
                      }`}>
                        {plan.price}
                      </span>
                    </div>
                    {plan.price !== "Custom" && (
                      <span className={`text-xs sm:text-sm text-slate-600 transition-all duration-500 ${
                        isAnimating ? 'opacity-70 transform translate-x-1' : 'opacity-100 transform translate-x-0'
                      }`}>
                        {plan.name === "Starter" ? animatedText.starter : 
                         plan.name === "Professional" ? animatedText.professional : 
                         "per month"}
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 mt-3 sm:mt-4">{plan.description}</p>
                </div>

                <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 sm:gap-2.5">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-green-600" />
                      </div>
                      <span className="text-xs sm:text-sm text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => window.location.href = '/dashboard'}
                  className={`w-full py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ${plan.highlighted
                      ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg hover:shadow-xl transform hover:scale-105'
                      : 'border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                    }`}
                >
                  {plan.cta}
                </button>
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center text-slate-600 text-sm space-y-2">
          <p>All plans include 24/7 support and 99.9% uptime guarantee.</p>
          <p>Secure payments powered by Stripe. Cancel anytime.</p>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;