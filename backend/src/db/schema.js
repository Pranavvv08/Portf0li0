const db = require('./pool');

const schema = `
  -- Hero / About
  CREATE TABLE IF NOT EXISTS hero (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    taglines TEXT[] NOT NULL,
    intro TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS about (
    id SERIAL PRIMARY KEY,
    description TEXT NOT NULL,
    quick_facts TEXT[] NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
  );

  -- Skills
  CREATE TABLE IF NOT EXISTS skill_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS skills (
    id SERIAL PRIMARY KEY,
    category_id INT REFERENCES skill_categories(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
  );

  -- Projects
  CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    bullets TEXT[] DEFAULT '{}',
    stack TEXT[] DEFAULT '{}',
    link VARCHAR(512),
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
  );

  -- Education
  CREATE TABLE IF NOT EXISTS education (
    id SERIAL PRIMARY KEY,
    institution VARCHAR(255) NOT NULL,
    degree VARCHAR(512) NOT NULL,
    period VARCHAR(100),
    score VARCHAR(100),
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
  );

  -- Certifications
  CREATE TABLE IF NOT EXISTS certifications (
    id SERIAL PRIMARY KEY,
    title VARCHAR(512) NOT NULL,
    issuer VARCHAR(255),
    date VARCHAR(100),
    link TEXT,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
  );

  -- Courses & Learnings
  CREATE TABLE IF NOT EXISTS courses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    instructor VARCHAR(255),
    takeaway TEXT,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
  );

  -- Contact
  CREATE TABLE IF NOT EXISTS contact (
    id SERIAL PRIMARY KEY,
    message TEXT,
    email VARCHAR(255),
    phone VARCHAR(50),
    location VARCHAR(255),
    linkedin VARCHAR(512),
    github VARCHAR(512),
    footer_tagline TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
  );

  -- Messages (contact form submissions)
  CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(512),
    body TEXT NOT NULL,
    read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
  );
`;

async function migrate() {
  try {
    console.log('🔄 Running database migrations...');
    await db.query(schema);
    console.log('✅ Database schema created successfully');
  } catch (err) {
    console.error('❌ Migration failed:', err.message);
    throw err;
  }
}

module.exports = migrate;

// Run directly with: node src/db/schema.js
if (require.main === module) {
  migrate()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}
