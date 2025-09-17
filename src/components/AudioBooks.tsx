import React from 'react';
import { Play, Download, Headphones, Star } from 'lucide-react';

const AudioBooks: React.FC = () => {
  const audioBooks = [
    {
      title: 'Gregor the Overlander',
      series: 'The Underland Chronicles',
      narrator: 'Paul Boehmer',
      duration: '6h 45m',
      file: 'Gregor-the-Overlander-Audio-Book-Sample.mp3',
      size: '857 KB',
      rating: 5
    },
    {
      title: 'The Prophecy of Bane',
      series: 'The Underland Chronicles',
      narrator: 'Paul Boehmer',
      duration: '7h 12m',
      file: 'Prophecy-of-Bane-Audio-Book-Sample.mp3',
      size: '745 KB',
      rating: 5
    },
    {
      title: 'The Curse of the Warmbloods',
      series: 'The Underland Chronicles',
      narrator: 'Paul Boehmer',
      duration: '7h 38m',
      file: 'Curse-of-the-Warmbloods-Audio-Book--Sample.mp3',
      size: '801 KB',
      rating: 4
    },
    {
      title: 'The Marks of Secret',
      series: 'The Underland Chronicles',
      narrator: 'Paul Boehmer',
      duration: '7h 15m',
      file: 'Marks-of-Secret-Audio-Book-Sample.mp3',
      size: '622 KB',
      rating: 4
    },
    {
      title: 'The Code of Claw',
      series: 'The Underland Chronicles',
      narrator: 'Paul Boehmer',
      duration: '7h 52m',
      file: 'Code-of-Claw-Audio-Book-Sample.mp3',
      size: '787 KB',
      rating: 5
    }
  ];

  const handlePlaySample = (title: string) => {
    console.log(`Playing sample for: ${title}`);
    // In a real implementation, this would play the audio sample
  };

  const handleDownloadSample = (fileName: string) => {
    console.log(`Downloading sample: ${fileName}`);
    // In a real implementation, this would trigger a file download
  };

  const handleKeyDown = (event: React.KeyboardEvent, action: string, title: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      if (action === 'play') {
        handlePlaySample(title);
      } else if (action === 'download') {
        handleDownloadSample(title);
      }
    }
  };

  return (
    <section className="bg-white section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary-900 mb-4">
            Audio Books
          </h2>
          <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
            Experience Suzanne Collins' stories through professionally narrated audio books
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {audioBooks.map((audioBook, index) => (
            <div key={index} className="card p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Headphones className="h-6 w-6 text-primary-600" aria-hidden="true" />
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < audioBook.rating
                              ? 'text-yellow-500 fill-current'
                              : 'text-secondary-300'
                          }`}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h3 className="font-serif font-bold text-secondary-900 text-lg leading-tight">
                      {audioBook.title}
                    </h3>
                    <p className="text-sm text-primary-600 font-medium">
                      {audioBook.series}
                    </p>
                  </div>

                  <div className="space-y-2 text-sm text-secondary-600">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Narrated by:</span>
                      <span>{audioBook.narrator}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Duration:</span>
                      <span>{audioBook.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Sample:</span>
                      <span>{audioBook.size}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handlePlaySample(audioBook.title)}
                    onKeyDown={(e) => handleKeyDown(e, 'play', audioBook.title)}
                    className="flex-1 btn-primary inline-flex items-center justify-center gap-2"
                    tabIndex={0}
                    aria-label={`Play sample of ${audioBook.title}`}
                  >
                    <Play className="h-4 w-4" aria-hidden="true" />
                    Play Sample
                  </button>
                  
                  <button
                    onClick={() => handleDownloadSample(audioBook.file)}
                    onKeyDown={(e) => handleKeyDown(e, 'download', audioBook.title)}
                    className="btn-secondary inline-flex items-center justify-center gap-2"
                    tabIndex={0}
                    aria-label={`Download sample of ${audioBook.title}`}
                  >
                    <Download className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-br from-primary-50 to-secondary-100 rounded-2xl p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-serif font-bold text-secondary-900">
                Perfect for Listening
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Headphones className="h-4 w-4 text-primary-600" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-secondary-900">Professional Narration</h4>
                    <p className="text-secondary-600 text-sm">
                      Expertly narrated by acclaimed voice actor Paul Boehmer
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Play className="h-4 w-4 text-primary-600" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-secondary-900">Free Samples</h4>
                    <p className="text-secondary-600 text-sm">
                      Listen to samples before purchasing the full audio book
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Download className="h-4 w-4 text-primary-600" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-secondary-900">Download & Listen</h4>
                    <p className="text-secondary-600 text-sm">
                      Available on all major audio book platforms and retailers
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto">
                <Headphones className="h-8 w-8 text-white" aria-hidden="true" />
              </div>
              <h4 className="font-semibold text-secondary-900">
                Available Everywhere
              </h4>
              <p className="text-secondary-600 text-sm">
                Find Suzanne Collins' audio books on Audible, iTunes, Google Play, and other major platforms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AudioBooks; 