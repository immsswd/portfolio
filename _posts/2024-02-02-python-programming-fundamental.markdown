---
layout: presentation
title: "Pemrograman Python Dasar"
date: 2024-02-02 07:09:51 +0700
categories: Programming
subtitle: Belajar berpikir komputasional melalui pemrograman (Python dasar)
slide_order: auto # auto, content_first, or images_first
ppt_slides:
  - heading: "Komputer itu pintar atau patuh"
    image: /assets/img/py/python1.png
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

## Komputer itu pintar atau patuh

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

![ipo](/portfolio/assets/img/py/python2.png)

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

{% include callout.html color="blue" title="Instruksi" text="Buat sebuah file bernama `hello.py` .py adalah tanda bahwa file ini adalah file python, tulis lalu jalankan
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
{% include callout.html color="green" title="Pertanyaan" text="Mengapa input dari pengguna sering perlu dikonversi?
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

### Catatan kaki

[^1]: https://dif.telkomuniversity.ac.id/tipe-data/

[^2]: https://www.datacamp.com/id/tutorial/python-data-type-conversion
