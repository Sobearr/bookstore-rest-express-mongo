import express from 'express';

const app = express();
app.use(express.json());

const livros = [
    {
        id: 1,
        'title': 'The Lord Of The Rings'
    },
    {
        id: 2,
        'title': 'The Hobbit'
    }
];

app.get('/', (req, res) => {
    res.status(200).send('Curso de Node.js');
});

app.get('/livros', (req, res) => {
    res.status(200).json(livros);
});

app.post('/livros', (req, res) => {
    livros.push(req.body);
    res.status(201).send('Book registered successfully.');
});

export default app