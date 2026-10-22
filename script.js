// Fungsi navigasi
function showSection(id) {
    document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

// Logika Hukum Ohm
function hitungOhm() {
    let v = document.getElementById('v_input').value;
    let i = document.getElementById('i_input').value;
    let r = document.getElementById('r_input').value;
    let res = document.getElementById('res_ohm');

    if (v === "") {
        res.innerText = "V = " + (i * r).toFixed(2) + " Volt";
    } else if (i === "") {
        res.innerText = "I = " + (v / r).toFixed(2) + " Ampere";
    } else if (r === "") {
        res.innerText = "R = " + (v / i).toFixed(2) + " Ohm";
    } else {
        res.innerText = "Kosongkan satu untuk dihitung!";
    }
}

// Logika Warna Resistor
function hitungWarna() {
    let p1 = document.getElementById('pita1').value;
    let p2 = document.getElementById('pita2').value;
    let m = document.getElementById('pengali').value;
    let t = document.getElementById('toleransi').value; // Ambil nilai toleransi
    
    let nilai = parseFloat(p1 + p2) * parseFloat(m);
    let satuan = " Ohm";

    if (nilai >= 1000000) {
        nilai = nilai / 1000000;
        satuan = " MΩ";
    } else if (nilai >= 1000) {
        nilai = nilai / 1000;
        satuan = " kΩ";
    }

    // Tampilkan hasil dengan tambahan toleransi di belakangnya
    document.getElementById('res_warna').innerHTML = 
        `Hasil: <b>${nilai}${satuan}</b> <br> <small>Toleransi: ±${t}%</small>`;
}

function hitungCircuit() {
    let tipe = document.getElementById('tipe_rangkaian').value;
    let inputRaw = document.getElementById('r_values').value;
    let display = document.getElementById('res_circuit');

    // 1. Ubah teks input menjadi array angka
    // split(',') memisahkan teks berdasarkan koma
    let rArray = inputRaw.split(',').map(Number).filter(n => n > 0);

    if (rArray.length < 2) {
        display.innerHTML = "<span style='color: #ef4444;'>Masukkan minimal 2 nilai!</span>";
        return;
    }

    let total = 0;

    if (tipe === "seri") {
        // Rumus Seri: R1 + R2 + R3...
        total = rArray.reduce((acc, curr) => acc + curr, 0);
    } else {
        // Rumus Paralel: 1 / (1/R1 + 1/R2 + 1/R3...)
        let kebalikan = rArray.reduce((acc, curr) => acc + (1 / curr), 0);
        total = 1 / kebalikan;
    }

    // Tampilkan hasil
    display.innerHTML = `Total Hambatan (${tipe}): <br><b>${total.toFixed(2)} Ω</b>`;
}