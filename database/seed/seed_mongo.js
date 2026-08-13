const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const User = require('../../server/models/User');
const Career = require('../../server/models/Career');
const Skill = require('../../server/models/Skill');
const Resource = require('../../server/models/Resource');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for Seeding');

    await User.deleteMany();
    await Career.deleteMany();
    await Skill.deleteMany();
    await Resource.deleteMany();

    // 1. Create Demo Users
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash('Student@123', salt);
    const hashAdmin = await bcrypt.hash('Admin@123', salt);
    
    await User.create([
      { name: 'Demo Student', email: 'student@example.com', password: hash, role: 'student', xp: 450, streak: 3 },
      { name: 'Admin User', email: 'admin@example.com', password: hashAdmin, role: 'admin' }
    ]);

    // 2. Create Skills
    const htmlCss = await Skill.create({ name: 'HTML/CSS', description: 'Web building blocks', category: 'Frontend' });
    const js = await Skill.create({ name: 'JavaScript', description: 'Web programming', category: 'Frontend' });
    const react = await Skill.create({ name: 'React', description: 'UI library', category: 'Frontend' });
    const node = await Skill.create({ name: 'Node.js', description: 'JS Runtime', category: 'Backend' });
    const express = await Skill.create({ name: 'Express.js', description: 'Web framework', category: 'Backend' });
    const mongodb = await Skill.create({ name: 'MongoDB', description: 'NoSQL Database', category: 'Database' });
    const rest = await Skill.create({ name: 'REST APIs', description: 'API architecture', category: 'Backend' });

    // 3. Create Careers
    await Career.create([
      {
        title: 'Full Stack Developer',
        description: 'Build complete web applications from frontend to backend.',
        difficulty: 'Advanced',
        estimatedDuration: '6 months',
        requiredSkills: [
          { skillId: htmlCss._id, minProficiency: 'Intermediate' },
          { skillId: js._id, minProficiency: 'Advanced' },
          { skillId: react._id, minProficiency: 'Intermediate' },
          { skillId: node._id, minProficiency: 'Intermediate' },
          { skillId: express._id, minProficiency: 'Intermediate' },
          { skillId: mongodb._id, minProficiency: 'Intermediate' },
          { skillId: rest._id, minProficiency: 'Advanced' }
        ]
      },
      {
        title: 'Frontend Developer',
        description: 'Build interactive user interfaces.',
        difficulty: 'Intermediate',
        estimatedDuration: '4 months',
        requiredSkills: [
          { skillId: htmlCss._id, minProficiency: 'Advanced' },
          { skillId: js._id, minProficiency: 'Advanced' },
          { skillId: react._id, minProficiency: 'Advanced' }
        ]
      }
    ]);

    // 4. Create Resources
    await Resource.create([
      { title: 'HTML & CSS Crash Course', url: 'https://example.com/html', type: 'Video', difficulty: 'Beginner', skillId: htmlCss._id, tags: ['html', 'css', 'basics'] },
      { title: 'Advanced JavaScript', url: 'https://example.com/js', type: 'Course', difficulty: 'Advanced', skillId: js._id, tags: ['js', 'closures', 'promises'] },
      { title: 'React Hooks Deep Dive', url: 'https://example.com/react', type: 'Tutorial', difficulty: 'Intermediate', skillId: react._id, tags: ['react', 'hooks', 'state management'] },
      { title: 'Node.js Masterclass', url: 'https://example.com/node', type: 'Course', difficulty: 'Intermediate', skillId: node._id, tags: ['backend', 'server'] }
    ]);

    console.log('Database seeded successfully!');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDB();
