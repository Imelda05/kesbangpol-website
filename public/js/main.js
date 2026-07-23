// ===== SLIDER =====
let slideIndex = 0;
const slides = document.querySelectorAll('.hero-slider .slide');
const dots = document.querySelectorAll('#sliderDots span');

function showSlide(index) {
    slides.forEach((s, i) => s.classList.toggle('active', i === index));
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
    slideIndex = index;
}

document.getElementById('sliderNext')?.addEventListener('click', () => {
    showSlide((slideIndex + 1) % slides.length);
});

document.getElementById('sliderPrev')?.addEventListener('click', () => {
    showSlide((slideIndex - 1 + slides.length) % slides.length);
});

dots.forEach((d, i) => d.addEventListener('click', () => showSlide(i)));

let slideInterval = setInterval(() => {
    showSlide((slideIndex + 1) % slides.length);
}, 5000);

document.querySelector('.hero-slider')?.addEventListener('mouseenter', () => clearInterval(slideInterval));
document.querySelector('.hero-slider')?.addEventListener('mouseleave', () => {
    slideInterval = setInterval(() => {
        showSlide((slideIndex + 1) % slides.length);
    }, 5000);
});

// ===== SAMBUTAN READ MORE =====
const sambutanText = document.getElementById('sambutanText');
const sambutanToggle = document.getElementById('sambutanToggle');

if (sambutanToggle && sambutanText) {
    sambutanToggle.addEventListener('click', () => {
        const expanded = sambutanText.classList.toggle('expanded');
        sambutanToggle.innerHTML = expanded ?
            'Sembunyikan <i class="fas fa-chevron-up"></i>' :
            'Baca selengkapnya <i class="fas fa-chevron-down"></i>';
    });
}

// ===== MOBILE MENU =====
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('open');
        });

        document.addEventListener('click', function(e) {
            if (!e.target.closest('.navbar')) {
                navMenu.classList.remove('open');
            }
        });

        navMenu.querySelectorAll('a').forEach(function(a) {
            a.addEventListener('click', function() {
                navMenu.classList.remove('open');
            });
        });
    }

    // ===== DROPDOWN MOBILE =====
    const dropdownProfil = document.getElementById('dropdownProfil');
    const dropdownDokumentasi = document.getElementById('dropdownDokumentasi');

    if (dropdownProfil) {
        const link = dropdownProfil.querySelector('a[href="/profil"]');
        if (link) {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdownProfil.classList.toggle('open');
                }
            });
        }
    }

    if (dropdownDokumentasi) {
        const link = dropdownDokumentasi.querySelector('a[href="/galeri"]');
        if (link) {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdownDokumentasi.classList.toggle('open');
                }
            });
        }
    }
});

// ===== FORM SARAN =====
const formSaran = document.getElementById('formSaran');
if (formSaran) {
    formSaran.addEventListener('submit', function(e) {
        e.preventDefault();
        const nama = document.getElementById('saranNama').value.trim();
        const email = document.getElementById('saranEmail').value.trim();
        const pesan = document.getElementById('saranPesan').value.trim();

        if (!nama || !email || !pesan) {
            document.getElementById('saranFeedback').textContent = '⚠️ Semua field harus diisi!';
            document.getElementById('saranFeedback').style.color = '#c0392b';
            return;
        }

        document.getElementById('saranFeedback').textContent = '✅ Terima kasih! Saran/kritik Anda telah kami terima.';
        document.getElementById('saranFeedback').style.color = '#4a4a4a';
        formSaran.reset();

        setTimeout(() => {
            document.getElementById('saranFeedback').textContent = '';
        }, 5000);
    });
}

console.log('✅ Website Kesbangpol siap digunakan!');