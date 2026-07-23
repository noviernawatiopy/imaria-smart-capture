const API_URL = "https://script.google.com/macros/s/AKfycbzHkQi9QrLRsqPZnCQKnj1qydbxtNsjyRaekC41tilarLVjK94Ce-bXOXGm09XvRH2s/exec";

const status = document.getElementById("status");
const btnFoto = document.getElementById("btnFoto");
const inputFoto = document.getElementById("fotoJawaban");
const preview = document.getElementById("previewFoto");
const aksiFoto = document.getElementById("aksiFoto");
const btnUlang = document.getElementById("btnUlang");
const btnUpload = document.getElementById("btnUpload");

let fotoFile = null;

status.textContent = "✅ app.js berhasil dimuat";

btnFoto.onclick = () => {
  status.textContent = "📷 Tombol Ambil Foto diklik";
  inputFoto.click();
};

inputFoto.onchange = (e) => {

  const file = e.target.files[0];
  if (!file) {
    status.textContent = "❌ Tidak ada foto dipilih";
    return;
  }

  fotoFile = file;

  preview.src = URL.createObjectURL(file);
  preview.style.display = "block";
  aksiFoto.style.display = "block";

  status.textContent = "✅ Foto berhasil dipilih";

};

btnUlang.onclick = () => {

  preview.style.display = "none";
  aksiFoto.style.display = "none";
  inputFoto.value = "";

  fotoFile = null;

  status.textContent = "🔄 Ambil ulang...";
  inputFoto.click();

};

btnUpload.onclick = async () => {

  if (!fotoFile) {
    alert("Belum ada foto.");
    return;
  }

  status.textContent = "⏳ Upload belum diuji";

};
