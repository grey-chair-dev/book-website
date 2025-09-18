// Mock email service for development
export interface SubscriptionResult {
  success: boolean;
  message: string;
  subscription?: any;
}

export class MockEmailService {
  static async subscribe(email: string, source: string = 'website'): Promise<SubscriptionResult> {
    console.log('Subscribing email:', email, 'from source:', source);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      success: true,
      message: 'Thank you for subscribing! You will receive updates about new blog posts and book releases.',
      subscription: {
        id: Math.floor(Math.random() * 1000),
        email: email,
        source: source,
        status: 'active',
        subscribed_at: new Date().toISOString()
      }
    };
  }

  static async unsubscribe(email: string): Promise<SubscriptionResult> {
    console.log('Unsubscribing email:', email);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      success: true,
      message: 'You have been successfully unsubscribed from our newsletter.'
    };
  }

  static async getSubscriptionStats(): Promise<any> {
    return {
      total_subscribers: 1250,
      active_subscribers: 1180,
      unsubscribed: 70,
      new_this_month: 45
    };
  }

  static async getAllSubscriptions(): Promise<any[]> {
    return [
      {
        id: 1,
        email: 'subscriber1@example.com',
        source: 'website',
        status: 'active',
        subscribed_at: '2024-01-15T10:00:00Z'
      },
      {
        id: 2,
        email: 'subscriber2@example.com',
        source: 'blog',
        status: 'active',
        subscribed_at: '2024-02-20T14:30:00Z'
      }
    ];
  }
}

export default MockEmailService;
