"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("node:readline"));
// Membuat input terminal.
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// Menyimpan daftar menu awal dalam array.
const menuWarkop = [
    { id: 1, nama: "kopi", harga: 8000, tersedia: true },
    { id: 2, nama: "teh", harga: 5000, tersedia: true },
    { id: 3, nama: "kopi susu", harga: 12000, tersedia: true },
    { id: 4, nama: "mie", harga: 10000, tersedia: true },
];
//menentukan ID untuk menu baru
let idBerikutnya = 5;
// Menyimpan status member.
const member = false;
// Fungsi input pengguna.
function tanya(teks) {
    return new Promise(resolve => rl.question(teks, resolve));
}
// Fungsi menampilkan seluruh daftar menu.
function tampilkanDaftarMenu() {
    console.log("\n=== DAFTAR MENU WARKOP ===");
    menuWarkop.forEach((menu) => {
        console.log(`${menu.id}. ${menu.nama} - Rp${menu.harga}`);
    });
}
// Fungsi mencari menu berdasarkan nama.
function cariMenu(nama) {
    return menuWarkop.find((menu) => menu.nama === nama.toLowerCase().trim());
}
// mencari menu bedasarkan ID
function cariId(id) {
    return menuWarkop.find(menu => menu.id === id);
}
// Fungsi memvalidasi nama pelanggan.
function validasiNama(nama) {
    return nama.trim() !== "";
}
// Fungsi memvalidasi pilihan menu.
function validasiMenu(nama) {
    const menu = cariMenu(nama);
    return menu !== undefined && menu.tersedia;
}
// Fungsi memvalidasi jumlah pesanan.
function validasiJumlah(jumlah) {
    return Number.isInteger(jumlah) &&
        jumlah > 0 &&
        jumlah <= 100;
}
// Fungsi menampilkan menu utama.
function tampilMenuUtama() {
    console.log("\n========== KASIR WARKOP ==========");
    console.log("1. Create (Tambah Menu)");
    console.log("2. Read (Lihat Menu)");
    console.log("3. Update (Ubah Menu)");
    console.log("4. Delete (Hapus Menu)");
    console.log("5. Search (Cari Menu)");
    console.log("6. Transaksi Kasir");
    console.log("0. Keluar");
    console.log("==================================");
}
// Fungsi transaksi kasir.
async function transaksiKasir() {
    console.log("\n=== KASIR WARKOP ===");
    // Menampilkan menu.
    tampilkanDaftarMenu();
    // Input nama, menu, dan jumlah.
    const nama = await tanya("Nama: ");
    if (!validasiNama(nama)) {
        console.log("Nama tidak boleh kosong!");
        return;
    }
    const menu = (await tanya("Pilih menu: ")).toLowerCase().trim();
    const jumlah = Number(await tanya("Jumlah: "));
    if (!validasiJumlah(jumlah)) {
        console.log("Jumlah tidak valid!");
        return;
    }
    // ========================================
    // BAGIAN TUGAS: IF PADA ALUR PEMILIHAN MENU
    // ========================================
    // IF MENU 1: Memeriksa input menu kosong.
    if (menu === "") {
        console.log("Menu tidak boleh kosong!");
        return;
    }
    // IF MENU 2: Memeriksa ketersediaan menu.
    // Kondisi majemuk dan nested tingkat 1.
    if (menu === "kopi" ||
        menu === "teh" ||
        menu === "kopi susu" ||
        menu === "mie") {
        // IF MENU 3: Memeriksa kelompok menu kopi.
        // Nested tingkat 2.
        if (menu === "kopi" || menu === "kopi susu") {
            // IF MENU 4: Menentukan pilihan kopi.
            // Nested tingkat 3.
            if (menu === "kopi") {
                console.log("Menu kopi dipilih.");
            }
            else {
                console.log("Menu kopi susu dipilih.");
            }
        }
        else if (menu === "teh") {
            console.log("Menu teh dipilih.");
        }
        else {
            console.log("Menu mie dipilih.");
        }
    }
    else {
        console.log("Menu tidak tersedia!");
        return;
    }
    // ========================================
    // AKHIR BAGIAN TUGAS IF PEMILIHAN MENU
    // ========================================
    // IF 2: Validasi jumlah.
    if (jumlah <= 0 || jumlah > 100) {
        console.log("Jumlah tidak valid!");
        return;
    }
    else if (jumlah > 0 && jumlah <= 100) {
        console.log("Jumlah valid.");
    }
    else {
        console.log("Input salah.");
        return;
    }
    // Mengambil data menu berdasarkan nama.
    const dataMenu = cariMenu(menu);
    // Memeriksa apakah menu ditemukan.
    if (dataMenu === undefined) {
        console.log("Harga tidak ditemukan.");
        return;
    }
    // Mengambil harga menu.
    const harga = dataMenu.harga;
    // Menghitung subtotal.
    const subtotal = harga * jumlah;
    // IF 3: Menentukan kategori pesanan.
    let kategori;
    if (subtotal >= 100000) {
        kategori = "Besar";
    }
    else if (subtotal >= 50000) {
        kategori = "Sedang";
    }
    else if (subtotal > 0) {
        kategori = "Kecil";
    }
    else {
        kategori = "Kosong";
    }
    // IF 4: Menentukan diskon.
    let diskon;
    if (subtotal >= 100000 && member) {
        diskon = 15;
    }
    else if (subtotal >= 100000) {
        diskon = 10;
    }
    else if (subtotal >= 50000 && member) {
        diskon = 10;
    }
    else if (subtotal >= 50000) {
        diskon = 5;
    }
    else {
        diskon = 0;
    }
    // SWITCH 1: Menentukan jenis menu.
    let jenis;
    switch (menu) {
        case "kopi":
        case "kopi susu":
            jenis = "Minuman kopi";
            break;
        case "teh":
            jenis = "Minuman teh";
            break;
        case "mie":
            jenis = "Makanan";
            break;
        default:
            jenis = "Lainnya";
            break;
    }
    // SWITCH 2: Menentukan pesan diskon.
    let pesan;
    switch (diskon) {
        case 10:
            pesan = "Diskon 10%";
            break;
        case 5:
            pesan = "Diskon 5%";
            break;
        case 15:
            pesan = "Diskon 15%";
            break;
        default:
            pesan = "Tanpa diskon";
            break;
    }
    // Menghitung diskon dan total pembayaran.
    const potongan = subtotal * diskon / 100;
    let total = subtotal;
    total -= potongan;
    // Nested IF dua tingkat.
    if (diskon > 0) {
        if (diskon >= 10) {
            console.log("Diskon besar!");
        }
        else {
            console.log("Diskon reguler.");
        }
    }
    else {
        console.log("Tidak mendapat diskon.");
    }
    // Menampilkan struk.
    console.log("\n=== STRUK WARKOP ===");
    console.log("Nama:", nama);
    console.log("Menu:", menu, "-", jenis);
    console.log("Jumlah:", jumlah);
    console.log("Kategori:", kategori);
    console.log("Subtotal: Rp" + subtotal);
    console.log("Diskon:", pesan);
    console.log("Total: Rp" + total);
    // Input pembayaran.
    const bayar = Number(await tanya("Uang bayar: "));
    // Memeriksa pembayaran dan kembalian.
    if (bayar >= total) {
        let kembali = bayar;
        kembali -= total;
        // Nested SWITCH.
        if (kembali >= 50000) {
            switch (true) {
                case kembali >= 100000:
                    console.log("Kembalian sangat besar.");
                    break;
                case kembali >= 50000:
                    console.log("Kembalian besar.");
                    break;
                default:
                    console.log("Transaksi berhasil.");
                    break;
            }
        }
        else {
            console.log("Transaksi berhasil.");
        }
        console.log("Kembalian: Rp" + kembali);
    }
    else if (bayar >= 0 && bayar < total) {
        console.log("Uang kurang: Rp" + (total - bayar));
    }
    else {
        console.log("Pembayaran tidak valid.");
    }
}
// ========================================
// FITUR CREATE (MENAMBAHKAN MENU)
// ========================================
async function tambahMenu() {
    const nama = (await tanya("Nama menu baru: ")).trim();
    if (nama === "") {
        console.log("Nama tidak boleh kosong!");
        return;
    }
    if (cariMenu(nama)) {
        console.log("Menu sudah ada!");
        return;
    }
    const harga = Number(await tanya("Harga menu: "));
    if (!Number.isFinite(harga) || harga <= 0) {
        console.log("Harga tidak valid!");
        return;
    }
    menuWarkop.push({
        id: idBerikutnya,
        nama: nama.toLowerCase(),
        harga: harga,
        tersedia: true
    });
    idBerikutnya++;
    console.log("Menu berhasil ditambahkan!");
}
// ========================================
// FITUR READ (MENAMPILKAN MENU)
// ========================================
async function bacaMenu() {
    tampilkanDaftarMenu();
    const inputId = await tanya("Masukkan ID untuk melihat detail (0 kembali): ");
    if (inputId === "0")
        return;
    const menu = cariId(Number(inputId));
    if (menu === undefined) {
        console.log("Menu tidak ditemukan!");
    }
    else {
        console.log("ID:", menu.id);
        console.log("Nama:", menu.nama);
        console.log("Harga: Rp" + menu.harga);
        console.log("Tersedia:", menu.tersedia);
    }
}
// ========================================
// FITUR UPDATE (MENGUBAH MENU)
// ========================================
async function ubahMenu() {
    tampilkanDaftarMenu();
    const id = Number(await tanya("Masukkan ID menu: "));
    const menu = cariId(id);
    if (menu === undefined) {
        console.log("Menu tidak ditemukan!");
        return;
    }
    const namaBaru = (await tanya("Nama baru: ")).trim();
    const hargaBaru = Number(await tanya("Harga baru: "));
    if (namaBaru === "" || !Number.isFinite(hargaBaru) || hargaBaru <= 0) {
        console.log("Input tidak valid!");
        return;
    }
    const namaSudahAda = cariMenu(namaBaru);
    if (namaSudahAda && namaSudahAda.id !== menu.id) {
        console.log("Nama menu sudah digunakan!");
        return;
    }
    menu.nama = namaBaru.toLowerCase();
    menu.harga = hargaBaru;
    console.log("Menu berhasil diperbarui!");
}
// ========================================
// FITUR DELETE (MENGHAPUS MENU)
// ========================================
async function hapusMenu() {
    tampilkanDaftarMenu();
    const id = Number(await tanya("Masukkan ID menu yang ingin dihapus: "));
    const index = menuWarkop.findIndex(menu => menu.id === id);
    if (index === -1) {
        console.log("Menu tidak ditemukan!");
        return;
    }
    const konfirmasi = (await tanya("Yakin hapus menu? (Y/N): "))
        .trim().toLowerCase();
    if (konfirmasi === "y") {
        menuWarkop.splice(index, 1);
        console.log("Menu berhasil dihapus!");
    }
    else if (konfirmasi === "n") {
        console.log("Penghapusan dibatalkan.");
    }
    else {
        console.log("Konfirmasi tidak valid!");
    }
}
// ========================================
// FITUR SEARCH (MENCARI MENU)
// ========================================
async function cariDataMenu() {
    const kataKunci = (await tanya("Masukkan nama menu: "))
        .trim().toLowerCase();
    if (kataKunci === "") {
        console.log("Kata kunci tidak boleh kosong!");
        return;
    }
    let hasil = menuWarkop.filter(menu => menu.nama.toLowerCase().includes(kataKunci));
    console.log("\nPilih filter:");
    console.log("1. Harga maksimal");
    console.log("2. Status tersedia");
    const filter = await tanya("Pilih filter: ");
    if (filter === "1") {
        const harga = Number(await tanya("Harga maksimal: "));
        if (!Number.isFinite(harga) || harga < 0) {
            console.log("Harga tidak valid!");
            return;
        }
        hasil = hasil.filter(menu => menu.harga <= harga);
    }
    else if (filter === "2") {
        const status = await tanya("Tersedia? (Y/N): ");
        if (status.toLowerCase() === "y") {
            hasil = hasil.filter(menu => menu.tersedia);
        }
        else if (status.toLowerCase() === "n") {
            hasil = hasil.filter(menu => !menu.tersedia);
        }
        else {
            console.log("Status tidak valid!");
            return;
        }
    }
    else {
        console.log("Pilihan filter tidak valid!");
        return;
    }
    if (hasil.length === 0) {
        console.log("Menu tidak ditemukan!");
    }
    else {
        hasil.forEach(menu => {
            console.log(`ID: ${menu.id} | ${menu.nama} | Rp${menu.harga}`);
        });
    }
}
// Fungsi utama untuk menjalankan perulangan menu.
async function main() {
    let berjalan = true;
    // Mengulang menu sampai pengguna memilih keluar.
    while (berjalan) {
        tampilMenuUtama();
        const pilihan = await tanya("Pilih menu utama: ");
        // Menentukan pilihan menggunakan SWITCH.
        switch (pilihan) {
            case "1":
                await tambahMenu();
                break;
            case "2":
                await bacaMenu();
                break;
            case "3":
                await ubahMenu();
                break;
            case "4":
                await hapusMenu();
                break;
            case "5":
                await cariDataMenu();
                break;
            case "6":
                await transaksiKasir();
                break;
            case "0":
                console.log("Terima kasih!");
                berjalan = false;
                break;
            default:
                console.log("Pilihan tidak valid!");
                break;
        }
    }
    // Menutup terminal setelah pengguna keluar.
    rl.close();
}
// Menjalankan program.
main();
//# sourceMappingURL=KasirWarkop.js.map