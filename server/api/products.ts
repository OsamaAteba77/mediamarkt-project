 export default defineEventHandler((event) => {
  const query = getQuery(event);
  const category = query.category as string; // e.g. "Telefon", "Bilgisayar"

  // Mock Database of ALL products
  const products = [
    // ======================
    // PHONES - APPLE
    // ======================
    {
      id: '1',
      title: 'APPLE iPhone 15 128 GB Akıllı Telefon Siyah',
      price: 48999,
      imageUrl: 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_120111127?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center',
      rating: 4.7,
      reviews: 84,
      badge: '4000 TL Ek Destek',
      category: 'Telefon',
      brand: 'Apple'
    },
    {
      id: '9',
      title: 'APPLE iPhone 15 256 GB Akıllı Telefon Mavi',
      price: 53999,
      imageUrl: 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_120121342?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center',
      rating: 4.7,
      reviews: 26,
      badge: 'CLUB Fırsatı',
      category: 'Telefon',
      brand: 'Apple'
    },
    {
      id: '10',
      title: 'APPLE iPhone 15 Plus 128 GB Akıllı Telefon Pembe',
      price: 58999,
      imageUrl: 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_120132458?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center',
      rating: 4.8,
      reviews: 98,
      badge: 'Stoklarla Sınırlı',
      category: 'Telefon',
      brand: 'Apple'
    },
    {
      id: '11',
      title: 'APPLE iPhone 15 Pro 128 GB Akıllı Telefon Titanyum',
      price: 74999,
      imageUrl: 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_150569884?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center',
      rating: 4.9,
      reviews: 11,
      badge: 'Yeni Ürün',
      category: 'Telefon',
      brand: 'Apple'
    },
    {
      id: '12',
      title: 'APPLE iPhone 15 Pro Max 256 GB Akıllı Telefon Titanyum',
      price: 89999,
      imageUrl: 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_150569884?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center',
      rating: 4.9,
      reviews: 30,
      badge: 'En Çok Satan',
      category: 'Telefon',
      brand: 'Apple'
    },
    {
      id: '13',
      title: 'APPLE Yenilenmiş G2 iPhone 14 Pro 128 GB Akıllı Telefon Mor',
      price: 42999,
      imageUrl: 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_150526693?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center',
      rating: 4.7,
      reviews: 40,
      badge: 'Fırsat Ürünü',
      category: 'Telefon',
      brand: 'Apple'
    },
    {
      id: '14',
      title: 'APPLE iPhone 13 128 GB Akıllı Telefon Yeşil',
      price: 37999,
      imageUrl: 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_159948578?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center',
      rating: 4.6,
      reviews: 10,
      badge: 'İndirim',
      category: 'Telefon',
      brand: 'Apple'
    },

    // ======================
    // PHONES - SAMSUNG
    // ======================
    {
      id: '5',
      title: 'SAMSUNG Galaxy S24 Ultra 256 GB',
      price: 69999,
      imageUrl: 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MP_167821090?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center',
      rating: 4.8,
      reviews: 50,
      badge: '750 TL Kupon',
      category: 'Telefon',
      brand: 'Samsung'
    },
    {
      id: '15',
      title: 'SAMSUNG Galaxy S24 256 GB Akıllı Telefon',
      price: 49999,
      imageUrl: 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_135895986?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center',
      rating: 4.7,
      reviews: 80,
      badge: 'CLUB Puan',
      category: 'Telefon',
      brand: 'Samsung'
    },
    {
      id: '16',
      title: 'SAMSUNG Galaxy S24+ 256 GB Akıllı Telefon',
      price: 57999,
      imageUrl: 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MP_167821273?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center',
      rating: 4.7,
      reviews: 90,
      badge: 'Yeni',
      category: 'Telefon',
      brand: 'Samsung'
    },
    {
      id: '17',
      title: 'SAMSUNG Galaxy S25 Ultra 5G 12/256GB Akıllı Telefon Titanyum Siyah',
      price: 80999,
      imageUrl: 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_151512961?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center',
      rating: 4.8,
      reviews: 72,
      badge: 'İndirim',
      category: 'Telefon',
      brand: 'Samsung'
    },
    {
      id: '18',
      title: 'SAMSUNG Galaxy A55 128 GB Akıllı Telefon',
      price: 16999,
      imageUrl: 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MP_166438302?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center',
      rating: 4.6,
      reviews: 41,
      badge: 'Çok Satan',
      category: 'Telefon',
      brand: 'Samsung'
    },
    {
      id: '19',
      title: 'SAMSUNG Galaxy S21 FE 5G 8 GB 128 GB Akıllı Telefon Gri',
      price: 18999,
      imageUrl: 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MP_141008874?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center',
      rating: 4.5,
      reviews: 29,
      badge: 'Stoklarla Sınırlı',
      category: 'Telefon',
      brand: 'Samsung'
    },
    {
      id: '20',
      title: 'SAMSUNG Galaxy A07 4/128GB Akıllı Telefon Siyah',
      price: 7999,
      imageUrl: 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_163378352?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center',
      rating: 4.4,
      reviews: 60,
      badge: 'Fiyat/Performans',
      category: 'Telefon',
      brand: 'Samsung'
    },

    // ======================
    // PHONES - XIAOMI / REDMI / POCO
    // ======================
    {
      id: '21',
      title: 'XIAOMI Redmi Note 14 Pro 8/256 GB Akıllı Telefon Siyah',
      price: 17999,
      imageUrl: 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_149214710?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center',
      rating: 4.6,
      reviews: 55,
      badge: 'Yeni Ürün',
      category: 'Telefon',
      brand: 'Xiaomi'
    },
    {
      id: '22',
      title: 'XIAOMI Redmi 15C 8/256 GB Akıllı Telefon Siyah',
      price: 10999,
      imageUrl: 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_160901167?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center',
      rating: 4.5,
      reviews: 30,
      badge: 'İndirim',
      category: 'Telefon',
      brand: 'Xiaomi'
    },
    {
      id: '23',
      title: 'XIAOMI Redmi Note 15 Pro 8/256GB Akıllı Telefon Titanium',
      price: 25999,
      imageUrl: 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_168604026?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center',
      rating: 4.5,
      reviews: 40,
      badge: 'Çok Satan',
      category: 'Telefon',
      brand: 'Xiaomi'
    },
    {
      id: '24',
      title: 'POCO X6 5G 12 GB 512 GB Akıllı Telefon Siyah',
      price: 20999,
      imageUrl: 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MP_167273982?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center',
      rating: 4.6,
      reviews: 10,
      badge: 'Performans Canavarı',
      category: 'Telefon',
      brand: 'POCO'
    },

    // ======================
    // PHONES - HUAWEI
    // ======================
    {
      id: '25',
      title: 'HUAWEI P60 Pro 256 GB Akıllı Telefon İnci Beyazı',
      price: 49999,
      imageUrl: 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_106569756?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center',
      rating: 4.6,
      reviews: 95,
      badge: 'Kamera Uzmanı',
      category: 'Telefon',
      brand: 'Huawei'
    },
    {
      id: '26',
      title: 'HUAWEI Nova 13 Pro 12/512 GB Akıllı Telefon Siyah',
      price: 32999,
      imageUrl: 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_150307193?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center',
      rating: 4.4,
      reviews: 60,
      badge: 'İndirim',
      category: 'Telefon',
      brand: 'Huawei'
    },

    // ======================
    // PHONES - OPPO / REALME / NOTHING
    // ======================
    {
      id: '27',
      title: 'OPPO Reno 11FS 8 GB 256 GB Akıllı Telefon Gri',
      price: 15999,
      imageUrl: 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MP_167988657?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center',
      rating: 4.5,
      reviews: 20,
      badge: 'Yeni',
      category: 'Telefon',
      brand: 'OPPO'
    },
    {
      id: '28',
      title: 'TECNO Camon 40 Pro 5G 12/256GB Akıllı Telefon Siyah',
      price: 26999,
      imageUrl: 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_158247669?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center',
      rating: 4.4,
      reviews: 8,
      badge: 'Fiyat/Performans',
      category: 'Telefon',
      brand: 'TECNO'
    },
    {
      id: '29',
      title: 'CMF BY NOTHING Phone 1 8 GB 256 GB Akıllı Telefon Turuncu',
      price: 15999,
      imageUrl: 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MP_168636024?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center',
      rating: 4.6,
      reviews: 6,
      badge: 'Tasarım',
      category: 'Telefon',
      brand: 'CMF BY NOTHING'
    },

    // ======================
    //   CATEGORY - LAPTOPS
    // ======================
    {
      id: '7',
      title: 'LENOVO IdeaPad Slim 3',
      price: 29999,
      imageUrl: 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MP_165855354?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center',
      rating: 4.6,
      reviews: 24,
      badge: '%15 İndirim',
      category: 'Bilgisayar',
      brand: 'Lenovo'
    },
    {
      id: '30',
      title: 'MONSTER Abra A5',
      price: 34999,
      imageUrl: 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_168180156?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center',
      rating: 4.5,
      reviews: 15,
      badge: 'Gamer Laptop',
      category: 'Bilgisayar',
      brand: 'Monster'
    },
    {
      id: '31',
      title: 'ASUS Zenbook 14',
      price: 72999,
      imageUrl: 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_150812614?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center',
      rating: 4.8,
      reviews: 22,
      badge: 'Ultrabook',
      category: 'Bilgisayar',
      brand: 'Asus'
    },
    {
      id: '32',
      title: 'PHILIPS XB7151/07 Süpürge',
      price: 13999,
      imageUrl: 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_107581046?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center',
      rating: 4.6,
      reviews: 40,
      badge: 'Ev Aletleri',
      category: 'Ev Aletleri',
      brand: 'Philips'
    },
    {
      id: '33',
      title: 'TEFAL TY6983 X-Pert 3.60 V Kablosuz Süpürge',
      price: 8999,
      imageUrl: 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_84415458?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center',
      rating: 4.5,
      reviews: 28,
      badge: 'Ev Aletleri',
      category: 'Ev Aletleri',
      brand: 'Tefal'
    },
    {
      id: '34',
      title: 'ARNICA GH22230 7 L Airfryer Inox',
      price: 3499,
      imageUrl: 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_157674347?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center',
      rating: 4.4,
      reviews: 15,
      badge: 'Mutfak Aletleri',
      category: 'Mutfak Aletleri',
      brand: 'Arnica'
    },
    {
      id: '35',
      title: 'PHILIPS NA555/00 5000 Serisi Çift Hazneli Airfryer',
      price: 17999,
      imageUrl: 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_149735525?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center',
      rating: 4.7,
      reviews: 32,
      badge: 'Mutfak Aletleri',
      category: 'Mutfak Aletleri',
      brand: 'Philips'
    },
    {
      id: '36',
      title: 'APPLE Airpods Max (USB-C) Kablosuz Kulak Üstü Kulaklık Mor MWW83TU/A',
      price: 26499,
      imageUrl: 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_165042391?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center',
      rating: 4.8,
      reviews: 22,
      badge: 'Ses Aletleri',
      category: 'Ses Aletleri',
      brand: 'Apple'
    },
    {
      id: '37',
      title: 'SAMSUNG Galaxy Buds3 Pro Bluetooth Kuak İçi Kulaklık Gümüş',
      price: 7999,
      imageUrl: 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_142810343?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center',
      rating: 4.7,
      reviews: 30,
      badge: 'Ses Aletleri',
      category: 'Ses Aletleri',
      brand: 'Samsung'
    },
    {
      id: '38',
      title: 'DREAME L10S Ultra Gen2 Robot Süpürge Beyaz',
      price: 3999,
      imageUrl: 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_151548522?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center',
      rating: 4.8,
      reviews: 22,
      badge: 'Ev Aletleri',
      category: 'Ev Aletleri',
      brand: 'Dreame'
    },
    {
      id: '39',
      title: 'HOOVER HLEH10A2TCEX-17 10 Kg Wi-Fi Bağlantılı Isı Pompalı Kurutma Makinesi Beyaz',
      price: 17999,
      imageUrl: 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_156808925?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center',
      rating: 4.7,
      reviews: 40,
      badge: 'Ev Aletleri',
      category: 'Ev Aletleri',
      brand: 'HOOVER'
    },
    {
      id: '40',
      title: 'SAMSUNG AR35 AR12TXHQBWK A++ 12000 BTU Duvar Tipi Inverter Klima',
      price: 39999,
      imageUrl: 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_103400444?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center',
      rating: 4.7,
      reviews: 20,
      badge: 'Ev Aletleri',
      category: 'Ev Aletleri',
      brand: 'Samsung'
    }
  ];

  // If a category is requested, filter the list
  if (category) {
    return products.filter(p => p.category.toLowerCase().includes(category.toLowerCase()));
  }

  // Otherwise return all
  return products;
});