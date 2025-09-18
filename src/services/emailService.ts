import { supabase } from '../lib/supabase';

export interface EmailSubscription {
  id: string;
  email: string;
  status: 'active' | 'unsubscribed' | 'bounced';
  source: 'website' | 'blog' | 'admin' | 'import';
  subscribed_at: string;
  unsubscribed_at?: string;
  last_email_sent?: string;
  email_count: number;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface SubscriptionStats {
  total_subscribers: number;
  active_subscribers: number;
  unsubscribed_count: number;
  new_this_month: number;
}

export interface SubscriptionResult {
  success: boolean;
  message: string;
  subscription?: EmailSubscription;
}

class EmailService {
  /**
   * Subscribe an email address to the newsletter
   */
  async subscribe(email: string, source: string = 'website'): Promise<SubscriptionResult> {
    try {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return {
          success: false,
          message: 'Please enter a valid email address.'
        };
      }

      // Check if email already exists
      const { data: existingSubscription, error: checkError } = await supabase
        .from('email_subscriptions')
        .select('id, status')
        .eq('email', email.toLowerCase())
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        console.error('Error checking existing subscription:', checkError);
        return {
          success: false,
          message: 'An error occurred. Please try again later.'
        };
      }

      // If email exists and is active, return success
      if (existingSubscription && existingSubscription.status === 'active') {
        return {
          success: true,
          message: 'You are already subscribed to our newsletter!'
        };
      }

      // If email exists but is unsubscribed, reactivate it
      if (existingSubscription && existingSubscription.status === 'unsubscribed') {
        const { data: updatedSubscription, error: updateError } = await supabase
          .from('email_subscriptions')
          .update({
            status: 'active',
            source,
            unsubscribed_at: null,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingSubscription.id)
          .select()
          .single();

        if (updateError) {
          console.error('Error reactivating subscription:', updateError);
          return {
            success: false,
            message: 'An error occurred. Please try again later.'
          };
        }

        return {
          success: true,
          message: 'Welcome back! You have been resubscribed to our newsletter.',
          subscription: updatedSubscription
        };
      }

      // Create new subscription
      const { data: newSubscription, error: insertError } = await supabase
        .from('email_subscriptions')
        .insert({
          email: email.toLowerCase(),
          source,
          status: 'active'
        })
        .select()
        .single();

      if (insertError) {
        console.error('Error creating subscription:', insertError);
        return {
          success: false,
          message: 'An error occurred. Please try again later.'
        };
      }

      return {
        success: true,
        message: 'Thank you for subscribing! You will receive updates about new blog posts and book releases.',
        subscription: newSubscription
      };

    } catch (error) {
      console.error('Unexpected error in subscribe:', error);
      return {
        success: false,
        message: 'An unexpected error occurred. Please try again later.'
      };
    }
  }

  /**
   * Unsubscribe an email address
   */
  async unsubscribe(email: string): Promise<SubscriptionResult> {
    try {
      const { data, error } = await supabase
        .rpc('unsubscribe_email', { email_address: email.toLowerCase() });

      if (error) {
        console.error('Error unsubscribing:', error);
        return {
          success: false,
          message: 'An error occurred while unsubscribing. Please try again later.'
        };
      }

      if (data) {
        return {
          success: true,
          message: 'You have been successfully unsubscribed from our newsletter.'
        };
      } else {
        return {
          success: false,
          message: 'Email address not found in our subscription list.'
        };
      }
    } catch (error) {
      console.error('Unexpected error in unsubscribe:', error);
      return {
        success: false,
        message: 'An unexpected error occurred. Please try again later.'
      };
    }
  }

  /**
   * Get subscription statistics (admin only)
   */
  async getStats(): Promise<SubscriptionStats | null> {
    try {
      const { data, error } = await supabase
        .rpc('get_subscription_stats');

      if (error) {
        console.error('Error getting subscription stats:', error);
        return null;
      }

      return data?.[0] || {
        total_subscribers: 0,
        active_subscribers: 0,
        unsubscribed_count: 0,
        new_this_month: 0
      };
    } catch (error) {
      console.error('Unexpected error getting stats:', error);
      return null;
    }
  }

  /**
   * Get all subscriptions (admin only)
   */
  async getAllSubscriptions(): Promise<EmailSubscription[]> {
    try {
      const { data, error } = await supabase
        .from('email_subscriptions')
        .select('*')
        .order('subscribed_at', { ascending: false });

      if (error) {
        console.error('Error getting subscriptions:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Unexpected error getting subscriptions:', error);
      return [];
    }
  }

  /**
   * Update subscription status (admin only)
   */
  async updateSubscriptionStatus(
    id: string, 
    status: 'active' | 'unsubscribed' | 'bounced'
  ): Promise<SubscriptionResult> {
    try {
      const updateData: any = { status, updated_at: new Date().toISOString() };
      
      if (status === 'unsubscribed') {
        updateData.unsubscribed_at = new Date().toISOString();
      }

      const { data, error } = await supabase
        .from('email_subscriptions')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating subscription:', error);
        return {
          success: false,
          message: 'An error occurred while updating the subscription.'
        };
      }

      return {
        success: true,
        message: 'Subscription updated successfully.',
        subscription: data
      };
    } catch (error) {
      console.error('Unexpected error updating subscription:', error);
      return {
        success: false,
        message: 'An unexpected error occurred. Please try again later.'
      };
    }
  }

  /**
   * Delete a subscription (admin only)
   */
  async deleteSubscription(id: string): Promise<SubscriptionResult> {
    try {
      const { error } = await supabase
        .from('email_subscriptions')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting subscription:', error);
        return {
          success: false,
          message: 'An error occurred while deleting the subscription.'
        };
      }

      return {
        success: true,
        message: 'Subscription deleted successfully.'
      };
    } catch (error) {
      console.error('Unexpected error deleting subscription:', error);
      return {
        success: false,
        message: 'An unexpected error occurred. Please try again later.'
      };
    }
  }
}

export default new EmailService();
