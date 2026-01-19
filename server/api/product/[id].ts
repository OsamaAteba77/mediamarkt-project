 export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')

  const allProducts = [
    // ==================================================
    // 1. ORIGINAL RICH DATA (IDs 1-8)
    // ==================================================
    {
      id: '1',
      title: 'APPLE iPhone 15 128 GB Akıllı Telefon Siyah MTP03TU/A',
      price: 48999,
      oldPrice: 53999,
      description: 'Dynamic Island, 48 MP Ana Kamera ve USB-C. Dayanıklı renkli cam ve alüminyum tasarım.',
      category: 'Telefon',
      brand: 'Apple',
      rating: 4.7,
      reviews: 184,
      clubPoints: 2450,
      installment: 'Aylık 16.333 TL (3 Taksit)',
      badge: '4000 TL Ek Destek',
      stock: 10,
      isNew: true,
      images: [
        'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_120111127?x=500&y=500',
        'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_120110959?x=536&y=402',
        'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_120110990?x=536&y=402',
        'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_107659642?x=500&y=500'
      ],
      colors: ['#000000', '#ADD8E6', '#90EE90', '#FFFF00', '#FFC0CB'],
      specs: {
        'Ekran Boyutu': '6.1 inç',
        'Dahili Hafıza': '128 GB',
        'İşlemci': 'A16 Bionic Çip',
        'Kamera Çözünürlüğü': '48 MP + 12 MP'
      },
      insurance: [
        { name: '1 Yıl Kaza Koruma Paketi', price: 5499 },
        { name: '2 Yıl Uzatılmış Garanti', price: 7299 }
      ],
      comments: [
        { user: 'Ahmet Y.', date: '2 Gün önce', rating: 5, text: 'Kamera performansı inanılmaz.' }
      ]
    },
    {
      id: '2',
      title: 'DYSON V12 Detect Slim Absolute Kablosuz Süpürge',
      price: 34999,
      oldPrice: null,
      description: 'Görünmez tozları görünür kılan lazer teknolojisi.',
      category: 'Ev Aletleri',
      brand: 'Dyson',
      rating: 4.9,
      reviews: 3250,
      clubPoints: 1750,
      installment: 'Aylık 11.666 TL',
      badge: 'Stoklarla Sınırlı',
      stock: 5,
      images: [
        'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_123735082?x=500&y=500',
        'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_123735073?x=536&y=402'
      ],
      colors: ['#FFD700', '#C0C0C0'],
      specs: { 'Emiş Gücü': '150 AW', 'Çalışma Süresi': '60 dk' },
      insurance: [{ name: '2 Yıl Ek Garanti', price: 3499 }]
    },
    {
      id: '3',
      title: 'PHILIPS HD9650/90 XXL Airfryer Fritöz Siyah',
      price: 10999,
      oldPrice: 12499,
      category: 'Ev Aletleri',
      brand: 'Philips',
      rating: 4.8,
      reviews: 5120,
      clubPoints: 550,
      installment: 'Aylık 3.666 TL',
      badge: 'Çok Satan',
      stock: 20,
      images: [
        'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MP_149781401?x=500&y=500',
        'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MP_149781402?x=536&y=402'
      ],
      specs: { 'Güç': '2225 W', 'Kapasite': '7.3 L' }
    },
    {
      id: '4',
      title: 'APPLE AirPods 2. Nesil ve MagSafe Şarj Kutusu',
      price: 12999,
      category: 'Ses',
      brand: 'Apple',
      rating: 4.9,
      reviews: 890,
      clubPoints: 650,
      badge: 'Fırsat Ürünü',
      images: [
        'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MP_168136770?x=500&y=500',
        'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MP_168136773?x=536&y=402'
      ],
      specs: { 'Bağlantı': 'Bluetooth 5.3', 'Pil Ömrü': '6 saat' }
    },
    {
      id: '5',
      title: 'SAMSUNG Galaxy S24 Ultra 256 GB Titanyum Gri',
      price: 69999,
      oldPrice: 74999,
      category: 'Telefon',
      brand: 'Samsung',
      rating: 4.8,
      reviews: 450,
      clubPoints: 3500,
      installment: 'Aylık 23.333 TL',
      badge: '750 TL Kupon',
      images: [
        'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MP_167821090?x=500&y=500',
        'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MP_167821091?x=536&y=402'
      ],
      colors: ['#808080', '#000000'],
      specs: { 'Ekran': '6.8 inç', 'Kamera': '200 MP', 'S-Pen': 'Var' },
      insurance: [{ name: 'Ekran Koruma (1 Yıl)', price: 3499 }]
    },
    {
      id: '6',
      title: 'ROBOROCK S8 Pro Ultra Robot Süpürge',
      price: 29999,
      oldPrice: 32999,
      category: 'Ev Aletleri',
      brand: 'Roborock',
      rating: 4.7,
      reviews: 215,
      clubPoints: 1500,
      badge: 'Ücretsiz Kargo',
      images: [
        'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_155420735?x=500&y=500',
        'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_155420732?x=536&y=402'
      ],
      specs: { 'Emiş Gücü': '6000 Pa', 'Çalışma Süresi': '180 dk' }
    },
    {
      id: '7',
      title: 'LENOVO IdeaPad Slim 3 Ryzen 5',
      price: 19999,
      oldPrice: 22999,
      category: 'Bilgisayar',
      brand: 'Lenovo',
      rating: 4.6,
      reviews: 124,
      clubPoints: 1000,
      installment: 'Aylık 6.666 TL',
      badge: '%15 İndirim',
      images: [
        'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_148835739?x=500&y=500',
        'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_159956308?x=536&y=402'
      ],
      specs: { 'İşlemci': 'Ryzen 5 7320U', 'RAM': '8 GB', 'SSD': '512 GB' },
      insurance: [{ name: '1 Yıl Kaza Koruması', price: 1899 }]
    },
    {
      id: '8',
      title: 'JBL Flip 7 Bluetooth Hoparlör Siyah',
      price: 5890,
      oldPrice: 6500,
      category: 'Ses',
      brand: 'JBL',
      rating: 4.8,
      reviews: 4314,
      clubPoints: 595,
      installment: 'Aylık 1.963 TL',
      badge: 'Yeni Ürün',
      images: [
        'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_153478883?x=500&y=500',
        'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_153478849?x=536&y=402'
      ],
      colors: ['#000000', '#FF0000', '#0000FF'],
      specs: { 'Pil Ömrü': '12 Saat', 'Suya Dayanıklılık': 'IP67' },
      comments: [{ user: 'Mehmet D.', date: 'Dün', rating: 5, text: 'Ses kalitesi muazzam.' }]
    },

    // ==================================================
    // NEW PHONES & ITEMS (IDs 9-40) - FIXED & STANDARDIZED
    // ==================================================
    {
      id: '9',
      title: 'APPLE iPhone 15 256 GB Akıllı Telefon Mavi',
      price: 53999,
      category: 'Telefon',
      brand: 'Apple',
      rating: 4.7,
      reviews: 26,
      badge: 'CLUB Fırsatı',
      images: ['https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_120121342?x=536&y=402'],
      specs: { 'Ekran': '6.1 inç', 'Hafıza': '256 GB' }
    },
    {
      id: '10',
      title: 'APPLE iPhone 15 Plus 128 GB Akıllı Telefon Pembe',
      price: 58999,
      category: 'Telefon',
      brand: 'Apple',
      rating: 4.8,
      reviews: 98,
      badge: 'Stoklarla Sınırlı',
      images: ['https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_120132458?x=536&y=402'],
      specs: { 'Ekran': '6.7 inç', 'Hafıza': '128 GB' }
    },
    {
      id: '11',
      title: 'APPLE iPhone 15 Pro 128 GB Akıllı Telefon Titanyum',
      price: 74999,
      category: 'Telefon',
      brand: 'Apple',
      rating: 4.9,
      reviews: 11,
      badge: 'Yeni Ürün',
      images: ['https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_150569884?x=536&y=402'],
      specs: { 'Ekran': '6.1 inç', 'Hafıza': '128 GB', 'İşlemci': 'A17 Pro' }
    },
    {
      id: '12',
      title: 'APPLE iPhone 15 Pro Max 256 GB Akıllı Telefon Titanyum',
      price: 89999,
      category: 'Telefon',
      brand: 'Apple',
      rating: 4.9,
      reviews: 30,
      badge: 'En Çok Satan',
      images: ['https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_150569884?x=536&y=402'],
      specs: { 'Ekran': '6.7 inç', 'Hafıza': '256 GB', 'İşlemci': 'A17 Pro' }
    },
    {
      id: '13',
      title: 'APPLE Yenilenmiş G2 iPhone 14 Pro 128 GB Akıllı Telefon Mor',
      price: 42999,
      category: 'Telefon',
      brand: 'Apple',
      rating: 4.7,
      reviews: 40,
      badge: 'Fırsat Ürünü',
      images: ['https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_150526693?x=536&y=402'],
      specs: { 'Ekran': '6.1 inç', 'Hafıza': '128 GB' }
    },
    {
      id: '14',
      title: 'APPLE iPhone 13 128 GB Akıllı Telefon Yeşil',
      price: 37999,
      category: 'Telefon',
      brand: 'Apple',
      rating: 4.6,
      reviews: 10,
      badge: 'İndirim',
      images: ['https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_159948578?x=536&y=402'],
      specs: { 'Ekran': '6.1 inç', 'Hafıza': '128 GB' }
    },
    {
      id: '15',
      title: 'SAMSUNG Galaxy S24 256 GB Akıllı Telefon',
      price: 49999,
      category: 'Telefon',
      brand: 'Samsung',
      rating: 4.7,
      reviews: 80,
      badge: 'CLUB Puan',
      images: ['https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_135895986?x=536&y=402'],
      specs: { 'Ekran': '6.2 inç', 'Hafıza': '256 GB' }
    },
    {
      id: '16',
      title: 'SAMSUNG Galaxy S24+ 256 GB Akıllı Telefon',
      price: 57999,
      category: 'Telefon',
      brand: 'Samsung',
      rating: 4.7,
      reviews: 90,
      badge: 'Yeni',
      images: ['https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MP_167821273?x=536&y=402'],
      specs: { 'Ekran': '6.7 inç', 'Hafıza': '256 GB' }
    },
    {
      id: '17',
      title: 'SAMSUNG Galaxy S25 Ultra 5G 12/256GB Akıllı Telefon Titanyum Siyah',
      price: 80999,
      category: 'Telefon',
      brand: 'Samsung',
      rating: 4.8,
      reviews: 72,
      badge: 'İndirim',
      images: ['https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_151512961?x=536&y=402'],
      specs: { 'Ekran': '6.8 inç', 'Hafıza': '256 GB' }
    },
    {
      id: '18',
      title: 'SAMSUNG Galaxy A55 128 GB Akıllı Telefon',
      price: 16999,
      category: 'Telefon',
      brand: 'Samsung',
      rating: 4.6,
      reviews: 41,
      badge: 'Çok Satan',
      images: ['https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MP_166438302?x=536&y=402'],
      specs: { 'Ekran': '6.6 inç', 'Hafıza': '128 GB' }
    },
    {
      id: '19',
      title: 'SAMSUNG Galaxy S21 FE 5G 8 GB 128 GB Akıllı Telefon Gri',
      price: 18999,
      category: 'Telefon',
      brand: 'Samsung',
      rating: 4.5,
      reviews: 29,
      badge: 'Stoklarla Sınırlı',
      images: ['https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MP_141008874?x=536&y=402'],
      specs: { 'Ekran': '6.4 inç', 'Hafıza': '128 GB' }
    },
    {
      id: '20',
      title: 'SAMSUNG Galaxy A07 4/128GB Akıllı Telefon Siyah',
      price: 7999,
      category: 'Telefon',
      brand: 'Samsung',
      rating: 4.4,
      reviews: 60,
      badge: 'Fiyat/Performans',
      images: ['https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_163378352?x=536&y=402'],
      specs: { 'Ekran': '6.7 inç', 'Hafıza': '128 GB' }
    },
    {
      id: '21',
      title: 'XIAOMI Redmi Note 14 Pro 8/256 GB Akıllı Telefon Siyah',
      price: 17999,
      category: 'Telefon',
      brand: 'Xiaomi',
      rating: 4.6,
      reviews: 55,
      badge: 'Yeni Ürün',
      images: [
        'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_149214710?x=536&y=402',
        'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_149214704?x=536&y=402'
      ],
      specs: { 'Ekran': '6.67 inç', 'Hafıza': '256 GB' }
    },
    {
      id: '22',
      title: 'XIAOMI Redmi 15C 8/256 GB Akıllı Telefon Siyah',
      price: 10999,
      category: 'Telefon',
      brand: 'Xiaomi',
      rating: 4.5,
      reviews: 30,
      badge: 'İndirim',
      images: [
        'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_160901167?x=536&y=402',
        'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_160901162?x=536&y=402'
      ],
      specs: { 'Ekran': '6.74 inç', 'Hafıza': '256 GB' }
    },
    {
      id: '23',
      title: 'XIAOMI Redmi Note 15 Pro 8/256GB Akıllı Telefon Titanium',
      price: 25999,
      category: 'Telefon',
      brand: 'Xiaomi',
      rating: 4.5,
      reviews: 40,
      badge: 'Çok Satan',
      images: [
        'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_168604026?x=536&y=402',
        'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_168604045?x=536&y=402'
      ],
      specs: { 'Ekran': '6.67 inç', 'Hafıza': '256 GB' }
    },
    {
      id: '24',
      title: 'POCO X6 5G 12 GB 512 GB Akıllı Telefon Siyah',
      price: 20999,
      category: 'Telefon',
      brand: 'POCO',
      rating: 4.6,
      reviews: 10,
      badge: 'Performans Canavarı',
      images: [
        'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MP_167273982?x=536&y=402',
        'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MP_136008539?x=536&y=402'
      ],
      specs: { 'Ekran': '6.67 inç', 'Hafıza': '512 GB' }
    },
    {
      id: '25',
      title: 'HUAWEI P60 Pro 256 GB Akıllı Telefon İnci Beyazı',
      price: 49999,
      category: 'Telefon',
      brand: 'Huawei',
      rating: 4.6,
      reviews: 95,
      badge: 'Kamera Uzmanı',
      images: [
        'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_106569756?x=536&y=402',
        'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_106569748?x=536&y=402'
      ],
      specs: { 'Ekran': '6.67 inç', 'Hafıza': '256 GB' }
    },
    {
      id: '26',
      title: 'HUAWEI Nova 13 Pro 12/512 GB Akıllı Telefon Siyah',
      price: 32999,
      category: 'Telefon',
      brand: 'Huawei',
      rating: 4.4,
      reviews: 60,
      badge: 'İndirim',
      images: [
        'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_150307193?x=536&y=402',
        'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_150307191?x=536&y=402'
      ],
      specs: { 'Ekran': '6.78 inç', 'Hafıza': '512 GB' }
    },
    {
      id: '27',
      title: 'OPPO Reno 11FS 8 GB 256 GB Akıllı Telefon Gri',
      price: 15999,
      category: 'Telefon',
      brand: 'OPPO',
      rating: 4.5,
      reviews: 20,
      badge: 'Yeni',
      images: [
        'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MP_167988657?x=536&y=402',
        'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MP_167988662?x=536&y=402'
      ],
      specs: { 'Ekran': '6.43 inç', 'Hafıza': '256 GB' }
    },
    {
      id: '28',
      title: 'TECNO Camon 40 Pro 5G 12/256GB Akıllı Telefon Siyah',
      price: 26999,
      category: 'Telefon',
      brand: 'TECNO',
      rating: 4.4,
      reviews: 8,
      badge: 'Fiyat/Performans',
      images: [
        'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_158247669?x=536&y=402',
        'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_158247625?x=536&y=402'
      ],
      specs: { 'Ekran': '6.8 inç', 'Hafıza': '256 GB' }
    },
    {
      id: '29',
      title: 'CMF BY NOTHING Phone 1 8 GB 256 GB Akıllı Telefon Turuncu',
      price: 15999,
      category: 'Telefon',
      brand: 'CMF BY NOTHING',
      rating: 4.6,
      reviews: 6,
      badge: 'Tasarım',
      images: ['https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MP_168636024?x=536&y=402'],
      specs: { 'Ekran': '6.67 inç', 'Hafıza': '256 GB' }
    },
    {
      id: '30',
      title: 'MONSTER Abra A5',
      price: 34999,
      category: 'Bilgisayar',
      brand: 'Monster',
      rating: 4.5,
      reviews: 15,
      badge: 'Gamer Laptop',
      images: ['https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_168180156?x=536&y=402'],
      specs: { 'Ekran': '15.6 inç FHD', 'İşlemci': 'Intel Core i5', 'RAM': '16 GB' }
    },
    {
      id: '31',
      title: 'ASUS Zenbook 14',
      price: 72999,
      category: 'Bilgisayar',
      brand: 'Asus',
      rating: 4.8,
      reviews: 22,
      badge: 'Ultrabook',
      images: ['https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_150812614?x=536&y=402'],
      specs: { 'Ekran': '14 inç OLED', 'İşlemci': 'Intel Core i7', 'RAM': '16 GB' }
    },
    {
      id: '32',
      title: 'PHILIPS XB7151/07 Süpürge',
      price: 13999,
      category: 'Ev Aletleri',
      brand: 'Philips',
      rating: 4.6,
      reviews: 40,
      badge: 'Ev Aletleri',
      images: ['https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_107581046?x=536&y=402'],
      specs: { 'Emiş Gücü': '2100 W', 'Toz Kapasitesi': '2 Litre' }
    },
    {
      id: '33',
      title: 'TEFAL TY6983 X-Pert 3.60 V Kablosuz Süpürge',
      price: 8999,
      category: 'Ev Aletleri',
      brand: 'Tefal',
      rating: 4.5,
      reviews: 28,
      badge: 'Ev Aletleri',
      images: ['https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_84415458?x=536&y=402'],
      specs: { 'Emiş Gücü': '120 AW', 'Çalışma Süresi': '45 dk' }
    },
    {
      id: '34',
      title: 'ARNICA GH22230 7 L Airfryer Inox',
      price: 3499,
      category: 'Mutfak Aletleri',
      brand: 'Arnica',
      rating: 4.4,
      reviews: 15,
      badge: 'Mutfak Aletleri',
      images: ['https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_157674347?x=536&y=402'],
      specs: { 'Kapasite': '7 L', 'Güç': '1500 W' }
    },
    {
      id: '35',
      title: 'PHILIPS NA555/00 5000 Serisi Çift Hazneli Airfryer',
      price: 17999,
      category: 'Mutfak Aletleri',
      brand: 'Philips',
      rating: 4.7,
      reviews: 32,
      badge: 'Mutfak Aletleri',
      images: ['https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_149735525?x=536&y=402'],
      specs: { 'Kapasite': '1.2 kg', 'Güç': '2225 W' }
    },
    {
      id: '36',
      title: 'APPLE Airpods Max (USB-C) Kablosuz Kulak Üstü Kulaklık Mor',
      price: 26499,
      category: 'Ses Aletleri',
      brand: 'Apple',
      rating: 4.8,
      reviews: 22,
      badge: 'Ses Aletleri',
      images: ['https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_165042391?x=536&y=402'],
      specs: { 'Bağlantı': 'Bluetooth 5.0', 'Pil Ömrü': '20 Saat' }
    },
    {
      id: '37',
      title: 'SAMSUNG Galaxy Buds3 Pro Bluetooth Kuak İçi Kulaklık Gümüş',
      price: 7999,
      category: 'Ses Aletleri',
      brand: 'Samsung',
      rating: 4.7,
      reviews: 30,
      badge: 'Ses Aletleri',
      images: ['https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_142810343?x=536&y=402'],
      specs: { 'Bağlantı': 'Bluetooth 5.0', 'Pil Ömrü': '20 Saat' }
    },
    {
      id: '38',
      title: 'DREAME L10S Ultra Gen2 Robot Süpürge Beyaz',
      price: 3999,
      category: 'Ev Aletleri',
      brand: 'Dreame',
      rating: 4.8,
      reviews: 22,
      badge: 'Ev Aletleri',
      images: ['https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_151548522?x=536&y=402'],
      specs: { 'Emiş Gücü': '1800 W', 'Toz Kapasitesi': '1.5 Litre' }
    },
    {
      id: '39',
      title: 'HOOVER HLEH10A2TCEX-17 10 Kg Kurutma Makinesi',
      price: 17999,
      category: 'Ev Aletleri',
      brand: 'HOOVER',
      rating: 4.7,
      reviews: 40,
      badge: 'Ev Aletleri',
      images: ['https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_156808925?x=536&y=402'],
      specs: { 'Kapasite': '10 kg', 'Güç': '2200 W' }
    },
    {
      id: '40',
      title: 'SAMSUNG AR35 AR12TXHQBWK A++ 12000 BTU Inverter Klima',
      price: 39999,
      category: 'Ev Aletleri',
      brand: 'Samsung',
      rating: 4.7,
      reviews: 20,
      badge: 'Ev Aletleri',
      images: ['https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_103400444?x=536&y=402'],
      specs: { 'Kapasite': '12000 BTU', 'Güç': '1200 W' }
    }
  ]

  // Find the specific product
  const product = allProducts.find(p => p.id === id)

  // Handle Not Found
  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Product Not Found',
    })
  }

  return product
})