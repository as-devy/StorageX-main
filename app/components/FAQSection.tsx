'use client';

import React, { useState } from 'react';
import { Plus, Minus, MessageCircle, Zap } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-slate-200 rounded-xl mb-4 bg-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
      <button
        className="flex justify-between items-center w-full p-6 text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-semibold text-slate-800">{question}</span>
        {isOpen ? (
          <Minus className="w-5 h-5 text-blue-600" />
        ) : (
          <Plus className="w-5 h-5 text-slate-500" />
        )}
      </button>
      {isOpen && (
        <div className="px-6 pb-6 text-slate-600 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
};

const FAQSection: React.FC = () => {
  const faqs = [
    {
      question: "How does Storagex help manage inventory?",
      answer: "Storagex uses advanced AI to provide intelligent predictions and recommendations for stock levels, demand forecasting, and optimal reorder points. This helps you minimize stockouts and maximize profits."
    },
    {
      question: "Can Storagex handle multichannel inventory management?",
      answer: "Yes, Storagex allows you to manage inventory across multiple store locations and sales channels (e.g., e-commerce, physical stores) from a single, centralized dashboard with real-time synchronization."
    },
    {
      question: "Does Storagex integrate with popular e-commerce platforms?",
      answer: "Storagex offers seamless integrations with leading e-commerce platforms like Shopify, WooCommerce, and Magento, ensuring your online and offline inventory are always in sync."
    },
    {
      question: "Can Storagex integrate with accounting software?",
      answer: "Absolutely. Storagex integrates with popular accounting solutions such as Xero and QuickBooks Online, streamlining your financial reporting and inventory valuation processes."
    },
    {
      question: "How does Storagex support regulatory compliance?",
      answer: "Storagex provides robust tracking and reporting features that help you maintain accurate records, manage batch numbers, and ensure compliance with industry-specific regulations."
    },
    {
      question: "What kind of support and assistance does Storagex offer?",
      answer: "We offer comprehensive support including email assistance, a detailed help center, documentation, and dedicated account managers for our enterprise clients to ensure you get the most out of Storagex."
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-slate-100 relative overflow-hidden">
      {/* Big Glowing Balls */}
      <div className="absolute top-32 right-16 w-68 h-68 bg-green-400/15 rounded-full blur-3xl animate-pulse delay-200"></div>
      <div className="absolute bottom-28 left-24 w-44 h-44 bg-yellow-400/20 rounded-full blur-2xl animate-pulse delay-1100"></div>
      <div className="absolute top-1/4 left-12 w-52 h-52 bg-red-400/15 rounded-full blur-xl animate-pulse delay-1400"></div>
      <div className="absolute top-60 left-1/2 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-600"></div>
      <div className="absolute bottom-60 right-12 w-56 h-56 bg-cyan-400/15 rounded-full blur-2xl animate-pulse delay-800"></div>
      <div className="absolute top-80 left-20 w-48 h-48 bg-pink-400/20 rounded-full blur-xl animate-pulse delay-1200"></div>
      <div className="absolute bottom-80 right-1/3 w-60 h-60 bg-amber-400/15 rounded-full blur-3xl animate-pulse delay-400"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 px-4 sm:px-0">
          <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            Frequently Asked Questions
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 sm:mb-6 tracking-tight">
            Your <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Questions Answered</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-xs sm:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed">
            Find quick answers to the most common questions about Storagex and how it can help your business.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>

        <div className="text-center mt-20">
          <h3 className="text-3xl font-bold text-slate-900 mb-4">Still have questions?</h3>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
            Our team is here to help. Reach out to us for personalized support and a free demo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.location.href = '/dashboard'}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold flex items-center justify-center space-x-2"
            >
              <Zap className="w-5 h-5" />
              <span>Contact Sales</span>
            </button>
            <button 
              onClick={() => window.location.href = '/dashboard'}
              className="border border-slate-300 text-slate-700 px-8 py-4 rounded-xl hover:bg-slate-50 transition-colors text-lg font-semibold flex items-center justify-center space-x-2"
            >
              <span>Request a Demo</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
