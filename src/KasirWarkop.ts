
// Import modul Node.js untuk input terminal.
import * as readline from "node:readline";

// Membuat input terminal.
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Menentukan struktur data menu warkop.
export interface MenuWarkop {
    id: number;
    nama: string;
    harga: number;
    tersedia: boolean;
}

// Menyimpan daftar menu awal dalam array.
const menuWarkop: MenuWarkop[] = [
    { id: 1, nama: "kopi", harga: 8000, tersedia: true },
    { id: 2, nama: "teh", harga: 5000, tersedia: true },
    { id: 3, nama: "kopi susu", harga: 12000, tersedia: true },
    { id: 4, nama: "mie", harga: 10000, tersedia: true }
];

// Menyimpan status member.
const member: boolean = false;

// Fungsi input pengguna.
function tanya(teks: string): Promise<string> {
    return new Promise(resolve => rl.question(teks, resolve));
}

// Fungsi menampilkan seluruh daftar menu.
function tampilkanDaftarMenu(): void {
    console.log("\n=== DAFTAR MENU WARKOP ===");

    menuWarkop.forEach((menu) => {
        console.log(`${menu.id}. ${menu.nama} - Rp${menu.harga}`);
    });
}

// Fungsi mencari menu berdasarkan nama atau ID.
function cariMenu(nama: string): MenuWarkop | undefined {
    return menuWarkop.find(
        (menu) =>
            menu.nama.toLowerCase() === nama.toLowerCase().trim() ||
            String(menu.id) === nama.trim()
    );
}

// Fungsi memvalidasi nama pelanggan.
function validasiNama(nama: string): boolean {
    return nama.trim() !== "";
}

// Fungsi memvalidasi pilihan menu.
function validasiMenu(nama: string): boolean {
    const menu = cariMenu(nama);
    return menu !== undefined && menu.tersedia;
}

// Fungsi memvalidasi jumlah pesanan.
function validasiJumlah(jumlah: number): boolean {
    return Number.isInteger(jumlah) &&
           jumlah > 0 &&
           jumlah <= 100;
}

// Fungsi menampilkan menu utama.
function tampilMenuUtama(): void {
    console.log("\n=== KASIR WARKOP ===");
    console.log("1. Pesan Menu");
    console.log("2. Lihat Daftar Menu");
    console.log("0. Keluar");
}

// Fungsi transaksi kasir.
async function transaksiKasir(): Promise<void> {
    console.log("\n=== KASIR WARKOP ===");

    // Menampilkan daftar menu.
    tampilkanDaftarMenu();

    // Input dan validasi nama pelanggan.
    const nama: string = await tanya("Nama: ");

    if (!validasiNama(nama)) {
        console.log("Nama tidak boleh kosong!");
        return;
    }

    // Input pilihan menu dan jumlah pesanan.
    const menu: string = (await tanya(
        "Pilih menu (nama atau ID): "
    )).toLowerCase().trim();

    const jumlah: number = Number(await tanya("Jumlah: "));

    // Memvalidasi jumlah pesanan.
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

    // Mencari menu berdasarkan nama atau ID.
    const menuDipilih = cariMenu(menu);

    // IF MENU 2: Memeriksa ketersediaan menu.
    // Kondisi majemuk dan nested tingkat pertama.
    if (menuDipilih !== undefined && menuDipilih.tersedia) {

        // IF MENU 3: Memeriksa kelompok menu kopi.
        // Nested tingkat kedua.
        if (
            menuDipilih.nama === "kopi" ||
            menuDipilih.nama === "kopi susu"
        ) {

            // IF MENU 4: Menentukan pilihan kopi.
            // Nested tingkat ketiga.
            if (menuDipilih.nama === "kopi") {
                console.log("Menu kopi dipilih.");
            } else {
                console.log("Menu kopi susu dipilih.");
            }

        } else if (menuDipilih.nama === "teh") {
            console.log("Menu teh dipilih.");

        } else if (menuDipilih.nama === "mie") {
            console.log("Menu mie dipilih.");

        } else {
            // Menangani menu baru dari fitur Create.
            console.log(`Menu ${menuDipilih.nama} dipilih.`);
        }

    } else {
        console.log("Menu tidak ditemukan atau tidak tersedia!");
        return;
    }

    // ========================================
    // AKHIR BAGIAN TUGAS IF PEMILIHAN MENU
    // ========================================

    // IF 2: Validasi jumlah.
    if (jumlah <= 0 || jumlah > 100) {
        console.log("Jumlah tidak valid!");
        return;

    } else if (jumlah > 0 && jumlah <= 100) {
        console.log("Jumlah valid.");

    } else {
        console.log("Input salah.");
        return;
    }

    // Mengambil data menu berdasarkan nama atau ID.
    const dataMenu = cariMenu(menu);

    // Memeriksa apakah menu ditemukan.
    if (dataMenu === undefined) {
        console.log("Harga tidak ditemukan.");
        return;
    }

    // Mengambil harga menu.
    const harga = dataMenu.harga;

    // Menghitung subtotal pesanan.
    const subtotal: number = harga * jumlah;

    // IF 3: Menentukan kategori pesanan.
    let kategori: string;

    if (subtotal >= 100000) {
        kategori = "Besar";
    } else if (subtotal >= 50000) {
        kategori = "Sedang";
    } else if (subtotal > 0) {
        kategori = "Kecil";
    } else {
        kategori = "Kosong";
    }

    // IF 4: Menentukan diskon.
    let diskon: number;

    if (subtotal >= 100000 && member) {
        diskon = 15;
    } else if (subtotal >= 100000) {
        diskon = 10;
    } else if (subtotal >= 50000 && member) {
        diskon = 10;
    } else if (subtotal >= 50000) {
        diskon = 5;
    } else {
        diskon = 0;
    }

    // SWITCH 1: Menentukan jenis menu.
    let jenis: string;

    switch (menuDipilih.nama) {
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
    let pesan: string;

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
    const potongan: number = subtotal * diskon / 100;
    let total: number = subtotal;
    total -= potongan;

    // Nested IF dua tingkat.
    if (diskon > 0) {
        if (diskon >= 10) {
            console.log("Diskon besar!");
        } else {
            console.log("Diskon reguler.");
        }
    } else {
        console.log("Tidak mendapat diskon.");
    }

    // Menampilkan struk pesanan.
    console.log("\n=== STRUK WARKOP ===");
    console.log("Nama:", nama);
    console.log("Menu:", menuDipilih.nama, "-", jenis);
    console.log("Harga satuan: Rp" + harga);
    console.log("Jumlah:", jumlah);
    console.log("Kategori:", kategori);
    console.log("Subtotal: Rp" + subtotal);
    console.log("Diskon:", pesan);
    console.log("Total: Rp" + total);

    // Input pembayaran.
    const bayar: number = Number(await tanya("Uang bayar: "));

    // Memeriksa pembayaran dan kembalian.
    if (bayar >= total) {
        let kembali: number = bayar;
        kembali -= total;

        // Nested SWITCH untuk kategori kembalian.
        if (kembali >= 50000) {
            switch (true) {
                case kembali >= 100000:
                    console.log("Kembalian sangat besar.");
                    break;

                case kembali >= 75000:
                    console.log("Kembalian cukup besar.");
                    break;

                case kembali >= 50000:
                    console.log("Kembalian besar.");
                    break;

                default:
                    console.log("Transaksi berhasil.");
                    break;
            }
        } else {
            console.log("Transaksi berhasil.");
        }

        console.log("Kembalian: Rp" + kembali);

    } else if (bayar >= 0 && bayar < total) {
        console.log("Uang kurang: Rp" + (total - bayar));

    } else {
        console.log("Pembayaran tidak valid.");
    }
}

// Fungsi utama untuk menjalankan perulangan menu.
async function main(): Promise<void> {
    let berjalan: boolean = true;

    // Mengulang menu sampai pengguna memilih keluar.
    while (berjalan) {

        // Menampilkan pilihan menu utama.
        tampilMenuUtama();

        // Meminta input pilihan pengguna.
        const pilihan: string = await tanya("Pilih menu utama: ");

        // SWITCH untuk menentukan alur menu utama.
        switch (pilihan) {

            // Menjalankan transaksi kasir.
            case "1":
                await transaksiKasir();
                break;

            // Menampilkan seluruh daftar menu.
            case "2":
                tampilkanDaftarMenu();
                break;

            // Menghentikan perulangan menu utama.
            case "0":
                console.log("Terima kasih!");
                berjalan = false;
                break;

            // Menangani input menu tidak valid.
            default:
                console.log("Pilihan tidak valid!");
                break;
        }
    }

    // Menutup terminal setelah pengguna memilih keluar.
    rl.close();
}

// Menjalankan program.
main();
