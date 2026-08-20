const db = require('./pool');
const migrate = require('./schema');
const path = require('path');
const fs = require('fs');

const contentPath = path.join(__dirname, '..', '..', '..', 'content.json');

async function seed() {
  try {
    // Run migrations first
    await migrate();

    const content = JSON.parse(fs.readFileSync(contentPath, 'utf-8'));
    console.log('🌱 Seeding database with content.json...');

    // Clear existing data (in reverse dependency order)
    await db.query('DELETE FROM messages');
    await db.query('DELETE FROM skills');
    await db.query('DELETE FROM skill_categories');
    await db.query('DELETE FROM projects');
    await db.query('DELETE FROM education');
    await db.query('DELETE FROM courses');
    await db.query('DELETE FROM certifications');
    await db.query('DELETE FROM contact');
    await db.query('DELETE FROM about');
    await db.query('DELETE FROM hero');

    // Seed hero
    await db.query(
      'INSERT INTO hero (name, taglines, intro) VALUES ($1, $2, $3)',
      [content.hero.name, content.hero.taglines, content.hero.intro]
    );
    console.log('  ✓ Hero');

    // Seed about
    await db.query(
      'INSERT INTO about (description, quick_facts) VALUES ($1, $2)',
      [content.about.description, content.about.quickFacts]
    );
    console.log('  ✓ About');

    // Seed skills
    const categories = Object.keys(content.skills);
    for (let i = 0; i < categories.length; i++) {
      const catName = categories[i];
      const catResult = await db.query(
        'INSERT INTO skill_categories (name, display_order) VALUES ($1, $2) RETURNING id',
        [catName, i]
      );
      const catId = catResult.rows[0].id;

      const skillsInCategory = content.skills[catName];
      for (let j = 0; j < skillsInCategory.length; j++) {
        await db.query(
          'INSERT INTO skills (category_id, name, display_order) VALUES ($1, $2, $3)',
          [catId, skillsInCategory[j], j]
        );
      }
    }
    console.log('  ✓ Skills');

    // Seed projects
    for (let i = 0; i < content.projects.length; i++) {
      const p = content.projects[i];
      await db.query(
        'INSERT INTO projects (title, description, bullets, stack, link, display_order) VALUES ($1, $2, $3, $4, $5, $6)',
        [p.title, p.description, p.bullets || [], p.stack || [], p.link || null, i]
      );
    }
    console.log('  ✓ Projects');

    // Seed education
    for (let i = 0; i < content.education.length; i++) {
      const e = content.education[i];
      await db.query(
        'INSERT INTO education (institution, degree, period, score, display_order) VALUES ($1, $2, $3, $4, $5)',
        [e.institution, e.degree, e.period, e.score, i]
      );
    }
    console.log('  ✓ Education');

    // Seed certifications
    for (let i = 0; i < content.certifications.length; i++) {
      const c = content.certifications[i];
      await db.query(
        'INSERT INTO certifications (title, issuer, date, link, display_order) VALUES ($1, $2, $3, $4, $5)',
        [c.title, c.issuer, c.date, c.link || null, i]
      );
    }
    console.log('  ✓ Certifications');

    // Seed courses
    for (let i = 0; i < content.courses.length; i++) {
      const cr = content.courses[i];
      await db.query(
        'INSERT INTO courses (title, instructor, takeaway, display_order) VALUES ($1, $2, $3, $4)',
        [cr.title, cr.instructor, cr.takeaway, i]
      );
    }
    console.log('  ✓ Courses');

    // Seed contact
    const ct = content.contact;
    await db.query(
      'INSERT INTO contact (message, email, phone, location, linkedin, github, footer_tagline) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [ct.message, ct.email, ct.phone, ct.location, ct.linkedin, ct.github, ct.footerTagline]
    );
    console.log('  ✓ Contact');

    console.log('✅ Database seeded successfully!');
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
    throw err;
  } finally {
    await db.pool.end();
  }
}

seed()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
