'use client';

import React, { memo, useCallback, useState } from 'react';
import {
  Search,
  MessageCircle,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  FileText,
  Video,
  BookOpen,
  Users,
  Star,
  Send
} from 'lucide-react';
import { PageType } from '../types';

interface SupportContentProps {
  onPageChange: (page: PageType) => void;
}

const SupportContent: React.FC<SupportContentProps> = memo(({
  onPageChange
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isContactFormOpen, setIsContactFormOpen] = useState<boolean>(false);

  const handlePageChange = useCallback((page: PageType) => {
    onPageChange(page);
  }, [onPageChange]);

  const handleContactSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    alert('Support ticket submitted successfully! We&apos;ll get back to you within 24 hours.');
    setIsContactFormOpen(false);
  }, []);

  // Mock FAQ data
  const faqCategories = [
    { id: 'getting-started', name: 'Getting Started', count: 12 },
    { id: 'inventory', name: 'Inventory Management', count: 8 },
    { id: 'ai-features', name: 'AI Features', count: 6 },
    { id: 'integrations', name: 'Integrations', count: 4 },
    { id: 'billing', name: 'Billing & Plans', count: 5 },
    { id: 'technical', name: 'Technical Issues', count: 7 }
  ];

  const faqItems = [
    {
      id: 1,
      category: 'getting-started',
      question: 'How do I add my first product to the inventory?',
      answer: 'To add your first product, go to the Products page and click "Add Product". Fill in the product details including name, SKU, category, and initial stock quantity.',
      helpful: 24
    },
    {
      id: 2,
      category: 'inventory',
      question: 'How do I set up low stock alerts?',
      answer: 'Navigate to Settings > Notifications and configure your low stock thresholds. You can set different thresholds for different product categories.',
      helpful: 18
    },
    {
      id: 3,
      category: 'ai-features',
      question: 'What AI features are available in the Professional plan?',
      answer: 'The Professional plan includes demand forecasting, automated reorder suggestions, anomaly detection, and predictive analytics for inventory optimization.',
      helpful: 15
    },
    {
      id: 4,
      category: 'integrations',
      question: 'Can I integrate with my existing e-commerce platform?',
      answer: 'Yes! We support integrations with Shopify, WooCommerce, Magento, and many other popular e-commerce platforms. Check our Integrations page for the full list.',
      helpful: 22
    },
    {
      id: 5,
      category: 'billing',
      question: 'How does the free trial work?',
      answer: 'The free trial gives you access to all basic features for 14 days. No credit card required. You can upgrade to a paid plan anytime during or after the trial.',
      helpful: 31
    }
  ];

  const contactMethods = [
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      availability: 'Available 24/7',
      action: 'Start Chat',
      color: 'bg-brand-50 border-brand-200 text-brand-main'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Phone Support',
      description: 'Speak directly with our support team',
      availability: 'Mon-Fri 9AM-6PM EST',
      action: 'Call Now',
      color: 'bg-green-50 border-green-200 text-green-600'
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email Support',
      description: 'Send us a detailed message',
      availability: 'Response within 24 hours',
      action: 'Send Email',
      color: 'bg-purple-50 border-purple-200 text-purple-600'
    }
  ];

  const filteredFAQs = faqItems.filter(faq => 
    (selectedCategory === 'all' || faq.category === selectedCategory) &&
    (searchQuery === '' || faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
     faq.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex-1 bg-white dark:bg-gray-900 overflow-auto h-full transition-colors duration-300">
      <div className="p-6">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Support Center</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">Get help and find answers to your questions</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help articles, FAQs, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500/50"
            />
          </div>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {contactMethods.map((method, index) => (
            <div key={index} className={`p-6 border rounded-lg ${method.color} hover:shadow-md transition-shadow`}>
              <div className="flex items-center space-x-3 mb-4">
                {method.icon}
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">{method.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{method.description}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{method.availability}</span>
                </div>
                <button 
                  onClick={() => alert(`${method.action} clicked!`)}
                  className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
                >
                  {method.action}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Categories */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Browse by Category</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
                selectedCategory === 'all'
                  ? 'bg-brand-main text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Topics
            </button>
            {faqCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-brand-main text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Frequently Asked Questions</h2>
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq) => (
              <div key={faq.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">{faq.question}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Star className="w-4 h-4" />
                      <span>{faq.helpful}</span>
                    </div>
                    <button className="text-brand-main hover:text-brand-third text-sm font-medium">
                      Helpful
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No FAQs found matching your search criteria.</p>
            </div>
          )}
        </div>

        {/* Contact Form */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Still need help?</h2>
              <p className="text-gray-600 dark:text-gray-400">Send us a message and we&apos;ll get back to you as soon as possible.</p>
            </div>
            <button
              onClick={() => setIsContactFormOpen(!isContactFormOpen)}
              className="bg-brand-main text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition-colors duration-300 flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Contact Support</span>
            </button>
          </div>

          {isContactFormOpen && (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500/50"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500/50"
                  placeholder="Describe your issue or question in detail..."
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsContactFormOpen(false)}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-brand-main text-white rounded-lg hover:bg-brand-700 transition-colors duration-300"
                >
                  Send Message
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
});

SupportContent.displayName = 'SupportContent';

export default SupportContent;
