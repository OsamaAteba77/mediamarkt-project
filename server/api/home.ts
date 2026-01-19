import HomeHero from "~/components/organisms/HomeHero.vue"

 export default defineEventHandler(() => {
  return {
    HomeHero: [
      { 
        id: 1, 
        image: '/slide1.png', 
        tag: "APP'e Özel 2 Kat CLUB Puan", 
        title: 'İhtiyacına uygun telefonlar!', 
        btnText: 'Alışverişe Başla' 
      },
      { 
        id: 2, 
        image: '/slide2.png', 
        tag: "APP'e Özel 2 Kat CLUB Puan", 
        title: 'Beyaz eşya ihtiyacını tamamla!', 
        btnText: 'Alışverişe Başla' 
      },
      { 
        id: 3, 
        image: '/slide3.png', 
        tag: " %10 İndirim", 
        title: 'ihtiyacina uygun bilgisayarlar!', 
        btnText: 'Alışverişe Başla' 
      },
      { 
        id: 4, 
        image: '/slide4.png', 
        tag: " 2 Kat Puan", 
        title: ' Televizyonları keşfet!', 
        btnText: 'Alışverişe Başla' 
      },
      { 
        id: 5, 
        image: '/slide5.png', 
        tag: "Yeni Ürün", 
        title: ' Süpürgeleri keşfet!', 
        btnText: 'Alışverişe Başla' 
      }
    ],
    bestSellers: [
      {
        id: '1',
        title: 'APPLE iPhone 15 128 GB Akıllı Telefon Siyah MTP03TU/A',
        price: 48999,
        description: 'Apple iPhone 15',
        category: 'Telefon',
        imageUrl: 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_120111127?x=320&y=320&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=320&ey=320&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=320&cdy=320',
        stock: 10,
        badge: '4000 TL Ek Destek !'
      },
      {
        id: '2',
        title: 'DYSON V12 Detect Slim Absolute Kablosuz Süpürge',
        price: 34999,
        description: 'Dyson Vacuum',
        category: 'Ev Aletleri',
        imageUrl: 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_123735082?x=320&y=320&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=320&ey=320&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=320&cdy=320',
        stock: 5,
        badge: 'Stoklarla Sınırlı'
      },
      {
        id: '3',
        title: 'PHILIPS HD9252/90 Airfryer Fritöz Siyah',
        price: 10999,
        description: 'Philips Airfryer',
        category: 'Ev Aletleri',
        imageUrl: 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MP_149781401?x=320&y=320&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=320&ey=320&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=320&cdy=320',
        stock: 20
      },
      {
        id: '4',
        title: 'APPLE AirPods 2. Nesil Beyaz (MV7N2TU/A)',
        price: 12999,
        description: 'Apple AirPods',
        category: 'Ses',
        imageUrl: 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MP_168136770?x=320&y=320&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=320&ey=320&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=320&cdy=320',
        stock: 15,
        badge: 'Fırsat Ürünü'
      },
      {
        id: '5',
        title: 'SAMSUNG Galaxy S24 Ultra 256 GB Akıllı Telefon Titanyum Gri',
        price: 69999,
        description: 'Samsung S24 Ultra',
        category: 'Telefon',
        imageUrl: ' https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MP_167821090?x=320&y=320&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=320&ey=320&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=320&cdy=320',
        stock: 8,
        badge: '750 TL Kupon'
      },
      {
        id: '6',
        title: 'ROBOROCK S8 Robot Süpürge Beyaz',
        price: 29999,
        description: 'Robot Vacuum',
        category: 'Ev Aletleri',
        imageUrl: ' https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_155420735?x=320&y=320&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=320&ey=320&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=320&cdy=320',
        stock: 12
      },
      {
        id: '7',
        title: ' LENOVO IdeaPad Slim 3/ Ryzen 3 7320U/ 8GB Ram/ 512GB SSD/ 15.6" FHD/ W11',
        price: 19999,
        description: 'Lenovo Laptop',
        category: 'Bilgisayar',
        imageUrl: ' https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_148835739?x=320&y=320&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=320&ey=320&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=320&cdy=320',
        stock: 7,
        badge: '%15 İndirim'
      },
      {
        id: '8',
        title: ' JBL Flip7, 35 W, IP68, Bluetooth Hoparlör Siyah',
        price: 5890,
        description: 'Bluetooth Speaker',
        category: 'Ses',
        imageUrl: ' https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_153478883?x=320&y=320&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=320&ey=320&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=320&cdy=320',
        stock: 25,
        badge: 'Yeni Ürün'
      }
    ]
  }
})