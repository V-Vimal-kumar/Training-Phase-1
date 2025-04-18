import express from 'express';

const app = express();
const PORT = 3000;

const log=(req,res,next)=>{
    const timestamp=new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next();
};

app.use(log);

app.get('/',(req,res)=>{
    res.send('home page')
})

app.get('/about', (req, res) => {
    res.send('About Page');
  });
  
  app.post('/contact', (req, res) => {
    res.send('Contact Form Submitted');
  });
  
  app.get('/products/:id', (req, res) => {
    res.send(`Product ID: ${req.params.id}`);
  });
  
  app.use((req, res) => {
    res.status(404).send('404 - Not Found');
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });