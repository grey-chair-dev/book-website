import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, BookOpen, Clock } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }, 2000);
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      description: 'Send me a message directly',
      value: 'claire@heirsofeleusa.com',
      action: 'mailto:claire@heirsofeleusa.com'
    },
    {
      icon: MessageCircle,
      title: 'Social Media',
      description: 'Connect on social platforms',
      value: '@heirsofeleusa',
      action: '#'
    },
    {
      icon: BookOpen,
      title: 'Book Inquiries',
      description: 'For book-related questions',
      value: 'books@heirsofeleusa.com',
      action: 'mailto:books@heirsofeleusa.com'
    }
  ];

  const faqs = [
    {
      question: "When will the next book in the series be released?",
      answer: "I'm currently working on the next installment. Follow my blog for updates on the writing process and release timeline."
    },
    {
      question: "Do you offer book signings or author visits?",
      answer: "Yes! I love connecting with readers. Please contact me to discuss availability for book signings, school visits, or other events."
    },
    {
      question: "Can I get a signed copy of your books?",
      answer: "Absolutely! Contact me directly and I'd be happy to arrange a signed copy for you."
    },
    {
      question: "Do you accept feedback or suggestions from readers?",
      answer: "I value reader feedback! While I can't respond to every message, I do read all correspondence and appreciate your thoughts."
    }
  ];

  return (
    <div className="min-h-screen bg-secondary-50">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 to-secondary-100 section-padding">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-secondary-900 mb-4">
              Get In Touch
            </h1>
            <p className="text-lg md:text-xl text-secondary-700 max-w-3xl mx-auto">
              I'd love to hear from you! Whether you have questions about the books, want to share your thoughts, or are interested in a collaboration.
            </p>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary-900 mb-4">
                Ways to Connect
              </h2>
              <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
                Choose the method that works best for you
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {contactMethods.map((method, index) => (
                <a
                  key={index}
                  href={method.action}
                  className="group bg-gradient-to-br from-primary-50 to-secondary-100 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-600 transition-colors duration-300">
                    <method.icon className="h-8 w-8 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-secondary-900 mb-3">
                    {method.title}
                  </h3>
                  <p className="text-secondary-700 mb-4">
                    {method.description}
                  </p>
                  <p className="text-primary-600 font-medium group-hover:text-primary-700 transition-colors duration-300">
                    {method.value}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-20 bg-secondary-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary-900 mb-4">
                  Send a Message
                </h2>
                <p className="text-lg text-secondary-600">
                  Fill out the form below and I'll get back to you as soon as possible
                </p>
              </div>

              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-green-800 font-medium">Message sent successfully! I'll get back to you soon.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-secondary-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-secondary-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                  >
                    <option value="">Select a subject</option>
                    <option value="book-question">Book Question</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="event-request">Event Request</option>
                    <option value="feedback">Reader Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-secondary-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 resize-vertical"
                    placeholder="Tell me what's on your mind..."
                  />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Clock className="h-5 w-5 animate-spin" aria-hidden="true" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" aria-hidden="true" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-secondary-600">
                Quick answers to common questions
              </p>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-secondary-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-secondary-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-secondary-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Response Time */}
        <section className="py-20 bg-primary-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="h-8 w-8 text-primary-600" aria-hidden="true" />
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              Response Time
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              I typically respond to messages within 2-3 business days. For urgent inquiries, please mention "URGENT" in your subject line.
            </p>
            <p className="text-primary-200">
              Thank you for your patience and for reaching out!
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
