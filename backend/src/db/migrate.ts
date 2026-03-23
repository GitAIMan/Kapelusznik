import { pool } from "./index";

export async function migrate() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      excerpt TEXT NOT NULL,
      content TEXT NOT NULL DEFAULT '',
      date DATE NOT NULL,
      image TEXT,
      slug TEXT UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `);

  // Seed only if table is empty
  const { rows } = await pool.query("SELECT COUNT(*) FROM blog_posts");
  if (parseInt(rows[0].count) === 0) {
    await pool.query(`
      INSERT INTO blog_posts (title, excerpt, content, date, image, slug) VALUES
      ('Festiwal Ognia w Bielsku-Białej 2025',
       'Relacja z naszego największego występu tego roku. Trzy dni pełne ognia, akrobatyki i niezapomnianych emocji.',
       'Pełna treść posta o Festiwalu Ognia...',
       '2025-09-15', '/images/blog/placeholder-1.jpg', 'festiwal-ognia-2025'),
      ('Nowi artyści w kolektywie',
       'Poznajcie nowych członków Kapelusznika — utalentowanych akrobatów i żonglerów, którzy dołączyli do naszej ekipy.',
       'Pełna treść posta o nowych artystach...',
       '2025-08-02', '/images/blog/placeholder-2.jpg', 'nowi-artysci'),
      ('Za kulisami: jak przygotowujemy pokaz',
       'Zaglądamy za kulisy naszych przygotowań. Od pierwszych prób po finałowy występ — jak wygląda nasza praca.',
       'Pełna treść posta za kulisami...',
       '2025-06-20', '/images/blog/placeholder-3.jpg', 'za-kulisami')
    `);
    console.log("Seeded 3 blog posts");
  }

  console.log("Database migration completed");
}
