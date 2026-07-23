const express = require('express');
const path = require('path');
const session = require('express-session');
const data = require('./data/data');

const app = express();
const PORT = process.env.PORT || 3000;

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: 'kesbangpol-secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Routes
app.get('/', (req, res) => {
    const beritaTerbaru = data.berita.slice(0, 3);
    const agendaTerbaru = data.agenda.slice(0, 4);
    const fotoTerbaru = data.foto.slice(0, 4);
    res.render('index', {
        currentPage: 'beranda',
        berita: beritaTerbaru,
        agenda: agendaTerbaru,
        foto: fotoTerbaru,
        statistik: data.statistik,
        sambutan: data.sambutan
    });
});

app.get('/profil', (req, res) => {
    res.render('profil', {
        currentPage: 'profil',
        pimpinan: data.pimpinan,
        sejarah: data.sejarah,
        struktur: data.struktur,
        visiMisi: data.visiMisi,
        tugasFungsi: data.tugasFungsi
    });
});

app.get('/berita', (req, res) => {
    res.render('berita', {
        currentPage: 'berita',
        berita: data.berita
    });
});

app.get('/berita/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const berita = data.berita.find(b => b.id === id);
    if (!berita) {
        return res.status(404).render('404', { currentPage: 'error' });
    }
    const beritaTerbaru = data.berita.filter(b => b.id !== id).slice(0, 3);
    res.render('detail-berita', {
        currentPage: 'berita',
        berita: berita,
        beritaTerbaru: beritaTerbaru
    });
});

app.get('/agenda', (req, res) => {
    res.render('agenda', {
        currentPage: 'agenda',
        agenda: data.agenda
    });
});

app.get('/galeri', (req, res) => {
    res.render('galeri', {
        currentPage: 'galeri',
        foto: data.foto
    });
});

app.get('/video', (req, res) => {
    res.render('video', {
        currentPage: 'video',
        video: data.video
    });
});

app.get('/dokumen', (req, res) => {
    res.render('dokumen', {
        currentPage: 'dokumen',
        dokumen: data.dokumen
    });
});

app.get('/saran', (req, res) => {
    res.render('saran', {
        currentPage: 'saran',
        req: req
    });
});

app.post('/saran', (req, res) => {
    const { nama, email, kategori, pesan } = req.body;
    console.log(`📩 Saran/Kritik dari ${nama} (${email}) - ${kategori}: ${pesan}`);
    req.session.saranSuccess = true;
    res.redirect('/saran');
});

// 404
app.use((req, res) => {
    res.status(404).render('404', { currentPage: 'error' });
});

app.listen(PORT, () => {
    console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});