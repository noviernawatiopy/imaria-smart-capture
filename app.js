const API_URL = "https://script.google.com/macros/s/AKfycbzHkQi9QrLRsqPZnCQKnj1qydbxtNsjyRaekC41tilarLVjK94Ce-bXOXGm09XvRH2s/exec";

const status = document.getElementById("status");

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
// Ambil Ulang
// ===============================
document.getElementById("btnUlang").addEventListener("click", () => {

  document.getElementById("previewFoto").style.display = "none";
  document.getElementById("aksiFoto").style.display = "none";
  document.getElementById("fotoJawaban").value = "";

  fotoFile = null;

  document.getElementById("fotoJawaban").click();

});

// ===============================
// Upload Foto
// ===============================
document.getElementById("btnUpload").addEventListener("click", async () => {

  if (!fotoFile) {
    alert("Silakan ambil foto terlebih dahulu.");
    return;
  }

  status.textContent = "⏳ Menyiapkan foto...";

  const reader = new FileReader();

  reader.onload = async function () {

    try {

      status.textContent = "⏳ Mengupload foto...";

      const base64 = reader.result.split(",")[1];

      const response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({
          image: base64,
          fileName: fotoFile.name,
          mimeType: fotoFile.type
        })
      });

      const result = await response.json();

      console.log(result);

      if (result.success) {
        status.textContent = "✅ Upload berhasil";
      } else {
        status.textContent = "❌ Upload gagal";
      }

    } catch (err) {

      console.error(err);
      status.textContent = "❌ " + err.message;

    }

  };

  reader.readAsDataURL(fotoFile);

});
