-- Simple Database Setup for Heirs of Eleusa CMS
-- Run this in your Supabase SQL Editor

-- 1. Create books table
CREATE TABLE IF NOT EXISTS books (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  series TEXT NOT NULL,
  book_number INTEGER NOT NULL,
  year TEXT NOT NULL,
  description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  cover TEXT NOT NULL,
  featured BOOLEAN DEFAULT false,
  characters TEXT[] DEFAULT '{}',
  themes TEXT[] DEFAULT '{}',
  quotes TEXT[] DEFAULT '{}',
  author TEXT NOT NULL,
  genre TEXT[] DEFAULT '{}',
  awards TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  date DATE NOT NULL,
  read_time TEXT NOT NULL,
  category TEXT NOT NULL,
  featured BOOLEAN DEFAULT false,
  tags TEXT[] DEFAULT '{}',
  author TEXT NOT NULL,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create author table
CREATE TABLE IF NOT EXISTS author (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  full_name TEXT NOT NULL,
  bio TEXT NOT NULL,
  image TEXT NOT NULL,
  location TEXT NOT NULL,
  education TEXT[] DEFAULT '{}',
  personal TEXT[] DEFAULT '{}',
  writing_journey TEXT[] DEFAULT '{}',
  social_media JSONB NOT NULL DEFAULT '{}',
  stats JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Insert sample books
INSERT INTO books (id, title, series, book_number, year, description, full_description, cover, featured, characters, themes, quotes, author, genre, awards) VALUES
('heir-of-cebola', 'The Heir of Cebola', 'Heirs of Eleusa', 1, '2024', 'The first book in the epic Heirs of Eleusa series, following the journey of a young hero who must claim their destiny.', 'In the kingdom of Cebola, where ancient magic flows through the land, a young heir discovers their true destiny. When the Great Prophecy begins to unfold, they must choose between safety and the call to adventure that will change their world forever.', 'heir-of-cebola', true, '{"The Heir", "Mentor", "Guardian"}', '{"Destiny", "Courage", "Magic", "Family"}', '{"Every hero''s journey begins with a single step into the unknown.", "The greatest magic is found not in spells, but in the choices we make."}', 'C.E. Scott', '{"Fantasy", "Adventure", "Young Adult"}', '{"Featured Book of the Month"}'),
('fox-prince', 'The Fox Prince', 'Heirs of Eleusa', 2, '2024', 'The second installment where alliances are tested and new powers emerge in the world of Eleusa.', 'As the Heir''s journey continues, they discover that not all who claim to be allies can be trusted. The Fox Prince emerges as both friend and foe, testing the hero''s resolve and revealing deeper mysteries about the Great Prophecy.', 'fox-prince', false, '{"The Heir", "Fox Prince", "Ancient Guardian"}', '{"Trust", "Betrayal", "Wisdom", "Power"}', '{"In the game of thrones, even foxes have their reasons.", "True power comes not from what you can take, but what you choose to give."}', 'C.E. Scott', '{"Fantasy", "Political Intrigue", "Young Adult"}', '{}'),
('storm-veiled-light', 'The Storm-Veiled Light', 'Heirs of Eleusa', 3, '2024', 'The epic conclusion where all heroes unite against the darkness threatening to consume Eleusa.', 'In the final chapter of the Heirs of Eleusa series, the Great Prophecy reaches its climax. The Heir must gather all the chosen ones and face the ultimate evil that threatens to destroy everything they hold dear. The fate of Eleusa hangs in the balance.', 'storm-veiled-light', false, '{"The Heir", "All Chosen Ones", "The Dark Sorcerer"}', '{"Sacrifice", "Unity", "Hope", "Redemption"}', '{"When the storm comes, the light within us shines brightest.", "Together, we are more than the sum of our parts."}', 'C.E. Scott', '{"Fantasy", "Epic", "Young Adult"}', '{"Series Finale"}');

-- 5. Insert sample blog posts
INSERT INTO blog_posts (title, excerpt, content, date, read_time, category, featured, tags, author, published) VALUES
('The Inspiration Behind Eleusa', 'Discover how the world of Eleusa came to life from bedtime stories to epic fantasy series.', 'Once upon a time, there was a little girl who couldn''t sleep. So she started telling herself stories to keep her mind off of the real world. And, well, that''s how the world of Eleusa was born.

It grew as I improved on those initial stories, the characters moved into my head, and I started sharing the stories (badly!) with my siblings to keep us entertained while not sleeping in anticipation of Christmas morning.

If it wasn''t for their encouragement and the encouragement of some friends from college and beyond, (and lots of well-placed Holy Spirit inspiration!) Eleusa as you know probably would not exist.', '2024-12-15', '5 min read', 'Behind the Scenes', true, '{"inspiration", "writing process", "personal"}', 'C.E. Scott', true),
('Writing Fantasy with Purpose', 'Exploring how faith and fantasy can work together to tell meaningful stories.', 'Fantasy literature has always been a powerful medium for exploring deep truths about human nature, morality, and the eternal struggle between good and evil. In the Heirs of Eleusa series, I wanted to create a world where these themes could be explored in a way that resonates with readers of all ages.

Writing fantasy with purpose means more than just creating an entertaining story—it means crafting a narrative that speaks to the heart and challenges the mind. Each character''s journey reflects real struggles we all face, and the magical elements serve to amplify these human experiences.', '2024-12-10', '7 min read', 'Writing Process', false, '{"writing", "faith", "fantasy", "purpose"}', 'C.E. Scott', true),
('Character Development: Creating Heroes', 'The process of crafting characters that readers can connect with and root for.', 'Creating compelling characters is one of the most challenging and rewarding aspects of writing fantasy. In the Heirs of Eleusa series, each character represents different aspects of the hero''s journey, from the reluctant hero to the wise mentor to the loyal companion.

What makes a character truly memorable isn''t their powers or abilities, but their humanity. Their flaws, their growth, their relationships with others—these are the elements that make readers care about their fate.', '2024-12-05', '6 min read', 'Writing Process', false, '{"characters", "development", "heroes", "writing"}', 'C.E. Scott', true);

-- 6. Insert author info
INSERT INTO author (name, full_name, bio, image, location, education, personal, writing_journey, social_media, stats) VALUES
('C.E. Scott', 'Claire Scott', 'Claire Scott is a wife, high school campus minister, and fantasy author living in Cincinnati, OH. She graduated from Purdue University in 2019 and discerned a call to serve the Church through the Echo Program at the University of Notre Dame. She graduated with a master''s in Theology in 2021 and now loves helping to form her high schoolers, write good, true, and beautiful stories, cook for her husband, Charlie, and laugh at the antics of their two cats.', '/images/author/ce-scott.avif', 'Cincinnati, Ohio', '{"Purdue University (2019)", "Notre Dame Master''s in Theology (2021)", "Echo Program Graduate"}', '{"Wife to Charlie", "Two cats and lots of laughter", "Loves cooking and storytelling"}', '{"Started with bedtime stories", "Christmas Eve storytelling tradition", "Holy Spirit inspired"}', '{"website": "https://heirsofeleusa.com", "email": "claire@heirsofeleusa.com", "books_email": "books@heirsofeleusa.com"}', '{"books_in_series": 3, "kingdoms": "5+", "heroes": "Multiple", "prophecy": "Great"}');

-- 7. Enable Row Level Security
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE author ENABLE ROW LEVEL SECURITY;

-- 8. Create policies for public read access
CREATE POLICY "Books are viewable by everyone" ON books FOR SELECT USING (true);
CREATE POLICY "Published blog posts are viewable by everyone" ON blog_posts FOR SELECT USING (published = true);
CREATE POLICY "Author info is viewable by everyone" ON author FOR SELECT USING (true);

-- 9. Create policies for admin access
CREATE POLICY "Authenticated users can manage books" ON books FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage blog posts" ON blog_posts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage author" ON author FOR ALL USING (auth.role() = 'authenticated');
