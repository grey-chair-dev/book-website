// Mock admin service for development
export class MockAdminService {
  // Books
  static async getAllBooks() {
    return [
      {
        id: 'heir-of-cebola',
        title: 'The Heir of Cebola',
        series: 'Heirs of Eleusa',
        book_number: 1,
        year: '2024',
        description: 'The first book in the epic Heirs of Eleusa series.',
        full_description: 'In the kingdom of Cebola, where ancient magic flows through the land, a young heir discovers their true destiny.',
        cover: 'heir-of-cebola',
        featured: true,
        characters: ['The Heir', 'Mentor', 'Guardian'],
        themes: ['Destiny', 'Courage', 'Magic', 'Family'],
        quotes: ['Every hero\'s journey begins with a single step into the unknown.'],
        author: 'C.E. Scott',
        genre: ['Fantasy', 'Adventure', 'Young Adult'],
        awards: ['Featured Book of the Month'],
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      }
    ];
  }

  static async createBook(bookData: any) {
    console.log('Creating book:', bookData);
    return { id: 'new-book', ...bookData };
  }

  static async updateBook(id: string, bookData: any) {
    console.log('Updating book:', id, bookData);
    return { id, ...bookData };
  }

  static async deleteBook(id: string) {
    console.log('Deleting book:', id);
    return true;
  }

  // Blog Posts
  static async getAllBlogPosts() {
    return [
      {
        id: 1,
        title: 'The Inspiration Behind Eleusa',
        excerpt: 'Discover how the world of Eleusa came to life.',
        content: 'Once upon a time, there was a little girl who couldn\'t sleep...',
        date: '2024-12-15',
        read_time: '5 min read',
        category: 'Behind the Scenes',
        featured: true,
        tags: ['inspiration', 'writing process', 'personal'],
        author: 'C.E. Scott',
        published: true,
        created_at: '2024-12-15T00:00:00Z',
        updated_at: '2024-12-15T00:00:00Z'
      }
    ];
  }

  static async createBlogPost(postData: any) {
    console.log('Creating blog post:', postData);
    return { id: 2, ...postData };
  }

  static async updateBlogPost(id: number, postData: any) {
    console.log('Updating blog post:', id, postData);
    return { id, ...postData };
  }

  static async deleteBlogPost(id: number) {
    console.log('Deleting blog post:', id);
    return true;
  }

  // Author
  static async getAuthor() {
    return {
      id: 1,
      name: 'C.E. Scott',
      full_name: 'Claire Scott',
      bio: 'Claire Scott is a wife, high school campus minister, and fantasy author living in Cincinnati, OH.',
      image: '/images/author/ce-scott.avif',
      location: 'Cincinnati, Ohio',
      education: ['Purdue University (2019)', 'Notre Dame Master\'s in Theology (2021)'],
      personal: ['Wife to Charlie', 'Two cats and lots of laughter'],
      writing_journey: ['Started with bedtime stories', 'Christmas Eve storytelling tradition'],
      social_media: {
        website: 'https://heirsofeleusa.com',
        email: 'claire@heirsofeleusa.com'
      },
      stats: {
        books_in_series: 3,
        kingdoms: '5+',
        heroes: 'Multiple'
      },
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    };
  }

  static async updateAuthor(authorData: any) {
    console.log('Updating author:', authorData);
    return authorData;
  }

  // Comments
  static async getAllComments() {
    return [];
  }

  static async approveComment(id: number) {
    console.log('Approving comment:', id);
    return true;
  }

  static async rejectComment(id: number) {
    console.log('Rejecting comment:', id);
    return true;
  }

  static async deleteComment(id: number) {
    console.log('Deleting comment:', id);
    return true;
  }

  // Edit History
  static async getEditHistory() {
    return [];
  }

  static async undoEdit(editId: number) {
    console.log('Undoing edit:', editId);
    return true;
  }

  // Author
  static async createAuthor(authorData: any) {
    console.log('Creating author:', authorData);
    return { id: 1, ...authorData };
  }

  // Comments
  static async updateCommentStatus(commentId: number, status: 'approved' | 'rejected') {
    console.log('Updating comment status:', commentId, status);
    return true;
  }
}

export const mockAdminService = MockAdminService;
