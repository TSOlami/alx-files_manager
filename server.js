import express from 'express';

// Load all routes from routes/index.js
import routes from './routes';

const app = express();
const PORT = process.env.PORT || 5001;

app.use('/', routes);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
