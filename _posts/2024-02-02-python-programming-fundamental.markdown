---
layout: presentation
title: "Pemrograman Python Dasar"
date: 2024-02-02 07:09:51 +0700
categories: Programming
subtitle: Belajar berpikir komputasional melalui pemrograman (Python dasar)
slide_order: auto # auto, content_first, or images_first
ppt_slides:
  - heading: "Bagaimana Bahasa Python Bermanfaat untuk Industri"
    image: /assets/img/py/1f07f81.png
callout_groups:
  - - color: blue
      title: Target utama
      text: Bukan menghafal kode—melainkan memahami logika.
    - color: green
      title: Bukti belajar
      text: Siswa menyelesaikan mini-project tanpa menyalin tutorial.
  - - color: yellow
      title: 01 Pengenalan Python & print()
      text: Konsep program, output, komentar
    - color: yellow
      title: 02 Variabel & tipe data
      text: String, integer, float, boolean
    - color: yellow
      title: 03 Operator & input
      text: Kalkulasi, konversi tipe
  - - color: yellow
      title: 04 Percabangan
      text: if, elif, else
    - color: yellow
      title: 05 Perulangan
      text: for, while, range
    - color: yellow
      title: 06 Struktur data
      text: list, tuple, set, dictionary
  - - color: yellow
      title: 07 Fungsi
      text: parameter, return, pemecahan masalah
    - color: yellow
      title: 08 Mini-project & evaluasi
      text: Program kasir sederhana
---

## Bagaimana Bahasa Python Bermanfaat untuk Industri

---

### Apa yang akan kita kuasai?

> Di akhir Level 1, anda diharapkan mampu membuat program sederhana sendiri.

- Menjelaskan apa itu program dan bagaimana Python menjalankan instruksi.
- Menyimpan dan mengolah data menggunakan variabel dan tipe data.
- Menggunakan operator untuk melakukan perhitungan dan perbandingan.
- Membuat keputusan dengan if/elif/else.
- Mengulang instruksi menggunakan for dan while.
- Membuat fungsi sederhana dan mengolah list serta dictionary.

{% for callout_group in page.callout_groups limit: 1 %}
{% include callout-group.html items=callout_group %}
{% endfor %}

---

### Rencana pembelajaran

{% for callout_group in page.callout_groups offset: 1 %}
{% include callout-group.html items=callout_group %}
{% endfor %}

---

### Komputer itu pintar atau patuh?

{% include callout.html color="yellow" title="Intruksi Ambigu" text="
“Buatkan minuman yang enak.”<br>
Komputer tidak tahu ukuran, bahan, atau langkah yang dimaksud.
" %}
<br>
{% include callout.html color="green" title="Instruksi jelas" text="
“Ambil gelas, tuang 200 ml air, masukkan 1 sendok gula, aduk.”<br>
Program membutuhkan instruksi yang jelas dan berurutan.
" %}
<br>
? **Pertanyaan: apa yang terjadi jika satu langkah salah atau tidak lengkap?**

---

### Apa itu Pemrograman?

- **Program**: sekumpulan instruksi untuk menyelesaikan tugas.
- **Bahasa pemrograman**: cara menuliskan instruksi agar dapat diproses komputer.
- **Python**: bahasa yang sintaksnya relatif mudah dibaca pemula.
- **Bug**: kesalahan pada program.
- **Debugging**: proses menemukan dan memperbaiki kesalahan.

{% include callout.html color="blue" title="Analogi resep" text="**Input**: bahan <br>
**Proses**: langkah memasak <br>
**Output**: makanan jadi
" %}

---

### Pola dasar: Input → Process → Output (hasil)

![ipo](/portfolio/assets/img/py/python2.png){:.presentation-image--left .presentation-image--medium}

**Contoh:**

```python
harga = 12000
jumlah = 3
total = harga * jumlah
print(total)
```

---

### Dimana program yang kita buat dijalankan?

Pilih salah satu cara; untuk kelas, VS Code cocok untuk latihan berkelanjutan.

1. Online
   Gunakan editor Python online jika komputer belum siap Kelebihan: mulai cepat. seperti <a href='https://coddy.tech/'>https://coddy.tech/</a>
2. Visual studio code
   ![vscode](https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg){:.presentation-image--left .presentation-image--very-small} Install Python dan VS Code, lalu pilih interpreter Python. Kelebihan: mirip workflow nyata.
3. IDLE
   ![idle python](https://upload.wikimedia.org/wikipedia/commons/d/da/IDLE_%28Python_3.3.2%29.png){:.presentation-image--left .presentation-image--small} Aplikasi sederhana yang ikut tersedia bersama instalasi Python.
   Kelebihan: minim pengaturan.

Sekarang buka IDLE atau Visual studio:

{% include callout.html color="blue" title="Instruksi" text="Buat sebuah file bernama `hello.py`. Ektensi dari `.py` adalah tanda bahwa file ini adalah file python, tulis lalu jalankan
" %} <br>

```python
print("Halo, dunia!")
```

---

### Program pertama, `print()`

`print()` digunakan untuk menampilkan informasi ke layar.

```python
print("Halo, dunia!")
print("Saya sedang belajar Python")
print(2 + 3)
```

<br>

{% include callout.html color="green" title="Output" text="Halo, dunia!<br>
Saya sedang belajar Python<br>
5
" %}
<br>

- Teks ditulis di dalam tanda kutip.
- Angka dapat ditampilkan tanpa tanda kutip.
- Python menjalankan instruksi sesuai urutan.

---

### Sintaks, huruf besar-kecil, dan komentar

Dalam pemrograman, sintaksis (**syntax**) adalah aturan-aturan penulisan kode yang menentukan bagaimana suatu instruksi atau perintah harus ditulis agar dapat dimengerti dan dieksekusi oleh komputer.

```python
# Ini adalah komentar
nama = "Rani"
print(nama)

# Python membedakan huruf besar-kecil
print("Halo")
```

<br>
{% include callout.html color="green" title="Komentar dengan tanda #" text="Catatan untuk manusia; tidak dieksekusi.<br>
" %}
<br>
{% include callout.html color="yellow" title="Case-sensitive
" text="**nama** dan **Nama** dianggap berbeda, karena yang pertama diawali huruf kecil sedangkan yang kedua diawali huruf besar<br>
" %}
<br>
{% include callout.html color="red" title="Test
" text="Coba: hapus tanda kutip dari Halo. Apa pesan error yang muncul?.<br>
" %}

---

### Variabel: kotak, wadah, atau tempat bernama untuk menyimpan nilai

Lebih tepatnya, nama variabel merujuk pada sebuah objek/nilai.

```python
nama = "Dika"
umur = 16
nilai = 88.5
lulus = True

print(nama, umur)
```

<br>
{% include callout.html color="blue" title="Bayangkan seperti label
" text="nama → “Dika”<br>
umur → 16<br>
nilai → 88.5<br>
lulus → True<br>

" %}

- Gunakan nama yang menjelaskan isi, misalnya total_harga.
- Nama variabel tidak boleh diawali angka dan tidak boleh mengandung spasi.

---

### Nama variabel dan perubahan nilai

```python
skor = 70
print(skor)  # 70

skor = 85
print(skor)  # 85

skor += 5
print(skor)  # 90

```

<br>
{% include callout.html color="blue" title="Konvensi (aturan yang disepakati bersama) di dalam Pemrograman Python
" text="Gunakan snake_case:
`total_harga`, `jumlah_siswa` bukan `TotalHarga` bukan pula `totalHarga`
" %}
<br>
{% include callout.html color="yellow" title="Pahami assignment
" text="Tanda = menetapkan nilai, bukan tanda sama dengan dalam matematika.
" %}
<br>

**Latihan: buat variabel nama, kelas, dan hobi lalu tampilkan semuanya!**

---

### Tipe data dasar

Tipe data adalah klasifikasi atau pengelompokan nilai dalam pemrograman yang memberi tahu komputer bagaimana cara mengolah, menyimpan, dan membaca data tersebut.[^1]

| Tipe Data  | Deskripsi        | Contoh di Python     |
| ---------- | ---------------- | -------------------- |
| `str`      | Teks             | `"Contoh di Python"` |
| `int`      | Bilangan bulat   | `17`                 |
| `float`    | Bilangan desimal | `3.14`               |
| `bool`     | Benar / salah    | `True` / `False`     |
| `NoneType` | Belum ada nilai  | `None`               |

---

### Konversi tipe data

Konversi tipe data (type conversion atau casting) dalam pemrograman adalah proses mengubah suatu nilai dari satu jenis tipe data (misalnya teks atau string) menjadi tipe data lain (misalnya angka bulat atau integer). [^2]

```python
umur_teks = "16"
umur_angka = int(umur_teks)

harga_teks = "12500.5"
harga = float(harga_teks)

print(umur_angka + 1)  # 17

```

<br>
{% include callout.html color="green" title="Fungsi penting
" text="`int()`, `float()`, `str()`, `bool()`
" %}
<br>
{% include callout.html color="yellow" title="Hati-hati" text="`int('halo')` akan menghasilkan ValueError. kenapa? karena **halo** adalah karakter bukan angka (string) jadi mengubah kata halo ke tipe data `int` akan menghasilkan error!
" %}
<br>
{% include callout.html color="gray" icon="❔" title="Pertanyaan" text="Mengapa input dari pengguna sering perlu dikonversi?
" %}

---

{% include callout.html color="blue" title="" text="Jawab: Input dari pengguna sering kali perlu dikonversi karena secara default, hampir semua sistem dan bahasa pemrograman menerima input pengguna dalam bentuk teks (string).
" %}

---

### Operator aritmatika

Operator aritmatika adalah simbol khusus dalam pemrograman yang digunakan untuk melakukan operasi matematika dasar pada nilai atau variabel (disebut operan)

| Operator | Operasi         | Contoh di Python |
| -------- | --------------- | ---------------- |
| `+`      | Penjumlahan     | `7 + 2 → 9`      |
| `-`      | Pengurangan     | `7 - 2 → 5`      |
| `*`      | Perkalian       | `7 * 2 → 14`     |
| `/`      | Pembagian       | `7 / 2 → 3.5`    |
| `//`     | Pembagian bulat | `7 // 2 → 3`     |
| `%`      | Sisa bagi       | `7 % 2 → 1`      |
| `**`     | Pangkat         | `7 ** 2 → 49`    |

---

### Operator perbandingan dan logika

Operator perbandingan dan operator logika adalah simbol-simbol khusus dalam pemrograman yang digunakan untuk mengambil keputusan, menyaring data, atau mengatur alur kerja program (flow control seperti if-else dan perulangan while/for).[^3]

{% include callout.html color="blue" title="Perbandingan" text="== sama dengan <br>
!= tidak sama <br>
\> lebih besar<br>

\< lebih kecil <br>
\>= / <= lebih besar sama dengan/kecil atau sama dengan <br>
" %}
<br>
{% include callout.html color="green" title="Logika" text="and: keduanya benar <br>
or: minimal satu benar <br>
not: membalik nilai boolean (Negasi)<br>
" %}
<br>

```python
# Contoh:
umur = 16 # inputan
print(umur >= 17)  # False
print(umur >= 13 and umur <= 18)  # True
```

---

### `Input`, Menerima input dari pengguna

Fungsi `input()` digunakan untuk menerima masukan (data) dari pengguna melalui keyboard [^4]

{% include callout.html color="blue" title="Input()" text="Hasil `input()` selalu berupa string (str).
" %}
<br>
{% include callout.html color="green" title="f-string" text="F-string (formatted string literals) adalah cara modern, ringkas, dan efisien di Python untuk menyisipkan nilai variabel atau ekspresi secara langsung ke dalam sebuah teks.<br>
Sisipkan variabel ke teks dengan `f\"...{variabel}...\"`.
" %}
<br>
Contoh:

```python
nama = input("Siapa namamu? ")
umur = int(input("Berapa umurmu? "))

print(f"Halo, {nama}!")
print(f"Tahun depan umurmu {umur + 1}.")
```

<br>

ⓘ **Latihan, buatkan nama, kelas, dan nomor kursi, tampilkan**

---

### Percabangan: `if`, `elif`, dan `else`

Program dapat memilih tindakan berdasarkan kondisi.

Percabangan (if, elif, dan else) dalam Python adalah cara untuk membuat komputer mengambil keputusan, seperti halnya manusia berpikir: "Jika cuaca hujan, maka saya bawa payung. Jika mendung, saya pakai jaket. Jika tidak, saya jalan santai."[^5]

Contoh:

```python
nilai = int(input("Nilai ujian: "))

if nilai >= 85:
    print("Sangat baik") # Indentasi (1 tab)
elif nilai >= 70:
    print("Baik") # Indentasi (1 tab)
else:
    print("Perlu latihan lagi") # Indentasi (1 tab)
```

<br>
{% include callout.html icon="☑️" color="gray" title="Indentasi" text="
Indentasi adalah penjorokan atau pergeseran suatu teks atau naskah dari batas kiri atau batas kanan margin, baik berupa ruang kosong di awal baris maupun penataan blok tertentu.
" %}
<br>
Contoh:
```bash
kondisi:
└── disini ada identasi
    └── ini identasi lagi
```
<br>
{% include callout.html color="blue" title="Aturan penting" text="
Tanda titik dua : dan indentasi menentukan blok kode.
" %}
<br>
{% include callout.html color="green" title="Urutan kondisi" text="Kondisi diperiksa dari atas ke bawah; cabang pertama yang benar dijalankan.
" %}
<br>

---

### Membaca logika percabangan

![logika percabangan](/portfolio/assets/img/py/Student%20Grade%20Decision%20Flowchart.png)

<br>
{% include callout.html icon="⁉" color="gray" title="Tantangan" text="Jelaskan alur ini dengan kata-kata sendiri sebelum menulis kodenya.
" %}

---

### Perulangan/Loop

{% include callout.html color="red" title="📢" text="Jangan menulis hal yang sama berkali-kali
" %}
<br>

**✘ Tanpa perulangan:**

```python
print(1)
print(2)
print(3)
... sulit angka jika sampai 100.
```

<br>

**✔ Menggunakan perulangan:**

```python
for angka in range(1, 101):
    print(angka)
```

<br>
{% include callout.html icon="🔁" color="gray" title="Loop/Perulangan" text="Loop berguna untuk tugas yang perlu diulang, misalnya memproses daftar nilai.
" %}
<br>

```python
# Contoh kode:
for nama in ["Ayu", "Bima", "Citra"]:
    print(f"Halo, {nama}")
```

<br>

#### `for` dan `range()`

```python
for i in range(5): # range(5) Menghasilkan 0, 1, 2, 3, 4.
    print(i)

for i in range(1, 6): # range(1,6) Mulai 1, berhenti sebelum 6.
    print(i)

for i in range(2, 11, 2): # range(start, stop, step) Argumen stop tidak ikut.
    print(i)
```

<br>

#### `while`: ulangi selama kondisi benar

```python
hitung = 1

while hitung <= 5:
    print(hitung)
    hitung += 1
```

<br>
{% include callout.html color="red" title="Waspadai infinite loop
" text="Jika kondisi tidak pernah menjadi False, program dapat berjalan terus.
" %}
<br>
{% include callout.html color="green" title="break & continue" text="break: hentikan loop.
continue: lanjut ke iterasi berikutnya.
" %}
<br>
ⓘ **Latihan, minta kata sandi sampai pengguna memasukkan jawaban yang benar.**

---

### List: menyimpan banyak nilai berurutan

List dalam Python adalah tipe data bawaan yang digunakan untuk menyimpan banyak nilai atau objek dalam satu variabel dengan menggunakan tanda kurung siku [].

```python
# contoh List:
buah = ["apel", "mangga", "jeruk"]

print(buah[0])  # apel
buah.append("pisang")
buah[1] = "anggur"

for item in buah:
    print(item)
```

<br>
**Ciri-ciri List:**

- Berurutan,
- Dapat diubah (Mutable),
- Indeks dimulai dari 0

**Operasi umum:**

- `append()`
- `remove()`
- `len()`
- `sort()`

<br>
{% include callout.html color="gray" icon="ⓘ" title="Latihan" text="Simpan 5 nilai ujian lalu hitung rata-ratanya.
" %}
<br>

---

### Tuple, set, dan dictionary

#### 1. Tuple

**Tuple** dalam Python adalah tipe data koleksi yang digunakan untuk menyimpan sekumpulan data atau nilai secara berurutan, namun bersifat immutable (tidak dapat diubah, ditambah, atau dihapus setelah dibuat). Tuple biasanya ditulis menggunakan tanda kurung biasa `()`. [^6]

**Contoh penggunaan, seperti:**

- Data koordinat GPS = `(10,20)`
- Warna RGB = `(255, 255, 255)`

**Ciri-ciri Tuple:**

- Berurutan
- Umumnya tidak diubah setelah dibuat (Immutable)
- Cocok untuk data tetap

#### 2. Set

**Set** dalam Python adalah tipe data koleksi yang menyimpan sekumpulan elemen bersifat unik (tidak ada duplikasi) dan tidak berurutan (unordered). Set ditulis menggunakan tanda kurung kurawal `{}` atau fungsi `set()`. [^7]

**Contoh penggunaan, seperti:**

- warna = `{"merah", "biru"}`
- nama_izin = `{"andi", "budi", "cintia"}`

contoh menggunakan fungsi `set()`:

```python
data = [1, 2, 2, 3, 4, 4, 5]
data_unik = set(data)  # Hasil: {1, 2, 3, 4, 5}, dari list [] diubah ke {}
```

<br>

**Ciri-ciri set:**

- Nilai unik
- Tidak menyimpan duplikat
- Urutan bukan tujuan utamanya

#### 3. Dictionary

**Dictionary** dalam Python adalah struktur data yang menyimpan kumpulan data dalam bentuk pasangan kunci dan nilai **(key-value pairs)**, seperti format `{ 'kunci': 'nilai' }`. [^8]

{% include callout.html color="gray" icon="💡" title="Key to remember!" text=" pasangan `{\"key\":\"value\"}`
" %}
<br>
**Contoh penggunaan, seperti:**

```python
kontak_hp = {
    "Ibu": "0812-3456-7890",
    "Andi Teman Kuliah": "0857-1111-2222",
    "Budi Sembako": "0819-8888-9999"
}
```

<br>
**Ciri-ciri Dictionary:**

- Pasangan key-value
- Akses dengan key
- Cocok untuk data berlabel

{% include callout.html color="blue" title="📝" text=" Pilih struktur data sesuai kebutuhan—jangan menggunakan list untuk semua masalah.
" %}

---

### Fungsi: buat kode yang dapat digunakan ulang

Fungsi dalam Python adalah blok kode terorganisasi yang dirancang untuk menjalankan tugas tertentu dan dapat dipanggil berulang kali di dalam program. [^9]

Untuk memulai pembuatan fungsi diawali dengan `def`

**Contoh kode:**

```python
def luas_persegi_panjang(panjang, lebar):
    return panjang * lebar

hasil = luas_persegi_panjang(8, 4)
print(hasil)  # 32
```

<br>
{% include callout.html color="blue" title="Parameter dan Argumen" text=" **Parameter**: `panjang` dan `lebar`. Mereka adalah variabel sementara yang tertulis di dalam kurung baris pertama (`def luas_persegi_panjang(...)`). Tugasnya menerima nilai kiriman.<br>
**Argumen**: `8` dan `4`. Mereka adalah angka atau nilai asli yang kamu masukkan ke dalam kurung saat memanggil fungsi di baris bawahnya (`luas_persegi_panjang(8, 4)`).
" %}
<br>
{% include callout.html color="green" title="return" text="Mengembalikan hasil kepada pemanggil.
" %}

---

### Bedakan `print()` dan `return`

{% include callout.html color="yellow" title="print()" text="Menampilkan sesuatu ke layar.<br>
Cocok untuk melihat hasil atau memberi informasi.
" %}
<br>
{% include callout.html color="blue" title="return" text="Mengirimkan nilai keluar dari fungsi.<br>
Hasilnya dapat disimpan atau digunakan dalam perhitungan lain.
" %}
<br>
**Contoh:**

```python
def tambah(a, b):
    return a + b
hasil = tambah(2, 3)
print(hasil)
```

<br>
**Perbedaan**

| Fitur                      | print()                                                        | return                                             |
| -------------------------- | -------------------------------------------------------------- | -------------------------------------------------- |
| Fungsi Utama               | Menampilkan data ke layar komputer.                            | Mengirim nilai keluar dari fungsi.                 |
| Bisa disimpan ke variabel? | Tidak secara langsung. Hasilnya akan bernilai kosong (`None`). | Bisa. Nilainya dapat disimpan dan diolah kembali.  |
| Efek pada Fungsi           | Fungsi tetap berjalan sampai baris terakhir selesai.           | Fungsi langsung berhenti saat `return` dijalankan. |

---

### Error yang sering ditemui di dalam Python

| Jenis Error   | Penyebab                               | Contoh Kode     |
| ------------- | -------------------------------------- | --------------- |
| `SyntaxError` | Sintaks Python tidak valid.            | `print("Halo"`  |
| `NameError`   | Variabel atau fungsi belum dikenali.   | `print(nama)`   |
| `TypeError`   | Operasi tidak sesuai dengan tipe data. | `"umur: " + 16` |
| `ValueError`  | Nilai tidak valid untuk konversi.      | `int("abc")`    |

\| `IndentationError` | Indentasi salah atau tidak konsisten. | `if True:`

{% include callout.html color="green" title="💡 Tips" text="Baca pesan error dari baris terakhir, lalu periksa nama, tipe data, tanda baca, dan indentasi.
" %}

---

### Cara Debugging yang benar

- Baca pesan error sampai selesai; cari nama error dan nomor baris.
- Periksa nilai variabel menggunakan print() atau debugger.
- Uji program dengan input kecil dan kasus tepi.
- Ubah satu hal dalam satu waktu.
- Setelah memperbaiki, jalankan ulang pengujian.
  <br>
  {% include callout.html color="yellow" title="🧠 Mindset" text="Error bukan tanda gagal.
  Error adalah petunjuk tentang apa yang perlu diperiksa.
  " %}

---

### Latihan: Menghitung Rata-Rata Nilai Siswa

Studi kasus: Program Penilaian Siswa

Seorang guru ingin membuat program Python sederhana untuk menghitung rata-rata nilai siswa dari tiga ujian. Program juga harus menentukan apakah siswa tersebut tuntas atau perlu latihan berdasarkan nilai rata-ratanya.

**Instruksi soal**
Buatlah program Python yang dapat:

1. Meminta pengguna memasukkan nama siswa.
2. Meminta pengguna memasukkan tiga nilai ujian.
3. Menghitung rata-rata dari ketiga nilai tersebut.
4. Menampilkan nama siswa dan nilai rata-rata dengan 1 angka di belakang koma.
5. Menentukan status siswa dengan ketentuan:
   - Rata-rata ≥ 75: tampilkan Tuntas.
   - Rata-rata < 75: tampilkan Perlu latihan.

Contoh output:

```bash
Nama siswa: Andi
Nilai 1: 80
Nilai 2: 75
Nilai 3: 90

Rata-rata Andi: 81.7
Tuntas
```

<br>

---

### Catatan kaki

[^1]: https://dif.telkomuniversity.ac.id/tipe-data/

[^2]: https://www.datacamp.com/id/tutorial/python-data-type-conversion

[^3]: https://dqlab.id/belajar-coding-python-bersama-dqlab

[^4]: https://www.petanikode.com/python-input-output/

[^5]: https://dqlab.id/step-by-step-percabangan-else-if-python

[^6]: https://www.petanikode.com/python-tuple/

[^7]: https://www.revou.co/panduan-teknis/python-set

[^8]: https://www.revou.co/panduan-teknis/dictionary-python

[^9]: https://www.datacamp.com/id/tutorial/functions-python-tutorial
