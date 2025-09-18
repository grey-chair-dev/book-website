// Real email service that uses the database API
import { buildApiUrl } from '../config/api';

export interface SubscriptionResult {
  success: boolean;
  message: string;
  subscription?: any;
}

export class RealEmailService {
  static async subscribe(email: string, source: string = 'website'): Promise<SubscriptionResult> {
    try {
      const response = await fetch(`buildApiUrl('/email-subscriptions')`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source,
          subscribed_at: new Date().toISOString()
        }),
      });

      if (response.ok) {
        const subscription = await response.json();
        return {
          success: true,
          message: 'Successfully subscribed to our newsletter!',
          subscription
        };
      } else {
        const error = await response.json();
        return {
          success: false,
          message: error.message || 'Failed to subscribe. Please try again.'
        };
      }
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      return {
        success: false,
        message: 'Network error. Please check your connection and try again.'
      };
    }
  }

  static async unsubscribe(email: string): Promise<SubscriptionResult> {
    try {
      const response = await fetch(`buildApiUrl('/email-subscriptions')`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        return {
          success: true,
          message: 'Successfully unsubscribed from our newsletter.'
        };
      } else {
        const error = await response.json();
        return {
          success: false,
          message: error.message || 'Failed to unsubscribe. Please try again.'
        };
      }
    } catch (error) {
      console.error('Error unsubscribing from newsletter:', error);
      return {
        success: false,
        message: 'Network error. Please check your connection and try again.'
      };
    }
  }

  static async getSubscriptions(): Promise<any[]> {
    try {
      const response = await fetch(`buildApiUrl('/email-subscriptions')`);
      if (!response.ok) return [];
      return await response.json();
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      return [];
    }
  }
}

export default RealEmailService;
