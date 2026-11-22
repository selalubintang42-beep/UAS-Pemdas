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
// Menyimpan daftar menu dan harga.
const menuWarkop = {
    kopi: 8000,
    teh: 5000,
    "kopi susu": 12000,
    mie: 10000
};
// Menyimpan status member.
const member = false;
// Fungsi input pengguna.
function tanya(teks) {
    return new Promise(resolve => rl.question(teks, resolve));
}
// Fungsi utama program.
async function main() {
    console.log("\n=== KASIR WARKOP ===");
    // Menampilkan menu.
    for (const m of Object.keys(menuWarkop)) {
        console.log(`${m} = Rp${menuWarkop[m]}`);
    }
    // Input nama, menu, dan jumlah.
    const nama = await tanya("Nama: ");
    const menu = (await tanya("Pilih menu: ")).toLowerCase();
    const jumlah = Number(await tanya("Jumlah: "));
    // IF 1: Validasi menu.
    if (!(menu in menuWarkop)) {
        console.log("Menu tidak tersedia!");
        rl.close();
        return;
    }
    else if (menu === "") {
        console.log("Menu kosong!");
        rl.close();
        return;
    }
    else {
        console.log("Menu ditemukan.");
    }
    // IF 2: Validasi jumlah.
    if (jumlah <= 0 || jumlah > 100) {
        console.log("Jumlah tidak valid!");
        rl.close();
        return;
    }
    else if (jumlah > 0 && jumlah <= 100) {
        console.log("Jumlah valid.");
    }
    else {
        console.log("Input salah.");
        rl.close();
        return;
    }
    // Menghitung subtotal.
    const harga = menuWarkop[menu];
    if (harga === undefined) {
        console.log("Harga tidak ditemukan.");
        rl.close();
        return;
    }
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
    // Menutup terminal.
    rl.close();
}
// Menjalankan program.
main();
//# sourceMappingURL=Indexs.js.map