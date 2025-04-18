import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

app.get('/error', (req, res) => {
  throw new Error('This is a simulated error!');
});

app.get('/users/:id', (req, res, next) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    const error = new Error('User not found');
    error.status = 404;
    return next(error);
  }
  res.json(user);
});

app.get('/async-error', async (req, res, next) => {
  try {
    await Promise.reject(new Error('Async operation failed'));
  } catch (err) {
    return next(err);
  }
});

app.post('/users', (req, res, next) => {
  const { name } = req.body;
  
  if (!name) {
    const error = new Error('Name is required');
    error.status = 400;
    return next(error);
  }
  
  const newUser = {
    id: users.length + 1,
    name
  };
  
  users.push(newUser);
  res.status(201).json(newUser);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});


app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  err.status = err.status || 500;
  
  if (!isProduction) {
    console.error(err.stack);
  }
  
  const isApiRequest = req.get('Accept')?.includes('application/json');
  
  if (isApiRequest) {
    res.status(err.status).json({
      error: {
        message: err.message,
        status: err.status,
        ...(!isProduction && { stack: err.stack })
      }
    });
  } else {
    res.status(err.status);
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Error ${err.status}</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
            h1 { color: #d32f2f; }
            pre { text-align: left; background: #f5f5f5; padding: 15px; border-radius: 5px; }
            .home-link { margin-top: 20px; }
          </style>
        </head>
        <body>
          <h1>Error ${err.status}</h1>
          <p>${err.message}</p>
          ${!isProduction ? `<pre>${err.stack}</pre>` : ''}
          <div class="home-link">
            <a href="/">Return Home</a>
          </div>
        </body>
      </html>
    `);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Environment: ${isProduction ? 'Production' : 'Development'}`);
});