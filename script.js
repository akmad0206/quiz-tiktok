document.getElementById('quiz-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Mencegah reload halaman

    // Kunci jawaban
    const correctAnswers = {
        question1: 'A',
        question2: 'A',
        question3: 'C',
        question4: 'C',
        question5: 'B',
    };

    const pointsPerCorrectAnswer = 20; // Nilai untuk setiap jawaban benar
    let score = 0;
    let totalPoints = Object.keys(correctAnswers).length * pointsPerCorrectAnswer;

    // Periksa jawaban
    Object.keys(correctAnswers).forEach(question => {
        const selected = document.querySelector(`input[name="${question}"]:checked`);
        const options = document.querySelectorAll(`input[name="${question}"]`);

        options.forEach(option => {
            // Tandai semua jawaban
            if (option.value === correctAnswers[question]) {
                option.parentElement.style.color = "green"; // Warna hijau untuk jawaban benar
            } else {
                option.parentElement.style.color = ""; // Reset warna lainnya
            }
        });

        if (selected) {
            if (selected.value === correctAnswers[question]) {
                score += pointsPerCorrectAnswer; // Tambahkan poin untuk jawaban benar
            } else {
                // Tandai jawaban salah
                selected.parentElement.style.color = "red";
            }
        }
    });

    // Tampilkan hasil
    const resultElement = document.getElementById('quiz-result');
    resultElement.textContent = `You scored ${score} out of ${totalPoints} points!`;
    resultElement.style.color = score === totalPoints ? "green" : "orange";

    // Tampilkan animasi dan partikel jika skor 100
    if (score === totalPoints) {
        showVictoryAnimation();
    }
});

// Fungsi untuk animasi partikel kemenangan
function showVictoryAnimation() {
    const canvas = document.createElement('canvas');
    canvas.id = 'victory-canvas';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 100;
    const colors = ['#FF4500', '#FFD700', '#00FA9A', '#1E90FF'];

    // Membuat partikel
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: canvas.width / 2,
            y: canvas.height / 2,
            radius: Math.random() * 5 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            velocityX: (Math.random() - 0.5) * 5,
            velocityY: (Math.random() - 0.5) * 5,
        });
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();

            // Update posisi partikel
            particle.x += particle.velocityX;
            particle.y += particle.velocityY;
            particle.radius -= 0.05;

            // Hilangkan partikel jika terlalu kecil
            if (particle.radius < 0.1) {
                particle.radius = 0;
            }
        });

        // Hentikan animasi jika semua partikel hilang
        if (particles.every(p => p.radius <= 0)) {
            cancelAnimationFrame(animationId);
            document.body.removeChild(canvas);
        } else {
            animationId = requestAnimationFrame(drawParticles);
        }
    }

    let animationId = requestAnimationFrame(drawParticles);
}

function navigateTo(sectionId) {
    const section = document.getElementById(sectionId);
    const homeBtn = document.querySelector('#main-navigation .nav-btn:nth-child(1)');
    const profileBtn = document.querySelector('#main-navigation .nav-btn:nth-child(2)');

    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });

        // Atur visibilitas tombol berdasarkan lokasi
        if (sectionId === 'profile-section') {
            profileBtn.style.display = "none";
            homeBtn.style.display = "inline-flex";
        } else {
            homeBtn.style.display = "none";
            profileBtn.style.display = "inline-flex";
        }
    }
}


