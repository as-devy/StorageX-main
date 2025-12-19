'use client';

import React from 'react';
import { Testimonial } from './TestimonialCard';

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Operations Manager",
      company: "TechMart Electronics",
      testimonial: "Storagex reduced our stockouts by 85% and saved us over $50,000 in inventory costs in just 6 months. The AI predictions are incredibly accurate.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Mike Chen",
      role: "Store Owner",
      company: "Chen's Retail Chain",
      testimonial: "The AI predictions are incredibly accurate. We now know exactly what to order and when. This has revolutionized our inventory management.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Lisa Rodriguez",
      role: "Inventory Director",
      company: "Fashion Forward",
      testimonial: "Finally, an inventory system that actually understands seasonal trends and customer behavior. The insights have been game-changing.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "David Kumar",
      role: "Supply Chain Manager",
      company: "Global Electronics",
      testimonial: "Storagex transformed our entire inventory process. The ROI was visible within the first month. Highly recommend to any retail business.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Emma Thompson",
      role: "Store Manager",
      company: "Urban Outfitters",
      testimonial: "The multi-location features are game-changing. We can manage 15 stores from one dashboard. It's exactly what we needed.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Carlos Martinez",
      role: "CEO",
      company: "Retail Innovations",
      testimonial: "Best investment we've made. The AI insights have revolutionized how we approach inventory. Our team loves how intuitive it is.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
    }
  ];

  return (
    <section className="py-20 bg-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 px-4 sm:px-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">
            Trusted by retail leaders
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-xs sm:max-w-2xl lg:max-w-3xl mx-auto">
            See what our customers are saying about Storagex
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              name={testimonial.name}
              role={testimonial.role}
              company={testimonial.company}
              testimonial={testimonial.testimonial}
              rating={testimonial.rating}
              image={testimonial.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
