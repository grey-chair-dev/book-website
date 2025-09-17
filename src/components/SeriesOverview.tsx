import React from 'react';
import { ArrowRight, BookOpen, Users, Globe } from 'lucide-react';

const SeriesOverview: React.FC = () => {
  const series = [
    {
      name: 'Heirs of Eleusa',
      description: 'An epic fantasy series following the fulfillment of the Great Prophecy, where a small band of heroes must claim their destinies to save the kingdoms of the west from the sorcerer king of Kalar.',
      books: 3,
      firstBook: '2024',
      lastBook: '2025',
      status: 'Completed',
      themes: ['Adventure', 'Magic', 'Wonder', 'Truth', 'Beauty', 'Goodness'],
      audience: 'Young Adult',
      awards: ['Epic Fantasy Series', 'Critical Acclaim'],
      cover: 'heirs-of-eleusa-series'
    }
  ];

  const handleSeriesClick = (seriesName: string) => {
    console.log(`Exploring series: ${seriesName}`);
  };

  const handleKeyDown = (event: React.KeyboardEvent, seriesName: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleSeriesClick(seriesName);
    }
  };

  return (
    <section id="series" className="bg-white section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary-900 mb-4">
            The Epic Fantasy Series
          </h2>
          <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
            Discover the complete Heirs of Eleusa series - an epic tale of destiny, magic, and the heroes who will save their world
          </p>
        </div>

        <div className="space-y-16">
          {series.map((seriesData, index) => (
            <div key={index} className="card p-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <h3 className="text-3xl font-serif font-bold text-secondary-900">
                        {seriesData.name}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        seriesData.status === 'Ongoing' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {seriesData.status}
                      </span>
                    </div>
                    
                    <p className="text-secondary-700 leading-relaxed text-lg">
                      {seriesData.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-secondary-600">
                        <BookOpen className="h-5 w-5" aria-hidden="true" />
                        <span className="font-medium">{seriesData.books} Books</span>
                      </div>
                      <div className="flex items-center gap-2 text-secondary-600">
                        <Users className="h-5 w-5" aria-hidden="true" />
                        <span className="font-medium">{seriesData.audience}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-secondary-600">
                        <span className="font-medium">{seriesData.firstBook}</span>
                        <span className="mx-2">-</span>
                        <span className="font-medium">{seriesData.lastBook}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-secondary-900">Key Themes</h4>
                    <div className="flex flex-wrap gap-2">
                      {seriesData.themes.map((theme, themeIndex) => (
                        <span
                          key={themeIndex}
                          className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                        >
                          {theme}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-secondary-900">Awards & Recognition</h4>
                    <div className="flex flex-wrap gap-2">
                      {seriesData.awards.map((award, awardIndex) => (
                        <span
                          key={awardIndex}
                          className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm"
                        >
                          {award}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleSeriesClick(seriesData.name)}
                    onKeyDown={(e) => handleKeyDown(e, seriesData.name)}
                    className="btn-primary inline-flex items-center gap-2"
                    tabIndex={0}
                    aria-label={`Explore ${seriesData.name} series`}
                  >
                    Explore Series
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>

                <div className="relative">
                  <div className="h-96 series-cover">
                    <img
                      src={`/images/covers/${seriesData.cover}.avif`}
                      alt={`${seriesData.name} series cover`}
                      loading="lazy"
                    />
                  </div>
                  
                  <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary-600">
                        {seriesData.books}
                      </div>
                      <div className="text-xs text-secondary-600">
                        Books in Series
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SeriesOverview; 