// ======================================================
// HERO SLIDER DINAMIS DENGAN 7 MOBIL
// ======================================================

const slideImages = document.querySelectorAll(".slides img");
const heroTitle = document.querySelector(".hero-content h2");
const heroSubtitle = document.querySelector(".hero-content p");
const heroButton = document.querySelector(".hero-content a");
const dotsContainer = document.querySelector(".dots");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentSlide = 0;
let slideTimer;

// Data mobil (urutan sesuai gambar)
const slideData = [
  {
    title: "ALL NEW DESTINATOR",
    subtitle: "Premium Family SUV",
    link: "deskripsi-destinator.html"
  },
  {
    title: "NEW XPANDER",
    subtitle: "Mobil keluarga modern yang luas, efisien, dan elegan.",
    link: "deskripsi-xpander.html"
  },
  {
    title: "NEW XPANDER CROSS",
    subtitle: "SUV tangguh dengan kenyamanan MPV keluarga.",
    link: "deskripsi-xpander-cross.html"
  },
  {
    title: "ALL NEW TRITON",
    subtitle: "Tough Powerful Pickup untuk segala medan.",
    link: "deskripsi-triton.html"
  },
  {
    title: "NEW XFORCE",
    subtitle: "SUV modern dengan desain tangguh dan teknologi canggih.",
    link: "deskripsi-xforce.html"
  },
  {
    title: "NEW PAJERO SPORT",
    subtitle: "Dominasi setiap medan dengan performa kuat dan elegan.",
    link: "deskripsi-pajerosport.html"
  },
  {
    title: "L300 EURO4",
    subtitle: "Legenda niaga yang andal dan efisien.",
    link: "deskripsi-l300.html"
  }
];

// ====================
// Buat dot indicator otomatis
// ====================
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

// ====================
// Update teks hero
// ====================
function updateHeroText(index) {
  if (!heroTitle || !heroSubtitle || !heroButton) return;
  
  heroTitle.textContent = slideData[index].title;
  heroSubtitle.textContent = slideData[index].subtitle;
  heroButton.setAttribute("href", slideData[index].link);

  // Efek animasi teks
  heroTitle.classList.add("fade-text");
  heroSubtitle.classList.add("fade-text");
  heroButton.classList.add("fade-btn");

  setTimeout(() => {
    heroTitle.classList.remove("fade-text");
    heroSubtitle.classList.remove("fade-text");
    heroButton.classList.remove("fade-btn");
  }, 800);
}

// ====================
// Fungsi utama slide
// ====================
function showSlide(index) {
  slideImages.forEach((img, i) => img.classList.toggle("active", i === index));
  dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
  updateHeroText(index);
  currentSlide = index;
}

function nextSlide() {
  showSlide((currentSlide + 1) % slideImages.length);
}

function prevSlide() {
  showSlide((currentSlide - 1 + slideImages.length) % slideImages.length);
}

function autoSlide() {
  slideTimer = setInterval(nextSlide, 5000);
}

function resetSlideTimer() {
  clearInterval(slideTimer);
  autoSlide();
}

// ====================
// Event tombol arrow
// ====================
if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    nextSlide();
    resetSlideTimer();
  });
}

if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    prevSlide();
    resetSlideTimer();
  });
}

// ====================
// Jalankan slider
// ====================
if (slideImages.length > 0) {
  showSlide(currentSlide);
  autoSlide();
}

// ======================================================
// SIMULASI KREDIT (FINAL INTERAKTIF)
// DP %, BUNGA DINAMIS, PREVIEW REAL-TIME + LOADING EFFECT
// ======================================================
const hitungBtn = document.getElementById("hitungBtn");
const kirimBtn = document.getElementById("kirimBtn");
const resetBtn = document.getElementById("resetBtn");
const hasilDiv = document.getElementById("hasilSimulasi");

let hasilSimulasi = "";

// ====== Elemen Preview dan Input Bunga ======
const tipeMobilSelect = document.getElementById("tipe_mobil");
const dpSelect = document.getElementById("dp");

// Tambahkan input bunga dinamis
const bungaLabel = document.createElement("label");
bungaLabel.setAttribute("for", "bunga");
bungaLabel.textContent = "Bunga per tahun (%)";

const bungaInput = document.createElement("input");
bungaInput.type = "number";
bungaInput.id = "bunga";
bungaInput.min = "0";
bungaInput.max = "20";
bungaInput.step = "0.1";
bungaInput.value = "8";
bungaInput.required = true;
bungaInput.placeholder = "Masukkan bunga per tahun (mis. 8)";

// Sisipkan input bunga setelah dropdown tenor
const tenorSelect = document.getElementById("tenor");
tenorSelect.parentNode.insertBefore(bungaLabel, tenorSelect.nextSibling);
tenorSelect.parentNode.insertBefore(bungaInput, bungaLabel.nextSibling);

// ===== BOX PREVIEW =====
const previewBox = document.createElement("div");
previewBox.classList.add("preview-box");
previewBox.style.marginTop = "10px";
previewBox.style.padding = "10px";
previewBox.style.border = "1px solid #ddd";
previewBox.style.borderRadius = "8px";
previewBox.style.background = "#f9f9f9";
previewBox.innerHTML = `<em>Pilih tipe mobil dan DP untuk melihat estimasi harga.</em>`;
document.querySelector(".simulasi-form").appendChild(previewBox);

// ===== FUNGSI UPDATE PREVIEW =====
function updatePreview() {
  const selectedOption = tipeMobilSelect.options[tipeMobilSelect.selectedIndex];
  const dpPersen = parseFloat(dpSelect.value);

  if (!selectedOption || selectedOption.value === "") {
    previewBox.innerHTML = `<em>Silakan pilih tipe mobil terlebih dahulu.</em>`;
    return;
  }

  const hargaMatch = selectedOption.text.match(/Rp\s?([\d\.]+)/);
  if (!hargaMatch) {
    previewBox.innerHTML = `<em>Harga mobil tidak ditemukan.</em>`;
    return;
  }

  const hargaMobil = parseInt(hargaMatch[1].replace(/\./g, ""));
  let previewText = `<strong>Harga Mobil:</strong> Rp ${hargaMobil.toLocaleString("id-ID")}`;

  if (dpPersen) {
    const dpNominal = hargaMobil * (dpPersen / 100);
    previewText += `<br><strong>DP ${dpPersen}%:</strong> Rp ${dpNominal.toLocaleString("id-ID")}`;
  }

  previewBox.innerHTML = previewText;
}

// ===== EVENT PREVIEW SAAT PILIH MOBIL ATAU DP =====
tipeMobilSelect.addEventListener("change", updatePreview);
dpSelect.addEventListener("change", updatePreview);

// ======================================================
// HITUNG SIMULASI (dengan efek loading)
// ======================================================
if (hitungBtn && hasilDiv) {
  hitungBtn.addEventListener("click", () => {
    const nama = document.getElementById("nama")?.value.trim();
    const noHp = document.getElementById("no_hp")?.value.trim();
    const selectedOption = tipeMobilSelect.options[tipeMobilSelect.selectedIndex];
    const dpPersen = parseFloat(dpSelect?.value);
    const tenor = parseInt(document.getElementById("tenor")?.value);
    const bungaPersen = parseFloat(bungaInput.value);

    if (!nama || !noHp || !selectedOption || isNaN(dpPersen) || isNaN(tenor) || isNaN(bungaPersen)) {
      hasilDiv.innerHTML = `
        <div class="hasil-card warning">
          <p>⚠ Harap lengkapi semua data sebelum menghitung.</p>
        </div>`;
      return;
    }

    const hargaMatch = selectedOption.text.match(/Rp\s?([\d\.]+)/);
    if (!hargaMatch) {
      hasilDiv.innerHTML = `<div class="hasil-card warning"><p>⚠ Harga mobil tidak ditemukan.</p></div>`;
      return;
    }

    const hargaMobil = parseInt(hargaMatch[1].replace(/\./g, ""));
    const dpNominal = hargaMobil * (dpPersen / 100);
    const sisaBayar = hargaMobil - dpNominal;

    const bunga = bungaPersen / 100;
    const totalBunga = sisaBayar * bunga * (tenor / 12);
    const totalBayar = sisaBayar + totalBunga;
    const cicilan = totalBayar / tenor;

    hasilSimulasi = `
👤 Nama: ${nama}
📱 No. HP: ${noHp}
🚗 Tipe Mobil: ${selectedOption.text}
💰 Harga Mobil: Rp ${hargaMobil.toLocaleString("id-ID")}
💵 DP (${dpPersen}%): Rp ${dpNominal.toLocaleString("id-ID")}
📉 Bunga: ${bungaPersen}%
⏱ Tenor: ${tenor} bulan
💸 Cicilan per bulan: Rp ${Math.round(cicilan).toLocaleString("id-ID")}
🏷 Total Bayar: Rp ${Math.round(totalBayar).toLocaleString("id-ID")}
`;

    // === Efek Loading ===
    hasilDiv.innerHTML = `
      <div class="hasil-card loading">
        <div class="spinner"></div>
        <p>Sedang menghitung simulasi...</p>
      </div>
    `;

    // Delay 1.5 detik biar lebih natural
    setTimeout(() => {
      hasilDiv.innerHTML = `
        <div class="hasil-card fade-in">
          <h4>Hasil Simulasi Kredit</h4>
          <p>${hasilSimulasi.replace(/\n/g, "<br>")}</p>
        </div>
      `;
    }, 1500);
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
    const noHpSales = "6285794641937"; // Nomor WA sales
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
    bungaInput.value = "8";
    previewBox.innerHTML = `<em>Pilih tipe mobil dan DP untuk melihat estimasi harga.</em>`;
  });
}