const API_URL = "https://script.google.com/macros/s/AKfycbzHkQi9QrLRsqPZnCQKnj1qydbxtNsjyRaekC41tilarLVjK94Ce-bXOXGm09XvRH2s/exec";

const status = document.getElementById("status");
const hasilQR = document.getElementById("hasilQR");
const btn = document.getElementById("btnStart");

btn.addEventListener("click", startScanner);

function startScanner() {
  btn.disabled = true;
  btn.textContent = "Scanner Aktif";

  const scanner = new Html5Qrcode("reader");

  scanner.start(
    { facingMode: "environment" },
    {
      fps: 10,
      qrbox: { width: 250, height: 250 }
    },
    async (decodedText) => {

      hasilQR.textContent = "QR: " + decodedText;
      status.textContent = "🔍 Mencari data peserta...";

      await scanner.stop();

      cariPeserta(decodedText);

    },
    () => {
      // abaikan
    }
  ).catch((err) => {
    console.error(err);
    status.textContent = "❌ Gagal membuka kamera";
    btn.disabled = false;
    btn.textContent = "Buka Kamera";
  });
}

async function cariPeserta(qrText) {

  const kode = qrText.split("|")[1];

  try {

    const response = await fetch(
      `${API_URL}?action=peserta&kode=${encodeURIComponent(kode)}`
    );

    const data = await response.json();

    if (data.found) {

      hasilQR.innerHTML = `
        <b>✅ Peserta ditemukan</b><br><br>
        Kode : ${data.kode}<br>
        Nama : ${data.nama}<br>
        Grade : ${data.grade}<br>
        Kategori : ${data.kategori}
      `;

      status.textContent = "Siap mengambil foto lembar jawaban";

    } else {

      hasilQR.textContent = "❌ Peserta tidak ditemukan";
      status.textContent = "";

    }

  } catch (err) {

    console.error(err);
    hasilQR.textContent = "❌ Gagal menghubungi server";

  }

}
