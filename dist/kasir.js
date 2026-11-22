"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let menuWarkop = {
    kopi: 8000,
    teh: 5000,
    "kopi susu": 12000,
    mie: 10000
};
const member = false;
function tanya(teks) {
    return new Promise(resolve => rl.question(teks, resolve));
}
// READ: Menampilkan daftar menu.
function readMenu() {
    console.log("\n=== DAFTAR MENU ===");
    for (const m of Object.keys(menuWarkop)) {
        console.log(`${m} = Rp${menuWarkop[m]}`);
    }
}
// CREATE: Menambahkan menu.
async function createMenu() {
    const nama = (await tanya("Nama menu baru: ")).toLowerCase();
    const harga = Number(await tanya("Harga menu: "));
    if (nama === "" || nama in menuWarkop || !Number.isFinite(harga) || harga <= 0) {
        console.log("Nama atau harga tidak valid!");
    }
    else {
        menuWarkop[nama] = harga;
        console.log("Menu berhasil ditambahkan!");
    }
}
// UPDATE: Mengubah menu.
async function updateMenu() {
    const nama = (await tanya("Nama menu yang diubah: ")).toLowerCase();
    if (!(nama in menuWarkop)) {
        console.log("Menu tidak ditemukan!");
        return;
    }
    const namaBaru = (await tanya("Nama menu baru: ")).toLowerCase();
    const hargaBaru = Number(await tanya("Harga baru: "));
    if (namaBaru === "" ||
        (namaBaru !== nama && namaBaru in menuWarkop) ||
        !Number.isFinite(hargaBaru) ||
        hargaBaru <= 0) {
        console.log("Data baru tidak valid!");
        return;
    }
    delete menuWarkop[nama];
    menuWarkop[namaBaru] = hargaBaru;
    console.log("Menu berhasil diperbarui!");
}
// DELETE: Menghapus menu.
async function deleteMenu() {
    const nama = (await tanya("Nama menu yang dihapus: ")).toLowerCase();
    if (nama in menuWarkop) {
        delete menuWarkop[nama];
        console.log("Menu berhasil dihapus!");
    }
    else {
        console.log("Menu tidak ditemukan!");
    }
}
// SEARCH: Mencari menu.
async function searchMenu() {
    const cari = (await tanya("Cari nama menu: ")).toLowerCase();
    const hasil = Object.keys(menuWarkop).filter(m => m.includes(cari));
    if (hasil.length > 0) {
        console.log("\n=== HASIL PENCARIAN ===");
        for (const m of hasil) {
            console.log(`${m} = Rp${menuWarkop[m]}`);
        }
    }
    else {
        console.log("Menu tidak ditemukan!");
    }
}
// Menu utama CRUD.
async function kelolaMenu() {
    let pilih;
    do {
        console.log("\n=== KELOLA MENU WARKOP ===");
        console.log("1. Create (Tambah Menu)");
        console.log("2. Read (Lihat Menu)");
        console.log("3. Update (Ubah Menu)");
        console.log("4. Delete (Hapus Menu)");
        console.log("5. Search (Cari Menu)");
        console.log("0. Kembali ke Kasir");
        pilih = await tanya("Pilih fitur: ");
        switch (pilih) {
            case "1":
                await createMenu();
                break;
            case "2":
                readMenu();
                break;
            case "3":
                await updateMenu();
                break;
            case "4":
                await deleteMenu();
                break;
            case "5":
                await searchMenu();
                break;
            case "0":
                console.log("Kembali ke kasir...");
                break;
            default:
                console.log("Pilihan tidak tersedia!");
        }
    } while (pilih !== "0");
}
// PROGRAM KASIR.
async function main() {
    console.log("\n=== KASIR WARKOP ===");
    console.log("1. Transaksi Kasir");
    console.log("2. Kelola Menu (CRUD)");
    const pilihan = await tanya("Pilih menu: ");
    if (pilihan === "2") {
        await kelolaMenu();
        await main();
        return;
    }
    if (pilihan !== "1") {
        console.log("Pilihan tidak tersedia!");
        await main();
        return;
    }
    readMenu();
    const nama = await tanya("Nama: ");
    const menu = (await tanya("Pilih menu: ")).toLowerCase();
    const jumlah = Number(await tanya("Jumlah: "));
    // IF 1: Validasi menu.
    if (!(menu in menuWarkop)) {
        console.log("Menu tidak tersedia!");
        await main();
        return;
    }
    else if (menu === "") {
        console.log("Menu kosong!");
        await main();
        return;
    }
    else {
        console.log("Menu ditemukan.");
    }
    // IF 2: Validasi jumlah.
    if (!Number.isInteger(jumlah) || jumlah <= 0 || jumlah > 100) {
        console.log("Jumlah tidak valid!");
        await main();
        return;
    }
    else {
        console.log("Jumlah valid.");
    }
    // Menghitung subtotal.
    const harga = menuWarkop[menu];
    if (harga === undefined) {
        console.log("Harga tidak ditemukan!");
        await main();
        return;
    }
    const subtotal = harga * jumlah;
    // IF 3: Kategori pesanan.
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
    // IF 4: Diskon.
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
    // SWITCH 1: Jenis menu.
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
            jenis = "Menu lainnya";
            break;
    }
    // SWITCH 2: Pesan diskon.
    let pesan;
    switch (diskon) {
        case 15:
            pesan = "Diskon 15%";
            break;
        case 10:
            pesan = "Diskon 10%";
            break;
        case 5:
            pesan = "Diskon 5%";
            break;
        default:
            pesan = "Tanpa diskon";
            break;
    }
    const potongan = subtotal * diskon / 100;
    const total = subtotal - potongan;
    // Nested IF.
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
    // Struk.
    console.log("\n=== STRUK WARKOP ===");
    console.log("Nama:", nama);
    console.log("Menu:", menu, "-", jenis);
    console.log("Jumlah:", jumlah);
    console.log("Kategori:", kategori);
    console.log("Subtotal: Rp" + subtotal);
    console.log("Diskon:", pesan);
    console.log("Total: Rp" + total);
    // Pembayaran.
    const bayar = Number(await tanya("Uang bayar: "));
    if (!Number.isFinite(bayar) || bayar < 0) {
        console.log("Pembayaran tidak valid!");
    }
    else if (bayar >= total) {
        const kembali = bayar - total;
        // Nested SWITCH.
        if (kembali >= 50000) {
            switch (true) {
                case kembali >= 100000:
                    console.log("Kembalian sangat besar.");
                    break;
                case kembali >= 50000:
                    console.log("Kembalian besar.");
                    break;
            }
        }
        else {
            console.log("Transaksi berhasil.");
        }
        console.log("Kembalian: Rp" + kembali);
    }
    else {
        console.log("Uang kurang: Rp" + (total - bayar));
    }
    await main();
}
main();
//# sourceMappingURL=kasir.js.map