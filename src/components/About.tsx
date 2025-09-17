import React from 'react';
import { Award, Globe, Users, BookOpen } from 'lucide-react';

const About: React.FC = () => {
  const stats = [
    { icon: BookOpen, label: 'Books in Series', value: '3' },
    { icon: Globe, label: 'Kingdoms', value: '5+' },
    { icon: Users, label: 'Heroes', value: 'Multiple' },
    { icon: Award, label: 'Prophecy', value: 'Great' },
  ];

  return (
    <section id="about" className="bg-white section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary-900 mb-4">
            About the Heirs of Eleusa
          </h2>
          <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
            Adventure, Magic, Wonder, Truth, Beauty & Goodness - An epic fantasy series inspired by the great works of Tolkien, Lewis, and Peterson
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <div className="prose prose-lg max-w-none">
              <p className="text-secondary-700 leading-relaxed">
                Long ago, after the Great War, a Mira prophetess saw a vision of a great darkness that would rise, 
                the heroes that would be challenged to confront it, and that the fate of the world relies on their choices. 
                The Heirs of Eleusa tells the tale of this ancient prophecy's fulfillment, following a small band of heroes who must 
                claim their destinies to save the kingdoms of the west.
              </p>
              
              <p className="text-secondary-700 leading-relaxed">
                Step into the world of Eleusa, where magic flows through the very fabric of reality and ancient prophecies 
                guide the fate of kingdoms. As war advances and darkness threatens to consume all, heroes must rise to 
                discover their true identities and unite against the forces of evil.
              </p>
              
              <p className="text-secondary-700 leading-relaxed">
                This epic three-part series follows the journey of chosen ones as they learn to embrace their destinies, 
                forge unbreakable bonds of friendship, and discover that the greatest adventures come from stepping into 
                who you were meant to be. Adventure, magic, wonder, truth, beauty, and goodness await in the world of Eleusa.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl p-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-serif font-bold text-secondary-900">
                  The World of Eleusa
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Globe className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary-900">Five Kingdoms</h4>
                      <p className="text-secondary-600 text-sm">
                        Cebola, Azora, Montressar, Kalar, and the mysterious lands beyond
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-secondary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary-900">The Great Prophecy</h4>
                      <p className="text-secondary-600 text-sm">
                        An ancient vision that foretells the rise of chosen heroes
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary-900">Heroes & Magic</h4>
                      <p className="text-secondary-600 text-sm">
                        Where destiny calls and magic flows through every choice
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