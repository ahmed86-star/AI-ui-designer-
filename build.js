// Vercel build script
const { execSync } = require('child_process');

try {
  console.log('Building frontend with Vite...');
  execSync('vite build', { stdio: 'inherit' });
  console.log('Frontend build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}