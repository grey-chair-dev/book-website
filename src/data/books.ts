export interface Book {
  id: string;
  title: string;
  series: string;
  bookNumber: number;
  year: string;
  description: string;
  fullDescription: string;
  rating: number;
  cover: string;
  featured: boolean;
  characters: string[];
  themes: string[];
  quotes: string[];
  author: string;
  publisher?: string;
  isbn?: string;
  pages?: number;
  genre: string[];
  awards?: string[];
}

export const books: Book[] = [
  {
    id: 'the-heir-of-cebola',
    title: 'The Heir of Cebola',
    series: 'Heirs of Eleusa',
    bookNumber: 1,
    year: '2024',
    description: 'The first book in the epic Heirs of Eleusa series, introducing readers to the world of Eleusa and the Great Prophecy that will shape the fate of kingdoms.',
    fullDescription: 'Step into the world of Eleusa, where the Great Prophecy foretells of heroes who must claim their destinies to save the kingdoms of the west. In this first installment, readers are introduced to the rich tapestry of kingdoms, magic, and the ancient prophecy that will determine the fate of all.',
    rating: 5,
    cover: 'the-heir-of-cebola',
    featured: false,
    characters: ['Thomas', 'Natalya', 'King Waldus', 'The Sorcerer King'],
    themes: ['Destiny', 'Heroism', 'Magic', 'Prophecy', 'Adventure'],
    quotes: [
      "The Great Prophecy speaks of heroes who will rise when the world needs them most.",
      "In the kingdom of Cebola, legends speak of an heir who will return to claim his throne.",
      "Magic flows through the very fabric of Eleusa, waiting for those brave enough to wield it."
    ],
    author: 'C.E. Scott',
    genre: ['Fantasy', 'Young Adult', 'Epic Fantasy'],
    awards: ['Epic Fantasy Debut']
  },
  {
    id: 'the-fox-prince',
    title: 'The Fox Prince',
    series: 'Heirs of Eleusa',
    bookNumber: 2,
    year: '2024',
    description: 'As war advances on the countryside of Azora, Thomas learns he is the heir to the throne of Cebola and must make a dangerous journey to reclaim his homeland.',
    fullDescription: 'As war advances on the countryside of Azora, Thomas and his friends prepare for everything to change as the Kalari invade. But when Thomas learns that he is the heir to the throne of a kingdom called Cebola that everyone believes is a myth, Thomas must make a dangerous journey to his homeland to reclaim his throne. Pursued and challenged by the Kalari forces and his own insecurities, will Thomas find the courage to claim his identity and free his people?',
    rating: 5,
    cover: 'fox-prince',
    featured: false,
    characters: ['Thomas', 'Natalya', 'Kalari Forces', 'Cebola Citizens'],
    themes: ['Identity', 'Courage', 'War', 'Homecoming', 'Sacrifice'],
    quotes: [
      "Sometimes the greatest battles are fought within ourselves.",
      "A true king is not born, but made through the choices he makes.",
      "The path to destiny is never easy, but it is always worth taking."
    ],
    author: 'C.E. Scott',
    genre: ['Fantasy', 'Young Adult', 'Epic Fantasy'],
    awards: ['Epic Fantasy Series']
  },
  {
    id: 'the-storm-veiled-light',
    title: 'The Storm-Veiled Light',
    series: 'Heirs of Eleusa',
    bookNumber: 3,
    year: '2025',
    description: 'The epic conclusion as Thomas fights for freedom in Cebola while Natalya faces trial for treason, and the final heir emerges to unite against the sorcerer king.',
    fullDescription: 'Thomas continues to fight for freedom in Cebola while Natalya awaits her trial for treason. A figure from the shadows steps into the light. In far away Montressar, the final heir to the Great Prophecy emerges to claim his throne. As events come to head, the sorcerer king of Kalar has gathered his strength and soon all of Eleusa will fall under his dread shadow. In the face of great evil, can these heroes become all they were meant to be and unite to save their world?',
    rating: 5,
    cover: 'the-storm-veiled-light',
    featured: false,
    characters: ['Thomas', 'Natalya', 'The Final Heir', 'The Sorcerer King', 'Montressar Citizens'],
    themes: ['Unity', 'Sacrifice', 'Final Battle', 'Redemption', 'Hope'],
    quotes: [
      "In the darkest hour, light shines brightest.",
      "When heroes unite, even the greatest evil cannot stand against them.",
      "The storm may rage, but the light will always find a way through."
    ],
    author: 'C.E. Scott',
    genre: ['Fantasy', 'Young Adult', 'Epic Fantasy'],
    awards: ['Epic Fantasy Conclusion']
  }
];

export const getBookById = (id: string): Book | undefined => {
  return books.find(book => book.id === id);
};

export const getBooksBySeries = (series: string): Book[] => {
  return books.filter(book => book.series === series);
};
