import React from 'react';
import { Quote, Star, ExternalLink } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "A Propulsive, Brutal 'Hunger Games' Is Here. And It's Great...Collins paints a shrewd portrait of the machinery of propaganda and how authoritarianism takes root.",
      source: "The New York Times",
      rating: 5,
      featured: true
    },
    {
      quote: "...it's as if Collins is asking us to reflect on how much we really know of our history, and how much power we have in ensuring that our current truths have a place in the future.",
      source: "NPR",
      rating: 5
    },
    {
      quote: "It's a life-giving book, no matter what you think of the world we're living in now. Because it reminds us that unity is worth something. In some cases, it's worth everything.",
      source: "People",
      rating: 5
    },
    {
      quote: "Collins has created a series that stands as a testament to the power of young adult literature to address complex themes with intelligence and grace.",
      source: "Publishers Weekly",
      rating: 5
    },
    {
      quote: "A masterful storyteller who creates worlds that feel both fantastical and deeply real, Collins continues to captivate readers of all ages.",
      source: "School Library Journal",
      rating: 5
    },
    {
      quote: "The Underland Chronicles showcase Collins' ability to create compelling fantasy worlds that resonate with readers long after the final page.",
      source: "Booklist",
      rating: 4
    }
  ];

  return (
    <section className="bg-secondary-50 section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary-900 mb-4">
            Critical Acclaim
          </h2>
          <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
            What critics and readers are saying about Suzanne Collins' work
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`card p-6 ${
                testimonial.featured ? 'ring-2 ring-primary-500' : ''
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Quote className="h-4 w-4 text-primary-600" aria-hidden="true" />
                  </div>
                  {testimonial.featured && (
                    <span className="bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      FEATURED
                    </span>
                  )}
                </div>

                <div className="space-y-3">
                  <p className="text-secondary-700 italic leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < testimonial.rating
                              ? 'text-yellow-500 fill-current'
                              : 'text-secondary-300'
                          }`}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <ExternalLink className="h-4 w-4 text-secondary-400" aria-hidden="true" />
                  </div>

                  <div className="pt-2 border-t border-secondary-200">
                    <p className="font-semibold text-secondary-900">
                      {testimonial.source}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="space-y-6">
              <h3 className="text-2xl font-serif font-bold text-secondary-900">
                Join Millions of Readers Worldwide
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-2">
                    55+
                  </div>
                  <div className="text-sm text-secondary-600">
                    Languages
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-2">
                    100M+
                  </div>
                  <div className="text-sm text-secondary-600">
                    Books Sold
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-2">
                    100+
                  </div>
                  <div className="text-sm text-secondary-600">
                    Countries
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-2">
                    15+
                  </div>
                  <div className="text-sm text-secondary-600">
                    Years
                  </div>
                </div>
              </div>

              <p className="text-secondary-600">
                Discover why readers around the world continue to be captivated by Suzanne Collins' storytelling
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 