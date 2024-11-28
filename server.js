const express = require('express');
const path = require('path');
const app = express();

// Serve API routes
app.use('/api', require('./api-routes'));

// Serve static Angular files
app.use(express.static(path.join(__dirname, 'dist/pdf-renderer')));

// Handle Angular routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/pdf-renderer/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 