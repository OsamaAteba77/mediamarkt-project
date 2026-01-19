export default defineEventHandler(() => {
  return {
    navItems: [
      { key: 'telefon', label: 'Telefon' },
      { key: 'bilgisayar', label: 'Bilgisayar' },
      { key: 'beyaz', label: 'Beyaz Eşya' },
      { key: 'ev', label: 'Ev Aletleri & Yaşam' },
      { key: 'kisisel', label: 'Kişisel Bakım' },
      { key: 'tv', label: 'TV, Görüntü ve Ses' },
      { key: 'kampanyalar', label: 'Kampanyalar' },
      { key: 'club', label: 'MediaMarkt CLUB' },
      // Extra items for "More" menu
      { key: 'musteri', label: 'Müşteri Hizmetleri' },
      { key: 'sigorta', label: 'Sigorta ve Artı Hizmetler' },
      { key: 'markalar', label: 'Markalarımız' },
      { key: 'kurumsal', label: 'Kurumsal Satış' }
    ],
    menuLeftItems: [
      { key: 'telefon', label: 'Telefon' },
      { key: 'bilgisayar', label: 'Bilgisayar' },
      { key: 'klima', label: 'Klima' },
      { key: 'tv', label: 'TV, Görüntü ve Ses' },
      { key: 'aksesuar', label: 'Aksesuar' },
      { key: 'foto', label: 'Foto & Kamera & Drone' },
      { key: 'beyaz', label: 'Beyaz Eşya' },
      { key: 'ev', label: 'Ev Aletleri & Yaşam' },
      { key: 'kisisel', label: 'Kişisel Bakım & Sağlık' },
      { key: 'spor', label: 'Spor & Oyun & Outdoor' },
      { key: 'bahce', label: 'Bahçe & Yapı Market' },
      { key: 'brands', label: 'Tüm Markalar' }
    ],
    brandsLeft: [
      'Tüm Markalar', 'Apple', 'Samsung', 'Philips', 'Dyson', 'Bosch',
      'Roborock', 'Grundig', 'Hoover', 'Altus', 'HP', 'LG', 'Xiaomi', 'Huawei', 'Lenovo'
    ],
    brandsRight: [
      'ASUS', 'JBL', 'TCL', 'DJI', 'Braun', 'Logitech', 'Electrolux',
      'Tefal', 'Siemens', 'PEAQ - MediaMarkt Markası', 'KOENIC - MediaMarkt Markası',
      'ISY - MediaMarkt Markası'
    ],
    megaData: {
      telefon: [
        [{ title: 'Telefon', items: ['Telefon'] }, { title: 'Apple Telefonlar', items: ['iPhone 17', 'iPhone Air', 'iPhone 17 Pro', 'iPhone 17 Pro Max', 'iPhone 16', 'iPhone 16 Plus', 'iPhone 16 Pro', 'iPhone 16 Pro Max', 'iPhone 16e', 'iPhone 15', 'iPhone 14', 'iPhone 13', 'iPhone 12', 'iPhone 11'] }, { title: 'Android Telefonlar', items: ['Xiaomi', 'Huawei', 'Oppo', 'Realme', 'Vivo', 'Casper', 'Tecno', 'Omix', 'Infinix'] }],
        [{ title: 'Samsung Telefonlar', items: ['Galaxy S Serisi', 'Galaxy A Serisi', 'Galaxy Z Serisi'] }, { title: 'Akıllı Saat', items: ['Apple Akıllı Saatler', 'Samsung Akıllı Saatler', 'Huawei Akıllı Saatler', 'Xiaomi Akıllı Saatler', 'Akıllı Çocuk Saati', 'Samsung Akıllı Yüzükler'] }, { title: 'Akıllı Bileklik', items: [] }],
        [{ title: 'Kulaklıklar', items: ['Kulak İçi Kulaklıklar', 'Kulak Üstü Kulaklıklar', 'Bluetooth Kulaklıklar', 'Apple Kulaklıklar'] }, { title: 'Yapay Zeka Destekli Telefonlar', items: [] }, { title: 'Katlanabilir Telefonlar', items: [] }]
      ],
      bilgisayar: [
        [{ title: 'Bilgisayar', items: ['Bilgisayar'] }, { title: 'Laptoplar', items: ['Macbook', 'Lenovo', 'ASUS', 'HP', 'Monster', 'Huawei', 'Casper', 'Acer', 'Oyuncu Laptop', 'Yapay Zeka Destekli Laptoplar'] }, { title: 'Masaüstü Bilgisayarlar', items: ['iMac', 'Mac Mini', 'All in One', 'OEM Hazır Sistemler'] }, { title: 'Bilgisayar Bileşenleri', items: ['SSD', 'Anakart', 'RAM Bellek', 'İşlemci', 'Ekran Kartı', 'Kasa'] }],
        [{ title: 'Tabletler', items: ['Apple iPad', 'Samsung', 'Huawei', 'Lenovo', 'Casper', 'Honor'] }, { title: 'Çevre Birimleri', items: ['Klavye', 'Klavye & Mouse Set', 'Mouse', 'Mousepad', 'Network Ürünleri', 'Monitör', 'Oyuncu Monitörü'] }, { title: 'Yazıcı & Tarayıcı', items: ['Kartuş', 'Tonerler'] }, { title: 'Hafıza ve Depolama', items: ['Taşınabilir SSD', 'Harici Harddisk', 'USB Bellek'] }],
        [{ title: 'Bilgisayar & Tablet Aksesuarları', items: ['Laptop Aksesuarları', 'Tablet Aksesuarları'] }, { title: 'Oyuncu Aksesuarları', items: ['Oyuncu Aksesuarları', 'Oyuncu Klavyesi', 'Oyuncu Kulaklığı', 'Oyuncu Mouse', 'Oyuncu Mousepad', 'Pc Joystick ve Gamepad', 'Direksiyon Seti'] }]
      ],
      klima: [
        [{ title: 'Klima', items: ['Klima'] }, { title: 'BTU Seçenekleri', items: ['7000 BTU Klima', '9000 BTU Klima', '12000 BTU Klima', '18000 BTU Klima', '24000 BTU Klima'] }], [], []
      ],
      tv: [
        [{ title: 'TV, Görüntü ve Ses', items: ['TV, Görüntü ve Ses'] }, { title: 'Televizyon', items: ['Samsung', 'LG', 'Philips', 'Vestel', 'Grundig', 'TCL', 'Thomson TV', 'Onvo', 'PEAQ', 'OLED TV', 'QLED TV'] }, { title: 'TV Box', items: ['Apple TV', 'Xiaomi TV Box', 'TV Stick'] }],
        [{ title: 'Ses Sistemleri', items: ['Soundbar', 'Bluetooth Hoparlör', 'JBL', 'Harman Kardon', 'LG', 'Grundig', 'Marshall', 'Apple', 'Mikrofon'] }, { title: 'Projeksiyon', items: [] }, { title: 'Uydu Alıcıları', items: [] }],
        [{ title: 'TV Aksesuarları', items: ['Askı Aparatları', 'TV Arkası LED Işık', 'HDMI Kablo', 'Uydu Kabloları', 'Ses Kablosu', 'Akım Koruyucu Prizler', 'Güvenlik Kamerası'] }]
      ],
      aksesuar: [
        [{ title: 'Aksesuar', items: ['Aksesuar'] }, { title: 'Telefon Aksesuarları', items: ['Telefon Kılıfı', 'iPhone Telefon Kılıfı', 'Samsung Telefon Kılıfı', 'Ekran Koruyucu', 'iPhone Ekran Koruyucu', 'Şarj Cihazı', 'Powerbank', 'Araç İçi Telefon Tutucu'] }, { title: 'Oyun Konsolu Aksesuarları', items: ['PS4 Aksesuarları', 'PS5 Aksesuarları', 'Xbox Aksesuarları', 'Nintendo Aksesuarları'] }],
        [{ title: 'Kablolar, Dönüştürücüler ve Prizler', items: ['Uydu Kabloları', 'Akım Koruyucu Priz', 'HDMI Kablo', 'Ses Kablosu', 'VGA Kablosu', 'Network Ürünleri'] }, { title: 'Valiz', items: ['Kabin Boy Valiz', 'Orta Boy Valiz', 'Büyük Boy Valiz', 'Valiz Seti'] }, { title: 'Bilgisayar ve Tablet Aksesuarları', items: ['PC Joystick ve Gamepad', 'Direksiyon Seti', 'Tablet Aksesuarları', 'Laptop Aksesuarları', 'Laptop Şarj Aleti', 'Laptop Soğutucu'] }],
        [{ title: 'Foto Kamera Aksesuarları', items: ['Kamera Filtresi', 'Tripod', 'Pil & Şarj Aleti'] }, { title: 'Giyilebilir Teknoloji', items: ['Akıllı Saatler', 'Akıllı Bileklik', 'Sanal Gerçeklik Gözlüğü'] }]
      ],
      foto: [
        [{ title: 'Foto & Kamera & Drone', items: ['Foto & Kamera & Drone'] }, { title: 'Fotoğraf Makineleri', items: ['Şipşak Fotoğraf Makineleri', 'Dijital Kompakt Makineler', 'Aynasız Fotoğraf Makineleri', 'DSLR Fotoğraf Makineleri'] }, { title: 'Video Kamera', items: ['Aksiyon Kamerası', 'Araç İçi Kamera', 'Vlog Kamerası'] }],
        [{ title: 'Yayıncı Ekipmanları', items: ['Yayıncı Mikrofonu', 'Yayıncı Kamera & Webcam', 'Yayıncı Aksesuarları', 'Youtuber Halka Işık'] }, { title: 'Drone', items: [] }, { title: 'Aksesuarlar', items: ['Hafıza Kartları', 'Piller ve Şarj Cihazları', 'Aksiyon Kamera Aksesuarları'] }],
        [{ title: 'Fotoğraf Yazıcıları & Kağıt', items: [] }, { title: 'Mikrofon', items: [] }, { title: 'Fotoğraf Makinesi Lensleri', items: [] }, { title: 'Tripod', items: [] }, { title: 'Gimbal', items: [] }, { title: 'Dürbün & Teleskop & Mikroskop', items: [] }, { title: 'Güvenlik Kamerası', items: [] }]
      ],
      beyaz: [
        [{ title: 'Beyaz Eşya', items: ['Beyaz Eşya'] }, { title: 'Yuva Kuran Düğün Paketleri', items: [] }, { title: 'Buzdolabı', items: ['Alttan Donduruculu Buzdolabı', 'Üstten Donduruculu Buzdolabı', 'Mini Buzdolabı', 'No Frost Buzdolabı', 'Çift Kapılı Gardrop Tipi Buzdolabı'] }, { title: 'Bulaşık Makineleri', items: ['Samsung Bulaşık Makinesi', 'Bosch Bulaşık Makinesi', 'Electrolux Bulaşık Makinesi'] }],
        [{ title: 'Çamaşır Makineleri', items: ['Bosch Çamaşır Makinesi', 'Electrolux Çamaşır Makinesi', 'LG Çamaşır Makinesi'] }, { title: 'Kurutma Makineleri', items: ['Samsung Kurutma Makinesi', 'Grundig Kurutma Makinesi', 'Hoover Kurutma Makinesi'] }, { title: 'Ankastre', items: ['Ankastre Fırın', 'Ankastre Ocak', 'Aspiratör', 'Davlumbaz'] }],
        [{ title: 'Fırınlar', items: ['Ocaklı Fırınlar', 'Mikrodalga Fırınlar', 'Mini & Midi Fırınlar'] }, { title: 'Ocaklar', items: [] }, { title: 'Derin Dondurucular', items: ['Çekmeceli Derin Dondurucu', 'Sandık Tipi Dondurucu'] }, { title: 'Klimalar', items: ['7000 BTU Klima', '9000 BTU Klima', '12000 BTU Klima', '18000 BTU Klima', '24000 BTU Klima'] }, { title: 'Kombiler', items: [] }]
      ],
      ev: [
        [{ title: 'Ev Aletleri & Yaşam', items: ['Ev Aletleri & Yaşam'] }, { title: 'İçecek Hazırlama', items: ['Kahve Makinesi', 'Filtre Kahve Makineleri', 'Türk Kahve Makineleri & Cezveler', 'Espresso Kahve Makineleri', 'Kapsüllü Kahve Makineleri', 'Çay Makineleri', 'Su Isıtıcılar & Kettle', 'Kahveler', 'Termoslar'] }, { title: 'Süpürgeler', items: ['Robot Süpürge', 'Dikey Süpürge', 'Islak Kuru Süpürgeler', 'Toz Torbalı Süpürge', 'Toz Torbasız Süpürge'] }],
        [{ title: 'Halı Yıkama Makineleri', items: [] }, { title: 'Koltuk Yıkama Makineleri', items: [] }, { title: 'Mutfak', items: ['Blender', 'Mikser', 'Doğrayıcı & Rondo', 'Tost Makineleri', 'Airfryer', 'Meyve Sıkacağı', 'Su Arıtma', 'Tavalar', 'Tencereler', 'Dondurma Makinesi'] }, { title: 'Akıllı Ev Sistemleri', items: [] }, { title: 'Evcil Hayvan Ürünleri', items: [] }],
        [{ title: 'Ütüler', items: ['Buharlı Ütü', 'Buhar Kazanlı Ütü', 'Buharlı Dikey Ütü'] }, { title: 'Isıtma & Soğutma', items: ['Klimalar', 'Vantilatörler', 'Kombiler', 'Şofben & Termosifon', 'Isıtıcılar', 'Hava Nemlendirici & Temizleyiciler'] }, { title: 'Aydınlatma Ürünleri', items: ['Masa & Gece Lambaları'] }]
      ],
      kisisel: [
        [{ title: 'Kişisel Bakım & Sağlık', items: ['Kişisel Bakım & Sağlık'] }, { title: 'Saç Bakım Ürünleri', items: ['Saç Düzleştirici', 'Saç Kurutma Makinesi', 'Saç Şekillendirme'] }, { title: 'Ağız Bakım Ürünleri', items: ['Şarjlı Diş Fırçası', 'Ağız Duşu', 'Diş Fırçası Başlıkları'] }],
        [{ title: 'Tıraş Makinesi', items: ['Erkek Bakım Seti', 'Saç Kesme Makinesi', 'Kulak & Burun Kılı Temizleme', 'Tıraş Makinesi Yedek Başlığı'] }, { title: 'Epilasyon', items: ['Epilatör', 'IPL Lazer Epilasyon Cihazı'] }],
        [{ title: 'Yüz ve Tırnak Bakımı', items: [] }, { title: 'Sağlık Ürünleri', items: [] }]
      ],
      spor: [
        [{ title: 'Spor & Oyun & Outdoor', items: ['Spor & Oyun & Outdoor'] }, { title: 'Oyun Konsolları', items: ['Playstation 5', 'Xbox Series X', 'Xbox Series S', 'Nintendo'] }, { title: 'Oyun Konsolu Aksesuarları', items: ['PS5 Aksesuarları', 'PS4 Aksesuarları', 'Xbox Aksesuarları', 'Nintendo Aksesuarları'] }],
        [{ title: 'Oyunlar', items: ['Playstation Oyunları', 'Xbox Oyunları', 'Nintendo Oyunları', 'PC Oyunları'] }, { title: 'Oyuncaklar', items: ['Puzzle', 'Yapı Oyuncakları', 'Figür Oyuncak'] }, { title: 'Su Sporu Ekipmanları', items: ['Elektrikli Deniz Scooter', 'Paddle Board'] }],
        [{ title: 'Elektrikli Taşıtlar', items: ['Elektrikli Scooter', 'Elektrikli Bisiklet', 'Hoverboard'] }, { title: 'Enerji Sistemleri', items: ['Elektrikli Araç Şarj İstasyonu', 'Güneş Paneli', 'Taşınabilir Güç Kaynağı'] }]
      ],
      bahce: [
        [{ title: 'Bahçe & Yapı Market', items: ['Bahçe & Yapı Market'] }, { title: 'Elektrikli El Aletleri', items: ['Elektrikli Testere', 'Akülü ve Şarjlı Vidalama', 'Kırıcı & Delici', 'Somun Sıkma Makinesi', 'Taşlama Makinesi', 'Matkap'] }, { title: 'Bahçe Makineleri', items: ['Çim Biçme Makinesi', 'Budama Makinesi'] }], [], []
      ],
      brands: [ [], [], [] ]
    }
  }
})