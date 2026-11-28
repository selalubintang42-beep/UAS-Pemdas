
// Import node
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
    { id: 4, nama: "mie", harga: 10000, tersedia: true },
];
//menentukan ID untuk menu baru
let idBerikutnya: number = 5;

// Menyimpan status member.
const member: boolean = false;

// Fungsi menerima input dari pengguna.
function tanya(teks: string): Promise<string> {
    return new Promise<string>((resolve) => {
        rl.question(teks, (jawaban) => {
            resolve(jawaban.trim());
        });
    });
}

// Fungsi menampilkan seluruh daftar menu.
function tampilkanDaftarMenu(): void {
    console.log("\n=== DAFTAR MENU WARKOP ===");

    let jumlahMenu: number = 0;

    // Menampilkan data dan menghitung jumlah menu.
    menuWarkop.forEach((menu, index) => {
        const nomorUrut: number = index + 1;

        console.log(
            `${nomorUrut}. ${menu.nama} - Rp${menu.harga} (ID: ${menu.id})`
        );

        jumlahMenu += 1;
    });

    // Menampilkan jumlah seluruh jenis menu.
    console.log("Jumlah jenis menu:", jumlahMenu);
}

// Fungsi mencari menu berdasarkan nama.
function cariMenu(nama: string): MenuWarkop | undefined {
    return menuWarkop.find(
        (menu) => menu.nama === nama.toLowerCase().trim()
    );
}
// mencari menu bedasarkan ID
function cariId(id: number): MenuWarkop | undefined {
    return menuWarkop.find(menu => menu.id === id);
}

// Mengubah nama atau harga menu berdasarkan ID.
async function ubahMenu(): Promise<void> {
    tampilkanDaftarMenu();

    const id: number = Number(await tanya("Masukkan ID menu yang akan diubah: "));
    const menu = cariId(id);

    if (!Number.isInteger(id) || menu === undefined) {
        console.log("Menu tidak ditemukan.");
        return;
    }

    const namaBaru: string = (await tanya("Nama baru (kosongkan untuk tidak mengubah): ")).toLowerCase().trim();
    const hargaBaru: number = Number(await tanya("Harga baru (0 untuk tidak mengubah): "));

    if (namaBaru !== "") {
        menu.nama = namaBaru;
    }

    if (hargaBaru !== 0) {
        if (!Number.isInteger(hargaBaru) || hargaBaru <= 0) {
            console.log("Harga tidak valid.");
            return;
        }
        menu.harga = hargaBaru;
    }

    console.log("Data menu berhasil diubah.");
}

// Menghapus menu berdasarkan ID.
async function hapusMenu(): Promise<void> {
    tampilkanDaftarMenu();

    const id: number = Number(await tanya("Masukkan ID menu yang akan dihapus: "));
    const indeks = menuWarkop.findIndex(menu => menu.id === id);

    if (!Number.isInteger(id) || indeks === -1) {
        console.log("Menu tidak ditemukan.");
        return;
    }

    menuWarkop.splice(indeks, 1);
    console.log("Menu berhasil dihapus.");
}

// Menampilkan hasil pencarian menu berdasarkan nama atau ID.
async function cariDataMenu(): Promise<void> {
    const nama: string = (await tanya("Masukkan nama atau ID menu: ")).trim();

    if (nama === "") {
        console.log("Pencarian tidak boleh kosong!");
        return;
    }

    const menuNama = cariMenu(nama);
    const menuId = cariId(Number(nama));
    const menu = menuNama ?? menuId;

    if (menu === undefined) {
        console.log("Menu tidak ditemukan.");
        return;
    }

    console.log(`${menu.nama} - Rp${menu.harga} (ID: ${menu.id}, Tersedia: ${menu.tersedia ? "Ya" : "Tidak"})`);
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
    return jumlah % 1 === 0 &&
           jumlah > 0 &&
           jumlah <= 100;
}


// Fungsi menampilkan menu utama.
function tampilMenuUtama(): void {
    console.log("\n=== KASIR WARKOP ===");
    console.log("1. Pesan Menu");
    console.log("2. Lihat Daftar Menu");
    console.log("0. Keluar");
    console.log("==================================");
}


// Fungsi transaksi kasir.
async function transaksiKasir(): Promise<void> {
    console.log("\n=== KASIR WARKOP ===");

    // Menampilkan menu.
    tampilkanDaftarMenu();

    // Input nama, menu, dan jumlah.
    const nama: string = await tanya("Nama: ");
        if (!validasiNama(nama)) {
        console.log("Nama tidak boleh kosong!");
        return;
    }
    const menu: string = (await tanya("Pilih menu: ")).toLowerCase().trim();
    const jumlah: number = Number(await tanya("Jumlah: "));
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
    if (
        menu === "kopi" ||
        menu === "teh" ||
        menu === "kopi susu" ||
        menu === "mie"
    ) {

        // IF MENU 3: Memeriksa kelompok menu kopi.
        // Nested tingkat 2.
        if (menu === "kopi" || menu === "kopi susu") {

            // IF MENU 4: Menentukan pilihan kopi.
            // Nested tingkat 3.
            if (menu === "kopi") {
                console.log("Menu kopi dipilih.");
            } else {
                console.log("Menu kopi susu dipilih.");
            }

        } else if (menu === "teh") {
            console.log("Menu teh dipilih.");

        } else {
            console.log("Menu mie dipilih.");
        }

    } else {
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

    } else if (jumlah > 0 && jumlah <= 100) {
        console.log("Jumlah valid.");

    } else {
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

    // Menghitung diskon menggunakan compound assignment.
    let potongan: number = subtotal;
    potongan *= diskon;
    potongan /= 100;

    // Menghitung total pembayaran setelah diskon.
    let total: number = subtotal;
    total -= potongan;

    // Menghitung harga satuan setelah diskon.
    const hargaSetelahDiskon: number = total / jumlah;

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
    console.log("Menu:", menu, "-", jenis);
    console.log("Jumlah:", jumlah);
    console.log("Kategori:", kategori);
    console.log("Subtotal: Rp" + subtotal);
    console.log("Diskon:", pesan);
    console.log("Total: Rp" + total);
    console.log("Harga satuan setelah diskon: Rp" + hargaSetelahDiskon);

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
}

// Fungsi utama untuk menjalankan perulangan menu.
async function main(): Promise<void> {
    let berjalan: boolean = true;

    // Mengulang menu sampai pengguna memilih keluar.
    while (berjalan) {
        tampilMenuUtama();

        const pilihan: string = await tanya("Pilih menu utama: ");

        // Menentukan pilihan menggunakan SWITCH.
        switch (pilihan) {

            // Menjalankan transaksi kasir.
            case "1":
                await transaksiKasir();
                break;

            case "2":
                tampilkanDaftarMenu();
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

            // Menghentikan perulangan menu utama.
            case "0":
                console.log("Terima kasih!");
                berjalan = false;
                break;

            default:
                console.log("Pilihan tidak valid!");
                break;
        }
    }

    // Menutup terminal setelah pengguna memilih keluar.
    rl.close();
}

// menjalankan program.
main();

    
