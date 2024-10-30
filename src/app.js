import express from 'express';

const app = express();

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

export default app