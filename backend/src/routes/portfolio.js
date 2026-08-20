const { Router } = require('express');
const db = require('../db/pool');

const router = Router();

// GET /api/hero
router.get('/hero', async (req, res, next) => {
  try {
    const { rows } = await db.query('SELECT * FROM hero LIMIT 1');
    if (rows.length === 0) return res.status(404).json({ error: 'Hero not found' });
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});

// GET /api/about
router.get('/about', async (req, res, next) => {
  try {
    const { rows } = await db.query('SELECT * FROM about LIMIT 1');
    if (rows.length === 0) return res.status(404).json({ error: 'About not found' });
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});

// GET /api/skills
router.get('/skills', async (req, res, next) => {
  try {
    const { rows: categories } = await db.query(
      'SELECT * FROM skill_categories ORDER BY display_order'
    );
    const { rows: skills } = await db.query(
      'SELECT * FROM skills ORDER BY display_order'
    );

    // Group skills by category
    const result = {};
    for (const cat of categories) {
      result[cat.name] = skills
        .filter(s => s.category_id === cat.id)
        .map(s => s.name);
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// GET /api/projects
router.get('/projects', async (req, res, next) => {
  try {
    const { rows } = await db.query(
      'SELECT * FROM projects ORDER BY display_order'
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

// GET /api/projects/:id
router.get('/projects/:id', async (req, res, next) => {
  try {
    const { rows } = await db.query('SELECT * FROM projects WHERE id = $1', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Project not found' });
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});

// GET /api/education
router.get('/education', async (req, res, next) => {
  try {
    const { rows } = await db.query(
      'SELECT * FROM education ORDER BY display_order'
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

// GET /api/certifications
router.get('/certifications', async (req, res, next) => {
  try {
    const { rows } = await db.query(
      'SELECT * FROM certifications ORDER BY display_order'
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

// GET /api/courses
router.get('/courses', async (req, res, next) => {
  try {
    const { rows } = await db.query(
      'SELECT * FROM courses ORDER BY display_order'
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

// GET /api/contact
router.get('/contact', async (req, res, next) => {
  try {
    const { rows } = await db.query('SELECT * FROM contact LIMIT 1');
    if (rows.length === 0) return res.status(404).json({ error: 'Contact not found' });
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});

// POST /api/messages — contact form submissions
router.post('/messages', async (req, res, next) => {
  try {
    const { name, email, subject, body } = req.body;

    if (!name || !email || !body) {
      return res.status(400).json({ error: 'name, email, and body are required' });
    }

    const { rows } = await db.query(
      'INSERT INTO messages (name, email, subject, body) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, subject || null, body]
    );

    res.status(201).json(rows[0]);
  } catch (err) {
    next(err);
  }
});

// GET /api/content — returns the full portfolio content in one call (optimized for frontend)
router.get('/content', async (req, res, next) => {
  try {
    const [heroRes, aboutRes, skillCatRes, skillsRes, projectsRes, educationRes, certsRes, coursesRes, contactRes] =
      await Promise.all([
        db.query('SELECT * FROM hero LIMIT 1'),
        db.query('SELECT * FROM about LIMIT 1'),
        db.query('SELECT * FROM skill_categories ORDER BY display_order'),
        db.query('SELECT * FROM skills ORDER BY display_order'),
        db.query('SELECT * FROM projects ORDER BY display_order'),
        db.query('SELECT * FROM education ORDER BY display_order'),
        db.query('SELECT * FROM certifications ORDER BY display_order'),
        db.query('SELECT * FROM courses ORDER BY display_order'),
        db.query('SELECT * FROM contact LIMIT 1'),
      ]);

    // Group skills by category
    const skills = {};
    for (const cat of skillCatRes.rows) {
      skills[cat.name] = skillsRes.rows
        .filter(s => s.category_id === cat.id)
        .map(s => s.name);
    }

    const hero = heroRes.rows[0] || null;
    const aboutRaw = aboutRes.rows[0] || null;
    const contactRaw = contactRes.rows[0] || null;

    // Normalize about: quick_facts → quickFacts
    const about = aboutRaw ? {
      description: aboutRaw.description,
      quickFacts: aboutRaw.quick_facts,
    } : null;

    // Normalize contact: footer_tagline → footerTagline
    const contact = contactRaw ? {
      message: contactRaw.message,
      email: contactRaw.email,
      phone: contactRaw.phone,
      location: contactRaw.location,
      linkedin: contactRaw.linkedin,
      github: contactRaw.github,
      footerTagline: contactRaw.footer_tagline,
    } : null;

    res.json({
      hero,
      about,
      skills,
      projects: projectsRes.rows,
      education: educationRes.rows,
      certifications: certsRes.rows,
      courses: coursesRes.rows,
      contact,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
