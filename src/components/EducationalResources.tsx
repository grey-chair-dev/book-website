import React from 'react';
import { Download, FileText, Users, BookOpen, Star } from 'lucide-react';

const EducationalResources: React.FC = () => {
  const resources = [
    {
      title: 'Sunrise on the Reaping Reading Guide',
      description: 'Comprehensive reading guide for the latest Hunger Games novel, including discussion questions and activities.',
      type: 'Reading Guide',
      audience: 'Teachers & Students',
      file: 'Scholastic-SunriseontheReaping-ReadingGuide.pdf',
      size: '3.22 MB',
      featured: true
    },
    {
      title: 'Talking About War Educator Guide',
      description: 'Educational materials for discussing themes of war, conflict, and survival in literature.',
      type: 'Discussion Guide',
      audience: 'Educators',
      file: 'talking-about-war-educator-guide-dg.pdf',
      size: '2.64 MB'
    },
    {
      title: 'Underland Chronicles Discussion Guide',
      description: 'Complete discussion guide for The Underland Chronicles series with lesson plans and activities.',
      type: 'Discussion Guide',
      audience: 'Teachers & Students',
      file: 'underland-chronicles-dg.pdf',
      size: '1.17 MB'
    },
    {
      title: 'Gregor the Overlander Teacher Guide',
      description: 'Comprehensive teacher guide with lesson plans, vocabulary, and comprehension activities.',
      type: 'Teacher Guide',
      audience: 'Educators',
      file: 'gregor-the-overlander-storia-tg.pdf',
      size: '1.36 MB'
    },
    {
      title: 'Children\'s Choice Award Nominations',
      description: 'Information about award nominations and recognition for young readers.',
      type: 'Award Information',
      audience: 'Librarians & Educators',
      file: 'Award-nominatio--1-.pdf',
      size: '104 KB'
    }
  ];

  const handleDownload = (fileName: string) => {
    console.log(`Downloading: ${fileName}`);
    // In a real implementation, this would trigger a file download
  };

  const handleKeyDown = (event: React.KeyboardEvent, fileName: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleDownload(fileName);
    }
  };

  return (
    <section id="resources" className="bg-secondary-50 section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary-900 mb-4">
            Educational Resources
          </h2>
          <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
            Free teaching materials, discussion guides, and lesson plans for educators and students
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <div
              key={index}
              className={`card p-6 ${
                resource.featured ? 'ring-2 ring-primary-500' : ''
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="h-6 w-6 text-primary-600" aria-hidden="true" />
                  </div>
                  {resource.featured && (
                    <span className="bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      NEW
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif font-bold text-secondary-900 text-lg leading-tight">
                    {resource.title}
                  </h3>
                  
                  <p className="text-secondary-600 text-sm">
                    {resource.description}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-secondary-500">
                    <span className="px-2 py-1 bg-secondary-100 rounded-full">
                      {resource.type}
                    </span>
                    <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full">
                      {resource.audience}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-secondary-500">
                    <span>{resource.size}</span>
                    <span>PDF</span>
                  </div>
                </div>

                <button
                  onClick={() => handleDownload(resource.file)}
                  onKeyDown={(e) => handleKeyDown(e, resource.file)}
                  className="w-full btn-secondary inline-flex items-center justify-center gap-2"
                  tabIndex={0}
                  aria-label={`Download ${resource.title}`}
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-2xl p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-serif font-bold text-secondary-900">
                Perfect for Classrooms
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Users className="h-4 w-4 text-primary-600" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-secondary-900">Discussion Questions</h4>
                    <p className="text-secondary-600 text-sm">
                      Thought-provoking questions to engage students in meaningful conversations
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <BookOpen className="h-4 w-4 text-primary-600" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-secondary-900">Lesson Plans</h4>
                    <p className="text-secondary-600 text-sm">
                      Complete lesson plans aligned with educational standards
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Star className="h-4 w-4 text-primary-600" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-secondary-900">Activities</h4>
                    <p className="text-secondary-600 text-sm">
                      Interactive activities and projects to enhance learning
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary-50 to-secondary-100 rounded-xl p-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto">
                  <Download className="h-8 w-8 text-white" aria-hidden="true" />
                </div>
                <h4 className="font-semibold text-secondary-900">
                  All Resources Free
                </h4>
                <p className="text-secondary-600 text-sm">
                  Download any resource at no cost. Perfect for educators, librarians, and book clubs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationalResources; 