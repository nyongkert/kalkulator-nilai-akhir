document.getElementById("revealBtn").addEventListener("click", function () {
  // Tampilkan elemen jumpscare
  document.getElementById("jumpscare").classList.remove("hidden");

  // Mainkan video dan suara jumpscare
  const video = document.getElementById("scareVideo");
  video.play();

  // Tambahkan efek suara keras (kalau videonya nggak ada audio, bisa tambahkan audio eksternal)
});
