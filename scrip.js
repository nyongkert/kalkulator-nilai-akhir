document.addEventListener("DOMContentLoaded", function () {
  let dataMahasiswa = [];
  let nomor = 1;

  const form = document.getElementById("formNilai");
  const inputNIM = document.getElementById("nim");
  const pesanNIM = document.getElementById("pesanNim");

  // Validasi real-time NIM
  inputNIM.addEventListener("input", function () {
    const nilai = this.value;
    const pesan = [];

    // Validasi angka
    if (/[^0-9]/.test(nilai)) {
      pesan.push("NIM hanya boleh angka.");
    }

    // Validasi panjang
    if (nilai.length > 0 && nilai.length < 8) {
      pesan.push("NIM harus minimal 8 digit.");
    }

    // Tampilkan pesan kesalahan
    if (pesan.length > 0) {
      pesanNIM.innerText = pesan.join(" ");
      this.style.border = "2px solid #f44336";
    } else {
      pesanNIM.innerText = "";
      this.style.border = "none";
    }

    // Paksa isi hanya angka
    this.value = nilai.replace(/[^0-9]/g, "");
  });

  // Saat form disubmit
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nama = document.getElementById("nama").value.trim();
    const nim = inputNIM.value.trim();
    const tugas = parseFloat(document.getElementById("tugas").value);
    const uts = parseFloat(document.getElementById("uts").value);
    const uas = parseFloat(document.getElementById("uas").value);

    const pesan = [];

    if (!nama || !nim || isNaN(tugas) || isNaN(uts) || isNaN(uas)) {
      alert("Mohon isi semua data dengan benar!");
      return;
    }

    if (
      tugas < 0 ||
      tugas > 100 ||
      uts < 0 ||
      uts > 100 ||
      uas < 0 ||
      uas > 100
    ) {
      alert("Nilai harus antara 0 sampai 100!");
      return;
    }

    if (!/^[0-9]+$/.test(nim)) {
      pesan.push("NIM hanya boleh terdiri dari angka.");
    }
    if (nim.length < 8) {
      pesan.push("NIM harus minimal 8 digit.");
    }

    if (pesan.length > 0) {
      alert(pesan.join("\n"));
      return;
    }

    const nilaiAkhir = tugas * 0.3 + uts * 0.3 + uas * 0.4;
    const keterangan = nilaiAkhir >= 50 ? "Lulus" : "Tidak Lulus";
    const warnaStatus = keterangan === "Lulus" ? "#4caf50" : "#f44336";
    const ikon = keterangan === "Lulus" ? "✅" : "❌";

    document.getElementById("hasilText").innerHTML = `
      <div class="card-output">
        <h3>Hasil Penilaian</h3>
        <p><strong>Nama:</strong> ${nama}</p>
        <p><strong>NIM:</strong> ${nim}</p>
        <p><strong>Nilai Akhir:</strong> ${nilaiAkhir.toFixed(2)}</p>
        <p style="color: ${warnaStatus}; font-weight: bold;">
          ${ikon} ${keterangan}
        </p>
      </div>
    `;

    dataMahasiswa.push({
      nomor,
      nama,
      nim,
      nilaiAkhir: nilaiAkhir.toFixed(2),
      keterangan,
    });

    tampilkanTabel();
    nomor++;
    form.reset();
    document.getElementById("nama").focus();
    pesanNIM.innerText = "";
    inputNIM.style.border = "none";
  });

  function tampilkanTabel() {
    const tbody = document.querySelector("#tabelHasil tbody");
    tbody.innerHTML = "";
    dataMahasiswa.forEach((item) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${item.nomor}</td>
        <td>${item.nama}</td>
        <td>${item.nim}</td>
        <td>${item.nilaiAkhir}</td>
        <td>${item.keterangan}</td>
      `;
      tbody.appendChild(tr);
    });
  }
});
