const video = document.getElementById("camera");
const status = document.getElementById("status");
const btn = document.getElementById("btnStart");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const hasilQR = document.getElementById("hasilQR");

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

    scanQR();

  } catch (err) {
    console.error(err);
    status.textContent = "❌ Gagal membuka kamera";
  }
}

function scanQR() {
  if (video.readyState === video.HAVE_ENOUGH_DATA) {

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const code = jsQR(
      imageData.data,
      canvas.width,
      canvas.height
    );

    if (code) {
      hasilQR.textContent = "QR: " + code.data;
      return;
    }
  }

  requestAnimationFrame(scanQR);
}
