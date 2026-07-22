// ======================================================
// SLIDER UTAMA DENGAN TEKS DINAMIS & DOT INDICATOR
// ======================================================
const slideImages = document.querySelectorAll(".slides img");
const heroTitle = document.querySelector(".hero-content h2");
const heroSubtitle = document.querySelector(".hero-content p");
const heroButton = document.querySelector(".hero-content a");
const dotsContainer = document.querySelector(".dots");

let currentSlide = 0;
let slideTimer;

// Data tiap slide (judul, subjudul, dan link)
const slideData = [
  { title: "Destinator", subtitle: "Premium Family SUV", link: "deskripsi-destinator.html" },
  { title: "All New Triton", subtitle: "Tough Powerful Pickup", link: "deskripsi-triton.html" },
  { title: "Xforce", subtitle: "Compact SUV Adventure Ready", link: "deskripsi-xforce.html" }
];

// Buat dot indicator otomatis sesuai jumlah gambar
if (dotsContainer && slideImages.length > 0) {
  slideImages.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      showSlide(i);
      resetSlideTimer();
    });
    dotsContainer.appendChild(dot);
  });
}

const dots = document.querySelectorAll(".dot");

function updateHeroText(index) {
  if (!heroTitle || !heroSubtitle || !heroButton) return;
  
  heroTitle.textContent = slideData[index].title;
  heroSubtitle.textContent = slideData[index].subtitle;
  heroButton.setAttribute("href", slideData[index].link);

  // Animasi teks
  heroTitle.classList.add("fade-text");
  heroSubtitle.classList.add("fade-text");
  heroButton.classList.add("fade-btn");

  setTimeout(() => {
    heroTitle.classList.remove("fade-text");
    heroSubtitle.classList.remove("fade-text");
    heroButton.classList.remove("fade-btn");
  }, 900);
}

function showSlide(index) {
  slideImages.forEach((img, i) => img.classList.toggle("active", i === index));
  if (dots.length > 0) dots.forEach((d, i) => d.classList.toggle("active", i === index));
  updateHeroText(index);
  currentSlide = index;
}

function nextSlide() {
  showSlide((currentSlide + 1) % slideImages.length);
}

function autoSlide() {
  slideTimer = setInterval(nextSlide, 5000);
}

function resetSlideTimer() {
  clearInterval(slideTimer);
  autoSlide();
}

// Jalankan slider
if (slideImages.length > 0) {
  showSlide(currentSlide);
  autoSlide();
}

// =====================
// SLIDER GAMBAR TRITON
// =====================

window.addEventListener("DOMContentLoaded", () => {
  let slideIndex = 0;
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  let autoSlideTimer;

  function showSlide(n) {
    // Loop indeks biar gak keluar batas
    slideIndex = (n + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === slideIndex);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === slideIndex);
    });
  }

  function nextSlide() {
    showSlide(slideIndex + 1);
  }

  // Klik titik navigasi
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      showSlide(i);
      resetAutoSlide();
    });
  });

  function startAutoSlide() {
    autoSlideTimer = setInterval(nextSlide, 5000);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideTimer);
    startAutoSlide();
  }

  // Inisialisasi
  showSlide(slideIndex);
  startAutoSlide();
});


// ======================================================
// SIMULASI KREDIT
// ======================================================
const hitungBtn = document.getElementById("hitungBtn");
const kirimBtn = document.getElementById("kirimBtn");
const resetBtn = document.getElementById("resetBtn");
const hasilDiv = document.getElementById("hasilSimulasi");

let hasilSimulasi = "";

if (hitungBtn && hasilDiv) {
  hitungBtn.addEventListener("click", () => {
    const nama = document.getElementById("nama")?.value.trim();
    const noHp = document.getElementById("no_hp")?.value.trim();
    const tipeMobil = document.getElementById("tipe_mobil")?.value;
    const dp = parseFloat(document.getElementById("dp")?.value);
    const tenor = parseInt(document.getElementById("tenor")?.value);

    if (!nama || !noHp || !tipeMobil || isNaN(dp) || isNaN(tenor)) {
      hasilDiv.innerHTML = `
        <div class="hasil-card warning">
          <p>⚠ Harap lengkapi semua data sebelum menghitung.</p>
        </div>`;
      return;
    }

    const hargaMobil = {
      xpander: 300000000,
      xpander_cross: 320000000,
      pajero_sport: 550000000,
      triton: 480000000,
      xforce: 400000000,
      l300: 250000000,
    };

    const harga = hargaMobil[tipeMobil];
    const sisaBayar = harga - dp;
    const bunga = 0.08; // 8% per tahun
    const totalBunga = sisaBayar * bunga * (tenor / 12);
    const totalBayar = sisaBayar + totalBunga;
    const cicilan = totalBayar / tenor;

    hasilSimulasi = `
👤 Nama: ${nama}
🚗 Tipe Mobil: ${tipeMobil.toUpperCase()}
💰 Harga Mobil: Rp ${harga.toLocaleString()}
💵 DP: Rp ${dp.toLocaleString()}
⏱ Tenor: ${tenor} bulan
💸 Cicilan per bulan: Rp ${cicilan.toLocaleString()}
🏷 Total Bayar: Rp ${totalBayar.toLocaleString()}
`;

    hasilDiv.innerHTML = `
      <div class="hasil-card">
        <h4>Hasil Simulasi Kredit</h4>
        <p>${hasilSimulasi.replace(/\n/g, "<br>")}</p>
      </div>
    `;
  });
}

// ======================================================
// KIRIM HASIL KE WHATSAPP
// ======================================================
if (kirimBtn) {
  kirimBtn.addEventListener("click", () => {
    if (!hasilSimulasi) {
      alert("Silakan hitung simulasi terlebih dahulu!");
      return;
    }

    const nama = document.getElementById("nama")?.value.trim();
    const noHpSales = "6285794641937"; // Ganti dengan nomor WA sales
    const pesan = encodeURIComponent(
      `Halo, saya ${nama}. Berikut hasil simulasi kredit saya:\n\n${hasilSimulasi}`
    );

    const waUrl = `https://wa.me/${noHpSales}?text=${pesan}`;
    window.open(waUrl, "_blank");
  });
}

// ======================================================
// RESET FORM SIMULASI
// ======================================================
if (resetBtn) {
  resetBtn.addEventListener("click", () => {
    document.getElementById("kreditForm")?.reset();
    hasilDiv.innerHTML = "";
    hasilSimulasi = "";
  });
}
