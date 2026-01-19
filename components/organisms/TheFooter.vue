 <script setup lang="ts">
import { reactive } from 'vue'

// --- FETCH DATA FROM SERVER API ---
const { data: footer } = await useFetch('/api/footer')

// --- MOBILE ACCORDION STATE ---
const openState = reactive<Record<string, boolean>>({})
const toggle = (key: string) => { openState[key] = !openState[key] }
const isOpen = (key: string): boolean => !!openState[key]
</script>

<template>
  <footer v-if="footer" class="mm-footer">
    <!-- 1) MAIN GREY SECTION -->
    <div class="footer-main">
      <div class="container">
        <div class="footer-logos-row">
          <div class="top-brands">
            <a href="#" @click.prevent>
              <img :src="footer.img.blindlook" alt="Blindlook" class="brand-img" />
            </a>
            <a href="#" @click.prevent>
              <img :src="footer.img.dahaIyiye" alt="Daha İyiye" class="brand-img" />
            </a>
          </div>
        </div>

        <!-- row-1 -->
        <div class="main-grid row-1">
          <div class="f-col contact-col">
            <div class="acc-group">
              <h3 class="f-title" :class="{ open: isOpen('c1') }" @click="toggle('c1')">İletişim</h3>
              <div class="f-body" :class="{ show: isOpen('c1') }">
                <div class="contact-row">
                  <div class="c-icon">
                    <svg viewBox="0 0 24 24">
                      <path fill="currentColor" d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24c1.12.37 2.33.57 3.57.57c.55 0 1 .45 1 1V20c0 .55-.45 1-1 1c-9.39 0-17-7.61-17-17c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1c0 1.25.2 2.45.57 3.57c.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                  </div>
                  <div>
                    <div class="f-sub">Müşteri Hizmetleri</div>
                    <a :href="`tel:${footer.contactInfo.phone.replace(/\s/g,'')}`" class="f-link bold-link">
                      {{ footer.contactInfo.phone }}
                    </a>
                  </div>
                </div>

                <div class="contact-row">
                  <div class="c-icon">
                    <svg viewBox="0 0 24 24">
                      <path fill="currentColor" d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
                    </svg>
                  </div>
                  <div>
                    <div class="f-sub">Bize Yazın</div>
                    <a :href="'mailto:' + footer.contactInfo.email" class="f-link underline-link">
                      {{ footer.contactInfo.email }}
                    </a>
                  </div>
                </div>

                <div class="contact-row">
                  <div class="c-icon">
                    <svg viewBox="0 0 24 24">
                      <path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5l-8-5V6l8 5l8-5v2z"/>
                    </svg>
                  </div>
                  <div>
                    <a href="#" @click.prevent class="f-link underline-link">İletişim Formu</a>
                  </div>
                </div>

                <div class="contact-socials">
                  <a href="https://www.facebook.com/MediaMarktTurkiye/" target="_blank" class="social-link" aria-label="Facebook">
                    <svg viewBox="0 0 24 24">
                      <path fill="currentColor" d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V1.74c-.75-.08-2.17-.18-3.55-.18-3.66 0-6.14 2.22-6.14 6.3V10h-4v3.5h4v10.5h6V13.5z"/>
                    </svg>
                  </a>

                  <a href="https://twitter.com/MediaMarktTR" target="_blank" class="social-link" aria-label="X">
                    <img :src="footer.img.xLogo" alt="X" class="social-img-icon" />
                  </a>

                  <a href="https://www.instagram.com/mediamarkt_tr/" target="_blank" class="social-link" aria-label="Instagram">
                    <svg viewBox="0 0 24 24">
                      <path fill="currentColor" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 3.8 7.6v8.8A3.6 3.6 0 0 0 7.4 20h9.2a3.6 3.6 0 0 0 3.6-3.6V7.6C20.2 5.6 18.6 4 16.6 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3z"/>
                    </svg>
                  </a>

                  <a href="https://www.youtube.com/user/MediaMarktTR" target="_blank" class="social-link" aria-label="YouTube">
                    <svg viewBox="0 0 24 24">
                      <path fill="currentColor" d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9c.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83c-.25.9-.83 1.48-1.73 1.73c-.47.13-1.33.22-2.65.28c-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44c-.9-.25-1.48-.83-1.73-1.73c-.13-.47-.22-1.1-.28-1.9c-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83c.25-.9.83-1.48 1.73-1.73c.47-.13 1.33-.22 2.65-.28c1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44c.9.25 1.48.83 1.73 1.73z"/>
                    </svg>
                  </a>
                </div>

              </div>
            </div>
          </div>

          <div class="f-col">
            <div class="acc-group">
              <h3 class="f-title" :class="{ open: isOpen('c2') }" @click="toggle('c2')">Popüler Kategoriler</h3>
              <div class="f-body" :class="{ show: isOpen('c2') }">
                <a v-for="c in footer.categories" :key="c" href="#" @click.prevent class="f-link">{{ c }}</a>
              </div>
            </div>
          </div>

          <div class="f-col">
            <div class="acc-group">
              <h3 class="f-title" :class="{ open: isOpen('c3') }" @click="toggle('c3')">Popüler Ürünler</h3>
              <div class="f-body" :class="{ show: isOpen('c3') }">
                <a v-for="p in footer.products" :key="p" href="#" @click.prevent class="f-link">{{ p }}</a>
              </div>
            </div>
          </div>

          <div class="f-col">
            <div class="acc-group">
              <h3 class="f-title" :class="{ open: isOpen('c4') }" @click="toggle('c4')">Popüler Markalar</h3>
              <div class="f-body" :class="{ show: isOpen('c4') }">
                <a v-for="b in footer.brands" :key="b" href="#" @click.prevent class="f-link">{{ b }}</a>
              </div>
            </div>
          </div>
        </div>

        <!-- row-2 -->
        <div class="main-grid row-2">
          <div class="f-col">
            <div class="acc-group">
              <h3 class="f-title" :class="{ open: isOpen('r2c1') }" @click="toggle('r2c1')">Özel Sayfalar</h3>
              <div class="f-body" :class="{ show: isOpen('r2c1') }">
                <a v-for="s in footer.specialPages" :key="s" href="#" @click.prevent class="f-link">{{ s }}</a>
              </div>
            </div>
          </div>

          <div class="f-col">
            <div class="acc-group">
              <h3 class="f-title" :class="{ open: isOpen('r2c2') }" @click="toggle('r2c2')">Güvenli Alışveriş</h3>
              <div class="f-body" :class="{ show: isOpen('r2c2') }">
                <a v-for="s in footer.safeShopping" :key="s" href="#" @click.prevent class="f-link">{{ s }}</a>
              </div>
            </div>
          </div>

          <div class="f-col">
            <div class="acc-group">
              <h3 class="f-title" :class="{ open: isOpen('r2c3') }" @click="toggle('r2c3')">Kişisel Verilerin Korunması ve Gizliliği</h3>
              <div class="f-body" :class="{ show: isOpen('r2c3') }">
                <a v-for="p in footer.privacy" :key="p" href="#" @click.prevent class="f-link">{{ p }}</a>
              </div>
            </div>
          </div>

          <div class="f-col">
            <div class="acc-group">
              <h3 class="f-title" :class="{ open: isOpen('r2c4') }" @click="toggle('r2c4')">Kurumsal</h3>
              <div class="f-body" :class="{ show: isOpen('r2c4') }">
                <a v-for="c in footer.corporate" :key="c" href="#" @click.prevent class="f-link">{{ c }}</a>
              </div>
            </div>
          </div>
        </div>

        <!-- row-3 (ONLY marketplace here, no delivery here anymore) -->
        <div class="main-grid row-3">
          <div class="f-col">
            <div class="acc-group">
              <h3 class="f-title" :class="{ open: isOpen('r3c1') }" @click="toggle('r3c1')">MediaMarkt Pazaryeri</h3>
              <div class="f-body" :class="{ show: isOpen('r3c1') }">
                <a v-for="m in footer.marketplace" :key="m" href="#" @click.prevent class="f-link">{{ m }}</a>
              </div>
            </div>
          </div>

          <!-- keep second column empty on desktop grid to preserve original spacing -->
          <div class="f-col"></div>
        </div>
      </div>
    </div>

    <!-- 2) WHITE SECTION (FIXED ORDER + APP UNDER THEM) -->
    <div class="footer-white">
      <div class="container">
        <div class="white-grid">
          <!-- LEFT: Delivery partners (Teslimat) -->
          <div class="w-col">
            <h4 class="b-head">Teslimat Çözüm Ortaklarımız</h4>
            <div class="logos-row">
              <img v-for="l in footer.logistics" :key="l" :src="l" class="log-img" alt="Logistics" />
            </div>
          </div>

          <!-- RIGHT: Payments (Ödeme) -->
          <div class="w-col">
            <h4 class="b-head">Ödeme Çözümlerimiz</h4>
            <div class="logos-row">
              <img v-for="p in footer.payments" :key="p" :src="p" class="pay-img" alt="Payment" />
            </div>
          </div>

          <!-- UNDER BOTH: App download -->
          <div class="w-col app-download">
            <h4 class="b-head">MediaMarkt uygulamasını indirin</h4>
            <div class="app-row">
              <a :href="footer.appLinks.appStore" target="_blank" rel="noopener" class="app-link">
                <img :src="footer.img.appStoreBadge" class="app-badge" alt="App Store" />
              </a>
              <a :href="footer.appLinks.googlePlay" target="_blank" rel="noopener" class="app-link">
                <img :src="footer.img.googlePlayBadge" class="app-badge" alt="Google Play" />
              </a>
              <a :href="footer.appLinks.appGallery" target="_blank" rel="noopener" class="app-link">
                <img :src="footer.img.appGalleryBadge" class="app-badge" alt="AppGallery" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 3) DARK SECTION -->
    <div class="footer-dark">
      <div class="container">
        <div class="dark-top">
          <a href="#" @click.prevent class="privacy-btn">Gizlilik Ayarları</a>
        </div>

        <div class="seo-area">
          <h4 class="seo-title">MediaMarkt – Lider Elektronik Market Zinciri</h4>
          <p class="seo-text">
            50 yılı aşkın birikimiyle, 11 ülkede, 1000’den fazla mağazası ve 50 bini aşan çalışanı ile yıllık ortalama 2,5 milyar ziyaretçisine hizmet veren MediaMarkt-Saturn Retail Group’a bağlı MediaMarkt, dünya markalarını Alman uzmanlığı ve uygun fiyatlarla müşterilerine sunuyor. Kaliteli satış öncesi ve sonrası hizmet anlayışıyla müşterilerini ağırlayan Avrupa’nın 1 numaralı elektronik perakendecisi MediaMarkt, Türkiye’de ilk mağazasını 2007 Eylül ayında İstanbul Ümraniye’de açtı. 2013 yılında da online satış kanalı mediamarkt.com.tr’yi hayata geçirdi. Uluslararası bütünleşik kanallı stratejisi ile mağazacılık ve online perakendeciliğin sayısız avantajlarını müşterilerine entegre olarak sunan MediaMarkt’ın 27’si İstanbul’da olmak üzere Adana, Ankara, Antalya, Aydın, Balıkesir, Bursa, Çanakkale, Çorum, Denizli, Diyarbakır, Erzurum, Eskişehir, Gaziantep, Hatay, Isparta, İzmir, İzmit, Kahramanmaraş, Kayseri, Kocaeli, Konya, Malatya, Manisa, Mersin, Muğla, Sakarya, Samsun, Şanlıurfa, Tekirdağ, Trabzon Van, Kuşadası ve Denizli toplam 102 mağazası bulunuyor.
          </p>
        </div>

        <div class="etbis-wrap">
          <img :src="footer.img.etbis" alt="ETBIS" class="etbis-img" />
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* BASE */
.mm-footer {
  width: 100%;
  font-family: system-ui, -apple-system, sans-serif;
  color: #111;
  line-height: 1.5;
  font-size: 14px;
}
.container {
  width: min(1360px, 100% - 32px);
  margin: 0 auto;
}
a { text-decoration: none; color: inherit; transition: 0.2s; }
a:hover { color: #df0000; text-decoration: none; }

/* 1) MAIN GREY SECTION */
.footer-main {
  background: #efefef;
  padding: 56px 0;
  border-bottom: 1px solid #e0e0e0;
}

.footer-logos-row { margin-bottom: 40px; }
.top-brands { display: flex; gap: 24px; align-items: center; }

/* BIGGER brand logos (Blindlook + Daha iyiye) */
.brand-img { height: 70px; width: auto; } /* was 26px */

/* GRID SYSTEM */
.main-grid {
  display: grid;
  gap: 64px;
  align-items: start;
}
.row-1 { grid-template-columns: repeat(4, 1fr); }
.row-2 { grid-template-columns: repeat(4, 1fr); margin-top: 40px; }
.row-3 { grid-template-columns: 1.2fr 1fr; margin-top: 40px; }

/* TYPOGRAPHY */
.f-title, .static {
  font-weight: 800;
  font-size: 22px;
  margin-bottom: 18px;
  color: #111;
  cursor: default;
}
.f-link {
  display: block;
  margin-bottom: 14px;
  color: #2b2b2b;
  font-size: 15px;
  line-height: 1.65;
}
.f-sub { font-weight: 700; font-size: 13px; margin-bottom: 4px; }
.bold-link { font-weight: 700; font-size: 18px; text-decoration: underline; }
.underline-link { text-decoration: underline; }

/* CONTACT */
.contact-row { display: flex; gap: 12px; margin-bottom: 20px; align-items: flex-start; }
.c-icon svg { width: 24px; height: 24px; color: #111; }

.contact-socials{
  display:flex;
  gap:14px;
  margin-top:28px;
  align-items:center;
}
.social-link{
  opacity:.85;
  transition:.2s;
  display:flex;
  align-items:center;
  justify-content:center;
}
.social-link:hover{ opacity:1; transform:translateY(-1px); }
.social-link svg,
.social-img-icon{
  width:20px;
  height:20px;
}
.social-link svg{ color:#111; }
.social-img-icon{
  object-fit:contain;
  display:block;
}

/* LOGOS (shared) */
.logos-row { display: flex; gap: 24px; flex-wrap: wrap; align-items: center; }
.log-img { height: 18px; width: auto; }

/* 2) WHITE SECTION (FIXED) */
.footer-white { background: #fff; padding: 40px 0; }

.white-grid{
  display:grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: start;
}
.b-head { font-weight: 800; font-size: 16px; margin-bottom: 16px; }

.pay-img { height: 26px; border: none; width: auto; }

.app-download{ grid-column: 1 / -1; margin-top: 6px; }
.app-row { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; }

/* badges */
.app-badge{
  height: 44px;
  width: auto;
  max-height: none;
  background: transparent;
  display: block;
}

/* 3) DARK SECTION */
.footer-dark {
  background: #3a3a3a;
  padding: 56px 0;
  color: #cfcfcf;
}
.dark-top { text-align: right; margin-bottom: 28px; }
.privacy-btn {
  display: inline-block;
  padding: 10px 18px;
  border: 2px solid #fff;
  border-radius: 6px;
  color: #fff;
  font-weight: 700;
  font-size: 13px;
}
.privacy-btn:hover { background: #fff; color: #111; text-decoration: none; }

.seo-title { font-weight: 800; font-size: 14px; margin-bottom: 12px; color: #fff; }
.seo-text { font-size: 12px; line-height: 1.6; text-align: justify; color: #cfcfcf; }

.etbis-wrap { display: flex; justify-content: flex-end; margin-top: 20px; }
.etbis-img { height: 70px; width: auto; }

/* DESKTOP: keep bodies open */
@media (min-width: 769px) {
  .f-body { display: block !important; }
}

/* RESPONSIVE */
@media (max-width: 1024px) {
  .row-1, .row-2, .row-3 { grid-template-columns: repeat(2, 1fr); gap: 30px; }
  .white-grid { grid-template-columns: 1fr; gap: 32px; }
  .app-download { margin-top: 0; }
}

@media (max-width: 768px) {
  .row-1, .row-2, .row-3 { grid-template-columns: 1fr; gap: 0; }

  .f-title {
    padding: 16px 0;
    margin: 0;
    border-top: 1px solid #ccc;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .f-col:first-child .f-title { border-top: none; }
  .f-title::after {
    content: '';
    width: 8px;
    height: 8px;
    border-right: 2px solid #111;
    border-bottom: 2px solid #111;
    transform: rotate(45deg);
    transition: 0.2s;
  }
  .f-title.open::after { transform: rotate(225deg); }

  .f-body { display: none; padding-bottom: 20px; }
  .f-body.show { display: block; }

  .top-brands { justify-content: center; }
  .etbis-wrap { justify-content: center; }
}
</style>
