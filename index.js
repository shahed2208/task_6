const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;


let data = [];
try {
  const rawdata = fs.readFileSync('data.json');
  data = JSON.parse(rawdata);
} catch (err) {
  console.error(err);
  data = [];
}
   

app.post('/posts', (req, res) => {
    const newPost = req.body;
    newPost.createdAt = new Date().toISOString();
    data.push(newPost);
    fs.writeFileSync('data.json', JSON.stringify(data));
    res.json(newPost);
});

app.put('/posts/:id', (req, res) => {
    const { id } = req.params;
    const updatedPost = req.body;
    data = data.map(post => post.id === parseInt(id) ? updatedPost : post);
    fs.writeFileSync('data.json', JSON.stringify(data));
    res.json(updatedPost);
});

app.delete('/posts/:id', (req, res) => {
    const { id } = req.params;
    data = data.filter(post => post.id !== parseInt(id));
    fs.writeFileSync('data.json', JSON.stringify(data));
    res.json({ message: 'Post deleted' });
})


app.get('/', (req, res) => {
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});