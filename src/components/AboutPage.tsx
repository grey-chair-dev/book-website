import React, { useState, useEffect } from 'react';
import { Award, Globe, Users, BookOpen, Heart, GraduationCap, MapPin, PenTool } from 'lucide-react';
import DataService from '../services/dataService';
import Header from './Header';
import Footer from './Footer';

interface Author {
  id: number;
  name: string;
  full_name: string;
  bio: string;
  image: string;
  location: string;
  education: string[];
  personal: string[];
  writing_journey: string[];
  social_media: Record<string, any>;
  stats: Record<string, any>;
}

const AboutPage: React.FC = () => {
  const [author, setAuthor] = useState<Author | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const authorData = await DataService.getAuthor();
        setAuthor(authorData);
      } catch (error) {
        console.error('Error fetching author:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthor();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary-50">
        <Header />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-secondary-600">Loading author information...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!author) {
    return (
      <div className="min-h-screen bg-secondary-50">
        <Header />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <p className="text-secondary-600">Author information not available.</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const stats = [
    { icon: BookOpen, label: 'Books in Series', value: author.stats.books_in_series.toString() },
    { icon: Globe, label: 'Kingdoms', value: author.stats.kingdoms },
    { icon: Users, label: 'Heroes', value: author.stats.heroes },
    { icon: Award, label: 'Prophecy', value: author.stats.prophecy },
  ];

  const authorDetails = [
    {
      icon: GraduationCap,
      title: 'Education',
      details: author.education
    },
    {
      icon: MapPin,
      title: 'Location',
      details: [author.location, 'High School Campus Minister']
    },
    {
      icon: Heart,
      title: 'Personal',
      details: author.personal
    },
    {
      icon: PenTool,
      title: 'Writing Journey',
      details: author.writing_journey
    }
  ];

  return (
    <div className="min-h-screen bg-secondary-50">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-600 to-secondary-700 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
                About {author.name}
              </h1>
              <p className="text-xl md:text-2xl text-primary-100 max-w-4xl mx-auto leading-relaxed">
                {author.bio}
              </p>
            </div>
          </div>
        </section>

        {/* Author Story */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Author Image */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary-900 mb-8">
                The Author Behind the Series
              </h2>
              
              {/* Author photo from database */}
              <div className="flex justify-center mb-8">
                <div className="w-64 h-80 rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src={author.image}
                    alt={`${author.full_name}, author of the Heirs of Eleusa series`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to placeholder if image doesn't exist
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/author/ce-scott-placeholder.svg';
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-8">
                <div className="prose prose-lg max-w-none">
                  <p className="text-secondary-700 leading-relaxed mb-6 italic text-lg">
                    "Once upon a time, there was a little girl who couldn't sleep. So she started telling herself stories to keep her mind off of the real world. And, well, that's how the world of Eleusa was born."
                  </p>
                  
                  <p className="text-secondary-700 leading-relaxed mb-6">
                    It grew as I improved on those initial stories, the characters moved into my head, and I started sharing the stories (badly!) with my siblings to keep us entertained while not sleeping in anticipation of Christmas morning.
                  </p>
                  
                  <p className="text-secondary-700 leading-relaxed mb-6">
                    If it wasn't for their encouragement and the encouragement of some friends from college and beyond, (and lots of well-placed Holy Spirit inspiration!) Eleusa as you know probably would not exist. I hope you all enjoy reading these books as much as I enjoyed dreaming them up and in these pages you may find the hope, inspiration, and courage you need to face any dragons or demons you may encounter.
                  </p>
                  
                  <p className="text-secondary-700 leading-relaxed">
                    Claire Scott is a wife, high school campus minister, and fantasy author living in Cincinnati, OH. She graduated from Purdue University in 2019 and discerned a call to serve the Church through the Echo Program at the University of Notre Dame. She graduated with a master's in Theology in 2021 and now loves helping to form her high schoolers, write good, true, and beautiful stories, cook for her husband, Charlie, and laugh at the antics of their two cats.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-primary-50 to-secondary-100 rounded-2xl p-8">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-serif font-bold text-secondary-900 text-center">
                      Author Details
                    </h3>
                    
                    <div className="grid grid-cols-1 gap-6">
                      {authorDetails.map((detail, index) => (
                        <div key={index} className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <detail.icon className="h-6 w-6 text-white" aria-hidden="true" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-secondary-900 mb-2">{detail.title}</h4>
                            <ul className="space-y-1">
                              {detail.details.map((item, itemIndex) => (
                                <li key={itemIndex} className="text-secondary-600 text-sm">
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Series Inspiration */}
        <section className="py-20 bg-secondary-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary-900 mb-4">
                About the Heirs of Eleusa
              </h2>
              <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
                Adventure, Magic, Wonder, Truth, Beauty & Goodness - An epic fantasy series inspired by the great works of Tolkien, Lewis, and Peterson
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="prose prose-lg max-w-none">
                  <p className="text-secondary-700 leading-relaxed">
                    If you, like author C.E. Scott, were looking for fantasy that captures the beauty, wonder, depth, and truths 
                    of books like J.R.R. Tolkien's The Lord of the Rings, C.S. Lewis' Chronicles of Narnia, or Andrew Peterson's 
                    Wingfeather Saga, The Heirs of Eleusa was written for you.
                  </p>
                  
                  <p className="text-secondary-700 leading-relaxed">
                    Long ago, after the Great War, a Mira prophetess saw a vision of a great darkness that would rise, 
                    the heroes that would be challenged to confront it, and that the fate of the world relies on their choices. 
                    The series tells the tale of this ancient prophecy's fulfillment, following a small band of heroes who must 
                    claim their destinies to save the kingdoms of the west.
                  </p>
                  
                  <p className="text-secondary-700 leading-relaxed">
                    You are invited to follow their adventures and discover the greatness that lies within and the adventure 
                    that comes with stepping into your destiny in this epic three-part series. These stories, like those that 
                    inspired them, fill the gap for those longing for fiction with a deeper message that conveys beauty and truth 
                    while taking you on an epic adventure filled with wonder, magic, and goodness.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl p-8">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-serif font-bold text-secondary-900 text-center">
                      Series Statistics
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-6">
                      {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                          <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-3">
                            <stat.icon className="h-8 w-8 text-white" aria-hidden="true" />
                          </div>
                          <div className="text-2xl font-bold text-secondary-900 mb-1">
                            {stat.value}
                          </div>
                          <div className="text-secondary-600 text-sm">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-primary-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
              Ready to Begin the Journey?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
              Discover the epic fantasy series that combines adventure, magic, and deep truths in the tradition of the greatest fantasy authors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#books"
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors duration-200"
                tabIndex={0}
                aria-label="View all books in the series"
              >
                Explore the Books
              </a>
              <a
                href="#contact"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors duration-200"
                tabIndex={0}
                aria-label="Contact the author"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
