const path = require('path');
const mongoose = require('mongoose');
const { User } = require('@librechat/data-schemas').createModels(mongoose);
require('module-alias')({ base: path.resolve(__dirname, '..', 'api') });
const { registerUser } = require('~/server/services/AuthService');
const connect = require('./connect');

const DEFAULT_EMAIL = process.env.INIT_USER_EMAIL || 'admin@cognition.dev';
const DEFAULT_NAME = process.env.INIT_USER_NAME || 'Admin';
const DEFAULT_USERNAME = process.env.INIT_USER_USERNAME || 'admin';
const DEFAULT_PASSWORD = process.env.INIT_USER_PASSWORD || 'admin123456';

(async () => {
  try {
    await connect();

    const userCount = await User.countDocuments();
    if (userCount > 0) {
      console.log('[init-user] Users already exist, skipping default user creation.');
      process.exit(0);
    }

    console.log('[init-user] No users found. Creating default admin user...');

    const user = {
      email: DEFAULT_EMAIL,
      password: DEFAULT_PASSWORD,
      name: DEFAULT_NAME,
      username: DEFAULT_USERNAME,
      confirm_password: DEFAULT_PASSWORD,
    };

    const result = await registerUser(user, { emailVerified: true });

    if (result.status !== 200) {
      console.error('[init-user] Error creating user:', result.message);
      process.exit(1);
    }

    // Promote to admin
    const createdUser = await User.findOne({ email: DEFAULT_EMAIL });
    if (createdUser) {
      createdUser.role = 'ADMIN';
      await createdUser.save();
      console.log('[init-user] ==========================================');
      console.log('[init-user] Default admin user created successfully!');
      console.log('[init-user] Email:', DEFAULT_EMAIL);
      console.log('[init-user] Password:', DEFAULT_PASSWORD);
      console.log('[init-user] Username:', DEFAULT_USERNAME);
      console.log('[init-user] ==========================================');
      console.log('[init-user] IMPORTANT: Change the default password after first login!');
    }

    process.exit(0);
  } catch (error) {
    console.error('[init-user] Fatal error:', error.message);
    process.exit(1);
  }
})();
