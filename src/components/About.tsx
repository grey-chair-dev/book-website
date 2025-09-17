import React from 'react';
import { Award, Globe, Users, BookOpen } from 'lucide-react';

const About: React.FC = () => {
  const stats = [
    { icon: BookOpen, label: 'Published Books', value: '15+' },
    { icon: Globe, label: 'Languages', value: '55+' },
    { icon: Users, label: 'Readers Worldwide', value: 'Millions' },
    { icon: Award, label: 'Awards', value: 'Multiple' },
  ];

  return (
    <section id="about" className="bg-white section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary-900 mb-4">
            About Suzanne Collins
          </h2>
          <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
            A bestselling author whose works have captivated readers of all ages around the world
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <div className="prose prose-lg max-w-none">
              <p className="text-secondary-700 leading-relaxed">
                Suzanne Collins is the internationally bestselling author of The Hunger Games trilogy, 
                The Underland Chronicles, and other acclaimed works for young readers. Her books have 
                been translated into more than 55 languages and have sold millions of copies worldwide.
              </p>
              
              <p className="text-secondary-700 leading-relaxed">
                Born in Hartford, Connecticut, Collins began her career writing for children's television 
                before transitioning to writing books. Her work spans multiple genres, from fantasy and 
                science fiction to contemporary fiction, always with a focus on strong characters and 
                compelling storytelling.
              </p>
              
              <p className="text-secondary-700 leading-relaxed">
                Collins' writing is known for its exploration of complex themes such as war, survival, 
                and the human condition, making her books popular not only with young readers but also 
                with educators and book clubs worldwide.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl p-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-serif font-bold text-secondary-900">
                  Notable Achievements
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary-900">Bestselling Author</h4>
                      <p className="text-secondary-600 text-sm">
                        Multiple New York Times bestsellers with worldwide recognition
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-secondary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Globe className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary-900">Global Reach</h4>
                      <p className="text-secondary-600 text-sm">
                        Books available in over 55 languages across all continents
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary-900">Educational Impact</h4>
                      <p className="text-secondary-600 text-sm">
                        Widely used in schools and educational programs worldwide
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="h-8 w-8 text-primary-600" aria-hidden="true" />
              </div>
              <div className="text-3xl font-bold text-secondary-900 mb-2">
                {stat.value}
              </div>
              <div className="text-secondary-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About; 