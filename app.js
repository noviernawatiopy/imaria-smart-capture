const API_URL = "https://script.google.com/macros/s/AKfycbzHkQi9QrLRsqPZnCQKnj1qydbxtNsjyRaekC41tilarLVjK94Ce-bXOXGm09XvRH2s/exec";

const status = document.getElementById("status");
const btnFoto = document.getElementById("btnFoto");
const inputFoto = document.getElementById("fotoJawaban");
const preview = document.getElementById("previewFoto");
const aksiFoto = document.getElementById("aksiFoto");
const btnUlang = document.getElementById("btnUlang");
const btnUpload = document.getElementById("btnUpload");

let fotoFile = null;

/* ===========================
   AMBIL FOTO
=========================== */

btnFoto.addEventListener("click", () => {
  inputFoto.click();
});

inputFoto.addEventListener("change", (e) => {

  if (!e.target.files.length) return;

  fotoFile = e.target.files[0];

  preview.src = URL.createObjectURL(fotoFile);
  preview.style.display = "block";

  aksiFoto.style.display = "block";

  status.textContent = "✅ Foto berhasil dipilih.";

});

/* ===========================
   AMBIL ULANG
=========================== */

btnUlang.addEventListener("click", () => {

  fotoFile = null;

  inputFoto.value = "";

  preview.src = "";
  preview.style.display = "none";

  aksiFoto.style.display = "none";

  status.textContent = "Silakan ambil foto lembar jawaban.";

  inputFoto.click();

});

/* ===========================
   UPLOAD
=========================== */

btnUpload.addEventListener("click", async () => {

  if (!fotoFile) {
    alert("Silakan ambil foto terlebih dahulu.");
    return;
  }

  try {

    status.textContent = "⏳ Membaca foto...";

    const base64 = await fileToBase64(fotoFile);

    status.textContent = "⏳ Mengupload ke server...";

    const payload = JSON.stringify({
      fileName: fotoFile.name,
      mimeType: fotoFile.type,
      image: base64
    });

    const response = await fetch(API_URL, {
      method: "POST",
      mode: "cors",
      body: payload
    });

    if (!response.ok) {
      throw new Error("HTTP " + response.status);
    }

    const hasil = await response.json();

    if (hasil.success) {

      status.innerHTML =
        "✅ Upload berhasil.<br><br>" +
        "Nama File: <b>" + hasil.fileName + "</b>";

    } else {

      status.innerHTML =
        "❌ Upload gagal.<br><br>" +
        hasil.error;

    }

  } catch (err) {

    console.error(err);

    status.innerHTML =
      "❌ Gagal terhubung ke Apps Script.<br><br>" +
      err.message;

  }

});

/* ===========================
   FILE -> BASE64
=========================== */

function fileToBase64(file) {

  return new Promise((resolve, reject) => {

    const reader = new FileReader();

    reader.onload = function () {

      resolve(reader.result.split(",")[1]);

    };

    reader.onerror = reject;

    reader.readAsDataURL(file);

  });

}
