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
    (decodedText) => {
      hasilQR.textContent = "QR: " + decodedText;
      status.textContent = "✅ QR berhasil dibaca";

      scanner.stop();
    },
    (errorMessage) => {
      // Abaikan error saat belum menemukan QR
    }
  ).catch((err) => {
    console.error(err);
    status.textContent = "❌ Gagal membuka kamera";
    btn.disabled = false;
    btn.textContent = "Buka Kamera";
  });
}
