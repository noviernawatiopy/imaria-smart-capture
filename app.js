const API_URL = "https://script.google.com/macros/s/AKfycbzHkQi9QrLRsqPZnCQKnj1qydbxtNsjyRaekC41tilarLVjK94Ce-bXOXGm09XvRH2s/exec";

const status = document.getElementById("status");
const hasilQR = document.getElementById("hasilQR");

let fotoFile = null;

// ===============================
// Tombol Ambil Foto
// ===============================
document.getElementById("btnFoto").addEventListener("click", () => {
  document.getElementById("fotoJawaban").click();
});

// ===============================
// Setelah foto dipilih
// ===============================
document.getElementById("fotoJawaban").addEventListener("change", (e) => {

  const file = e.target.files[0];
  if (!file) return;

  fotoFile = file;

  const preview = document.getElementById("previewFoto");

  preview.src = URL.createObjectURL(file);
  preview.style.display = "block";

  document.getElementById("aksiFoto").style.display = "block";

  status.textContent = "✅ Foto siap diproses";

});

// ===============================
// Ambil ulang foto
// ===============================
document.getElementById("btnUlang").addEventListener("click", () => {

  document.getElementById("previewFoto").style.display = "none";
  document.getElementById("aksiFoto").style.display = "none";
  document.getElementById("fotoJawaban").value = "";

  fotoFile = null;

  document.getElementById("fotoJawaban").click();

});

// ===============================
// Upload (sementara)
// ===============================
document.getElementById("btnUpload").addEventListener("click", async () => {

  if (!fotoFile) {
    alert("Silakan ambil foto terlebih dahulu.");
    return;
  }

  status.textContent = "⏳ Mengupload foto...";

  // Tahap berikutnya:
  // 1. Upload foto ke Apps Script
  // 2. Apps Script simpan ke Google Drive
  // 3. Baca QR dari foto
  // 4. OCR jawaban

  setTimeout(() => {
    status.textContent = "✅ Siap tahap upload";
  }, 1000);

});
