import React, { useState } from 'react';
import { Mail, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import emailService, { SubscriptionResult } from '../services/emailService';

interface EmailSubscriptionProps {
  source?: 'website' | 'blog' | 'admin' | 'import';
  placeholder?: string;
  buttonText?: string;
  className?: string;
  showIcon?: boolean;
  variant?: 'default' | 'compact' | 'inline';
}

const EmailSubscription: React.FC<EmailSubscriptionProps> = ({
  source = 'website',
  placeholder = 'Enter your email address',
  buttonText = 'Subscribe',
  className = '',
  showIcon = true,
  variant = 'default'
}) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SubscriptionResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setResult({
        success: false,
        message: 'Please enter your email address.'
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const subscriptionResult = await emailService.subscribe(email.trim(), source);
      setResult(subscriptionResult);
      
      if (subscriptionResult.success) {
        setEmail(''); // Clear the form on success
      }
    } catch (error) {
      console.error('Subscription error:', error);
      setResult({
        success: false,
        message: 'An unexpected error occurred. Please try again later.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'compact':
        return 'flex flex-col sm:flex-row gap-2';
      case 'inline':
        return 'flex gap-2';
      default:
        return 'flex flex-col sm:flex-row gap-4';
    }
  };

  const getInputClasses = () => {
    const baseClasses = 'px-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200';
    
    switch (variant) {
      case 'compact':
        return `${baseClasses} text-sm`;
      case 'inline':
        return `${baseClasses} flex-1`;
      default:
        return `${baseClasses} flex-1`;
    }
  };

  const getButtonClasses = () => {
    const baseClasses = 'btn-primary transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2';
    
    switch (variant) {
      case 'compact':
        return `${baseClasses} text-sm px-4 py-2`;
      case 'inline':
        return `${baseClasses} whitespace-nowrap px-4 py-3`;
      default:
        return `${baseClasses} whitespace-nowrap`;
    }
  };

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className={getVariantClasses()}>
        <div className="relative flex-1">
          {showIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-secondary-400" />
            </div>
          )}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            className={`${getInputClasses()} ${showIcon ? 'pl-10' : ''}`}
            disabled={isLoading}
            aria-label="Email address for newsletter subscription"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !email.trim()}
          className={getButtonClasses()}
          aria-label="Subscribe to newsletter"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Subscribing...
            </>
          ) : (
            <>
              {showIcon && <Mail className="h-4 w-4" />}
              {buttonText}
            </>
          )}
        </button>
      </form>

      {/* Result Message */}
      {result && (
        <div className={`mt-3 p-3 rounded-lg flex items-center gap-2 ${
          result.success 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {result.success ? (
            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
          ) : (
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
          )}
          <span className="text-sm font-medium">{result.message}</span>
        </div>
      )}

      {/* Privacy Notice */}
      {variant === 'default' && (
        <p className="text-secondary-500 text-sm mt-2">
          No spam, just quality content. Unsubscribe anytime.
        </p>
      )}
    </div>
  );
};

export default EmailSubscription;
