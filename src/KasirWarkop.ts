declare const require: (id: string) => any;
const readline = require("readline");

// Deklarasi process untuk lingkungan TypeScript yang belum memuat tipe Node.js.
declare const process: {
    stdin: any;
    stdout: any;
};

// Membuat input terminal.
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

<<<<<<< Updated upstream
// Menyimpan daftar menu dan harga.
const menuWarkop: Record<string, number> = {
    kopi: 8000,
    teh: 5000,
    "kopi susu": 12000,
    mie: 10000
};
=======
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
    { id: 4, nama: "mie", harga: 10000, tersedia: true },
];
>>>>>>> Stashed changes

// Menyimpan status member.
const member: boolean = false;

// Fungsi input pengguna.
function tanya(teks: string): Promise<string> {
    return new Promise(resolve => rl.question(teks, resolve));
}

<<<<<<< Updated upstream
// Fungsi utama program.
async function main(): Promise<void> {
=======
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
>>>>>>> Stashed changes
    console.log("\n=== KASIR WARKOP ===");

    // Menampilkan menu.
    for (const m of Object.keys(menuWarkop)) {
        console.log(`${m} = Rp${menuWarkop[m]}`);
    }

    // Input nama, menu, dan jumlah.
    const nama: string = await tanya("Nama: ");
    const menu: string = (await tanya("Pilih menu: ")).toLowerCase();
    const jumlah: number = Number(await tanya("Jumlah: "));

<<<<<<< Updated upstream
    // IF 1: Validasi menu.
    if (!(menu in menuWarkop)) {
        console.log("Menu tidak tersedia!");
        rl.close();
        return;
    } else if (menu === "") {
        console.log("Menu kosong!");
        rl.close();
        return;
    } else {
        console.log("Menu ditemukan.");
    }

=======

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

// IF MENU 2: Memeriksa menu dan status ketersediaan.
// Kondisi majemuk dan nested tingkat 1.
if (menuDipilih !== undefined && menuDipilih.tersedia) {

    // IF MENU 3: Memeriksa kelompok menu kopi.
    // Nested tingkat 2.
    if (
        menuDipilih.nama === "kopi" ||
        menuDipilih.nama === "kopi susu"
    ) {

        // IF MENU 4: Menentukan jenis kopi.
        // Nested tingkat 3.
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

>>>>>>> Stashed changes
    // IF 2: Validasi jumlah.
    if (jumlah <= 0 || jumlah > 100) {
        console.log("Jumlah tidak valid!");
        rl.close();
        return;
    } else if (jumlah > 0 && jumlah <= 100) {
        console.log("Jumlah valid.");
    } else {
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
<<<<<<< Updated upstream
    switch (menu) {
=======

    switch (menuDipilih.nama) {
>>>>>>> Stashed changes
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

    // Menampilkan struk.
    console.log("\n=== STRUK WARKOP ===");
    console.log("Nama:", nama);
    console.log("Menu:", menuDipilih.nama, "-", jenis);    
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
        } else {
            console.log("Transaksi berhasil.");
        }

        console.log("Kembalian: Rp" + kembali);
    } else if (bayar >= 0 && bayar < total) {
        console.log("Uang kurang: Rp" + (total - bayar));
    } else {
        console.log("Pembayaran tidak valid.");
    }

<<<<<<< Updated upstream
    // Menutup terminal.
=======

// Fungsi utama untuk menjalankan perulangan menu.
async function main(): Promise<void> {
    let berjalan: boolean = true;

    // Mengulang menu sampai pengguna memilih keluar.
    while (berjalan) {
        tampilMenuUtama();

        // Meminta pengguna memasukkan pilihan menu.
        const pilihan: string = await tanya("Pilih menu utama: ");

        // SWITCH untuk menentukan alur menu utama.
        switch (pilihan) {

            // Menjalankan transaksi pemesanan menu.
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

            // Menangani pilihan menu yang tidak valid.
            default:
                console.log("Pilihan tidak valid!");
                break;
        }
    }

    // Menutup terminal setelah pengguna keluar.
>>>>>>> Stashed changes
    rl.close();
}

// Menjalankan program.
main();
