const video = document.getElementById("camera");
const status = document.getElementById("status");
const btn = document.getElementById("btnStart");

btn.addEventListener("click", startCamera);

async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "environment"
      },
      audio: false
    });

    video.srcObject = stream;
    status.textContent = "✅ Kamera berhasil dibuka";
    btn.disabled = true;
    btn.textContent = "Kamera Aktif";
  } catch (err) {
    console.error(err);
    status.textContent = "❌ Gagal membuka kamera";
  }
}
