import express from 'express';

// Load all routes from routes/index.js
import routes from './routes';

const app = express();
const PORT = process.env.PORT || 5000;

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
