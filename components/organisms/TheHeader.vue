 <script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCartStore } from '~/stores/cart';
import { signOut, onAuthStateChanged } from 'firebase/auth';

// --- TYPES ---
type NavKey = string
type MenuKey = string
type MegaSection = { title: string; items: string[] }
type MegaColumn = MegaSection[]

// --- 1. FETCH DATA FROM SERVER API (SSR) ---
const { data: headerData } = await useFetch('/api/header')

const router = useRouter()
const route = useRoute()
const { $auth } = useNuxtApp() // Firebase Auth

/* ====== HEADER STATE ====== */
const searchQuery = ref('')
const cartStore = useCartStore();
const isMenuOpen = ref(false);

// Cart Count
const cartCount = computed(() => cartStore.count);

/* ====== AUTH STATE (NEW) ====== */
const currentUser = ref<any>(null);
const isUserMenuOpen = ref(false); // Controls the dropdown for logged-in users

// Menu Items
const menuItems = [
  'Telefon', 'Bilgisayar', 'Beyaz Eşya', 'Ev Aletleri & Yaşam', 
  'Kişisel Bakım', 'TV, Görüntü ve Ses', 'Kampanyalar', 
  'MediaMarkt CLUB', 'Müşteri Hizmetleri'
];

// Helper to get link for menu items
const getCategoryLink = (item: string) => {
  return `/category?menu=${item.toLowerCase()}`;
};

const storeModalOpen = ref(false)
const storeQuery = ref('')

// 3. THE FIX: Force close menus when route changes
watch(() => route.fullPath, () => {
  closeAll()
});

// Toggle function
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const accountDrawerOpen = ref(false)
const loginEmail = ref('')
const loginPassword = ref('')
const passwordVisible = ref(false)

const menuDrawerOpen = ref(false)

/* ====== nav bar ====== */
const navExpanded = ref(false)
const activeNav = ref<NavKey>('telefon')

// Use data from API
const navItems = computed(() => {
  return headerData.value?.navItems || []
})

const navTranslateX = computed(() => (navExpanded.value ? -360 : 0))

function setActiveNav(k: NavKey) {
  activeNav.value = k
}

/* ====== menu drawer left list ====== */
// Use data from API
const menuLeftItems = computed(() => headerData.value?.menuLeftItems || [])

const activeMenuKey = ref<MenuKey>('telefon')
const activeMenuLabel = computed(() => 
  menuLeftItems.value.find((m: any) => m.key === activeMenuKey.value)?.label ?? ''
)

/* ====== MEGA MENU DATA ====== */
const activeMenuColumns = computed<MegaColumn[]>(() => {
  if (!headerData.value) return [[], [], []]
  const k = activeMenuKey.value
  const mega = headerData.value.megaData as any
  return mega[k] ?? [[], [], []]
})

/* ====== Brands Arrays ====== */
const brandsLeft = computed(() => headerData.value?.brandsLeft || [])
const brandsRight = computed(() => headerData.value?.brandsRight || [])

/* ====== overlay ====== */
const overlayVisible = computed(() => storeModalOpen.value || accountDrawerOpen.value || menuDrawerOpen.value)

/* ====== actions ====== */
function goSearch() {
  router.push({ path: '/products', query: searchQuery.value ? { q: searchQuery.value } : {} })
}

function openStoreModal() {
  storeModalOpen.value = true
  lockScroll()
}
function closeStoreModal() {
  storeModalOpen.value = false
  unlockScrollIfNoOverlay()
}

// === FIX: ROBUST USER ICON HANDLER ===
function handleUserIconClick() {
  // If user is logged in -> Toggle Dropdown
  if (currentUser.value) {
    isUserMenuOpen.value = !isUserMenuOpen.value
  } else {
    // If guest -> Open Login Drawer
    openAccountDrawer()
  }
}

// CLICK OUTSIDE TO CLOSE DROPDOWN
function handleClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement
  if (isUserMenuOpen.value && !target.closest('.user-container')) {
    isUserMenuOpen.value = false
  }
}

function openAccountDrawer() {
  accountDrawerOpen.value = true
  lockScroll()
}
function closeAccountDrawer() {
  accountDrawerOpen.value = false
  unlockScrollIfNoOverlay()
}

function openMenuDrawer() {
  menuDrawerOpen.value = true
  lockScroll()
}
function closeMenuDrawer() {
  menuDrawerOpen.value = false
  unlockScrollIfNoOverlay()
}

function closeAll() {
  storeModalOpen.value = false
  accountDrawerOpen.value = false
  menuDrawerOpen.value = false
  isUserMenuOpen.value = false
  isMenuOpen.value = false
  unlockScrollIfNoOverlay(true)
}

function goLogin() {
  router.push('/login')
  closeAccountDrawer()
}
function goSignup() {
  router.push('/register')
  closeAccountDrawer()
}

// LOGOUT FUNCTION
async function handleLogout() {
  try {
    await signOut($auth);
    isUserMenuOpen.value = false;
    router.push('/');
  } catch (error) {
    console.error('Logout failed', error);
  }
}

function toggleNavMore() {
  navExpanded.value = !navExpanded.value
}

function selectMenu(key: MenuKey) {
  activeMenuKey.value = key
}

function goBrand(brand: string) {
  router.push({ path: '/brand', query: { name: brand } })
  closeMenuDrawer()
}

function goCategory(menuKey: MenuKey, section: string, item: string) {
  router.push({ path: '/category', query: { menu: menuKey, section, item } })
  closeMenuDrawer()
}

/* ====== keyboard ====== */
function onKeyDown(e: KeyboardEvent) {
  if (e.key === 'Escape') closeAll()
}

/* ====== scroll lock ====== */
function lockScroll() {
  if (typeof document !== 'undefined') document.body.style.overflow = 'hidden'
}
function unlockScrollIfNoOverlay(force = false) {
  if (typeof document === 'undefined') return
  const any = storeModalOpen.value || accountDrawerOpen.value || menuDrawerOpen.value
  if (force || !any) document.body.style.overflow = ''
}

// AUTH LISTENER
onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('click', handleClickOutside) 
  }
  
  // Listen for Firebase Login/Logout
  onAuthStateChanged($auth, (user) => {
    currentUser.value = user;
  });
})

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', onKeyDown)
    window.removeEventListener('click', handleClickOutside)
  }
  unlockScrollIfNoOverlay(true)
})
</script>

<template>
  <header class="mm-header" v-if="headerData">
    <div class="mm-mainbar">
      <div class="mm-container mm-mainbar-inner">
        <NuxtLink class="mm-logo" to="/" aria-label="MediaMarkt Home">
          <img src="/logo.svg" alt="MediaMarkt" class="mm-logo-img" />
        </NuxtLink>

        <div class="mm-search" role="search">
          <span class="mm-search-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path
                d="M10.5 3.5a7 7 0 1 0 4.57 12.3l4.2 4.2a1 1 0 0 0 1.41-1.42l-4.2-4.2A7 7 0 0 0 10.5 3.5Zm0 2a5 5 0 1 1 0 10a5 5 0 0 1 0-10Z"
              />
            </svg>
          </span>

          <input
            class="mm-search-input"
            type="text"
            v-model="searchQuery"
            placeholder="Ne arıyorsunuz?"
            aria-label="Search"
            @keydown.enter="goSearch"
          />

          <button class="mm-search-btn" type="button" aria-label="Search" @click="goSearch">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M10.5 3.5a7 7 0 1 0 4.57 12.3l4.2 4.2a1 1 0 0 0 1.41-1.42l-4.2-4.2A7 7 0 0 0 10.5 3.5Zm0 2a5 5 0 1 1 0 10a5 5 0 0 1 0-10Z"
              />
            </svg>
          </button>
        </div>

        <div class="mm-actions">
          <button class="mm-store" type="button" @click="openStoreModal" aria-label="Mağazalarımız">
            <div class="mm-store-text">
              <div class="mm-store-title">Mağazalarımız</div>
              <div class="mm-store-sub">Seçilmiş mağazanız yok</div>
            </div>
            <span class="mm-store-caret" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M7.4 9.4L12 14l4.6-4.6L18 10.8l-6 6l-6-6l1.4-1.4Z" />
              </svg>
            </span>
          </button>

          <ClientOnly>
            <div class="user-container relative">
              <button class="mm-icon-btn" type="button" @click.stop="handleUserIconClick" aria-label="Account">
                <span class="mm-icon-circle" :class="{ 'bg-gray-200': isUserMenuOpen }">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 12.2a4.2 4.2 0 1 0-4.2-4.2A4.2 4.2 0 0 0 12 12.2Zm0 2.1c-4.1 0-7.5 2-7.5 4.6V21h15v-2.1c0-2.6-3.4-4.6-7.5-4.6Z" />
                  </svg>
                </span>
              </button>

              <div v-if="isUserMenuOpen && currentUser" class="mm-user-dropdown">
                <div class="mm-user-info">
                  <div class="mm-welcome">Hoş Geldiniz,</div>
                  <div class="mm-username">{{ currentUser.displayName || currentUser.email }}</div>
                </div>
                <div class="mm-user-links">
                  <NuxtLink to="/account" class="mm-user-link">Hesabım</NuxtLink>
                  <NuxtLink to="/orders" class="mm-user-link">Siparişlerim</NuxtLink>
                  <button @click="handleLogout" class="mm-user-link mm-logout-btn">Çıkış Yap</button>
                </div>
              </div>
            </div>

            <template #fallback>
              <div class="relative">
                <button class="mm-icon-btn" type="button">
                  <span class="mm-icon-circle">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 12.2a4.2 4.2 0 1 0-4.2-4.2A4.2 4.2 0 0 0 12 12.2Zm0 2.1c-4.1 0-7.5 2-7.5 4.6V21h15v-2.1c0-2.6-3.4-4.6-7.5-4.6Z" />
                    </svg>
                  </span>
                </button>
              </div>
            </template>
          </ClientOnly>

          <NuxtLink class="mm-icon-btn" to="/wishlist" aria-label="Wishlist">
            <span class="mm-icon-circle">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M12 21.2l-1.3-1.2C5.6 15.4 2.5 12.6 2.5 8.9A5.3 5.3 0 0 1 7.9 3.6c1.6 0 3.2.7 4.1 1.9c.9-1.2 2.5-1.9 4.1-1.9A5.3 5.3 0 0 1 21.5 8.9c0 3.7-3.1 6.5-8.2 11.1L12 21.2Z"
                />
              </svg>
            </span>
          </NuxtLink>

          <NuxtLink class="mm-icon-btn" to="/cart" aria-label="Cart">
            <span class="mm-icon-circle mm-cart-circle">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M7.2 18.2a1.8 1.8 0 1 0 0 3.6a1.8 1.8 0 0 0 0-3.6Zm10 0a1.8 1.8 0 1 0 0 3.6a1.8 1.8 0 0 0 0-3.6ZM6.9 6.3h14a1 1 0 0 1 .9 1.4l-2.8 6a2 2 0 0 1-1.8 1.2H9a2 2 0 0 1-1.8-1.1L4.7 4.4H2.6a1 1 0 1 1 0-2h2.8a1 1 0 0 1 .95.7l.5 1.7Z"
                />
              </svg>

              <span v-if="cartCount > 0" class="mm-cart-badge" aria-label="Cart count">{{ cartCount }}</span>
            </span>
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="mm-nav">
      <div class="mm-container mm-nav-inner">
        <button class="mm-menu-btn" type="button" @click="openMenuDrawer" aria-label="Menü">
          <span class="mm-menu-ico" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M4 6.5h16v2H4v-2Zm0 7h16v2H4v-2Zm0-3.5h16v2H4v-2Z" />
            </svg>
          </span>
          <span class="mm-menu-text">Menü</span>
        </button>

        <div class="mm-nav-viewport" aria-label="Primary navigation">
          <div class="mm-nav-track" :style="{ transform: `translateX(${navTranslateX}px)` }">
            <button
              v-for="item in navItems"
              :key="item.key"
              class="mm-nav-link"
              type="button"
              :class="{ 'is-active': activeNav === item.key }"
              @click="setActiveNav(item.key)"
            >
              {{ item.label }}
            </button>
          </div>
        </div>

        <button class="mm-nav-more" type="button" @click="toggleNavMore" aria-label="More navigation">
          <span aria-hidden="true">›</span>
        </button>
      </div>
    </div>

    <div class="mm-topbar">
      <div class="mm-container mm-topbar-inner">
        <a class="mm-topbar-link" href="#" @click.prevent>Ai Hediye Bulucu için Tıkla!</a>
        <a class="mm-topbar-link" href="#" @click.prevent>Çekilişe Katıl, Kazan</a>
        <a class="mm-topbar-link" href="#" @click.prevent>MediaMarkt APP</a>
      </div>
    </div>

    <div v-if="overlayVisible" class="mm-overlay" @click="closeAll" />

    <section v-if="storeModalOpen" class="mm-store-modal" role="dialog" aria-modal="true" aria-label="Mağaza seçin">
      <div class="mm-store-card" @click.stop>
        <button class="mm-x" type="button" @click="closeStoreModal" aria-label="Close">×</button>

        <h2 class="mm-store-h">Mağaza seçin</h2>
        <p class="mm-store-p">
          Bulmak istediğiniz mağaza için il seçimi yaparak arama yapabilirsiniz. Bu şekilde mağazadaki ürün
          bulunurluğunu da kontrol edebilirsiniz.
        </p>

        <div class="mm-store-search">
          <span class="mm-store-search-ico" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path
                d="M10.5 3.5a7 7 0 1 0 4.57 12.3l4.2 4.2a1 1 0 0 0 1.41-1.42l-4.2-4.2A7 7 0 0 0 10.5 3.5Zm0 2a5 5 0 1 1 0 10a5 5 0 0 1 0-10Z"
              />
            </svg>
          </span>
          <input class="mm-store-input" type="text" placeholder="İl adıyla arama yapın" v-model="storeQuery" />
        </div>

        <div class="mm-store-empty" aria-hidden="true" />

        <div class="mm-store-footer">
          <button class="mm-store-cta" type="button" disabled>Mağaza seçin</button>
        </div>
      </div>
    </section>

    <aside v-if="accountDrawerOpen" class="mm-drawer mm-drawer-right" role="dialog" aria-modal="true" aria-label="Hesabım">
      <div class="mm-drawer-inner" @click.stop>
        <button class="mm-x" type="button" @click="closeAccountDrawer" aria-label="Close">×</button>

        <h2 class="mm-drawer-title">Hesabım</h2>

        <h3 class="mm-drawer-subtitle">Tekrar hoş geldiniz! Giriş yapın</h3>

        <div class="mm-form">
          <input class="mm-input" type="email" placeholder="E-posta adresi" v-model="loginEmail" />

          <div class="mm-pass">
            <input
              class="mm-input"
              :type="passwordVisible ? 'text' : 'password'"
              placeholder="Şifre"
              v-model="loginPassword"
            />
            <button class="mm-eye" type="button" @click="passwordVisible = !passwordVisible" aria-label="Toggle password">
              <svg v-if="!passwordVisible" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M12 5c-7.2 0-10 7-10 7s2.8 7 10 7s10-7 10-7s-2.8-7-10-7Zm0 11a4 4 0 1 1 0-8a4 4 0 0 1 0 8Z"
                />
              </svg>
              <svg v-else viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M2.8 4.2L4.2 2.8l17 17l-1.4 1.4l-2.7-2.7A11 11 0 0 1 12 19c-7.2 0-10-7-10-7a18 18 0 0 1 4.1-5.5L2.8 4.2ZM12 7a4.8 4.8 0 0 1 3.4 1.4l-1.5 1.5A2.5 2.5 0 0 0 12 9.5a2.5 2.5 0 0 0-1 .2L9.6 8.3A4.8 4.8 0 0 1 12 7Zm8.2 5s-2.8 7-10 7a9 9 0 0 1-3.7-.8l1.6-1.6A7.2 7.2 0 0 0 12 17c5.3 0 7.8-5 7.8-5a13.6 13.6 0 0 0-3.1-3.8l1.3-1.3A16.5 16.5 0 0 1 20.2 12Z"
                />
              </svg>
            </button>
          </div>

          <a class="mm-forgot" href="#" @click.prevent>Şifrenizi mi unuttunuz?</a>

          <button class="mm-login" type="button" @click="goLogin">Giriş yap</button>

          <div class="mm-account-card">
            <div class="mm-account-card-h">Henüz online bir hesabınız yok mu?</div>

            <button class="mm-club" type="button" @click="goSignup">
              <span class="mm-club-arrow" aria-hidden="true">›</span>
              CLUB Üyesi ol
            </button>

            <a class="mm-club-fast" href="#" @click.prevent>CLUB Üyelik Numaranızla Hızlı Kayıt Olun</a>
          </div>
        </div>
      </div>
    </aside>

    <aside v-if="menuDrawerOpen" class="mm-menu-drawer" role="dialog" aria-modal="true" aria-label="Menü">
      <div class="mm-menu-wrap" @click.stop>
        
        <div class="mm-menu-head">
          
          <img src="/logo.svg" alt="MediaMarkt" class="mm-menu-logo" />

          <button class="mm-x mm-x-dark mm-x-absolute" type="button" @click="closeMenuDrawer" aria-label="Close">×</button>
        </div>

        <div class="mm-menu-body">
          <div class="mm-menu-left">
            <h3 class="mm-menu-title">Tüm kategoriler</h3>

            <button
              v-for="item in menuLeftItems"
              :key="item.key"
              type="button"
              class="mm-menu-item"
              :class="{ active: activeMenuKey === item.key }"
              @click="selectMenu(item.key)"
            >
              <span class="mm-menu-item-label">{{ item.label }}</span>
              <span class="mm-menu-item-arrow" aria-hidden="true">›</span>
            </button>
          </div>

          <div class="mm-menu-right" v-if="activeMenuKey">
            <div class="mm-mega-header">
              <div class="mm-mega-title">{{ activeMenuLabel }}</div>
            </div>

            <div class="mm-mega-content">
              <div class="mm-mega-columns">
                <div v-for="(col, idx) in activeMenuColumns" :key="idx" class="mm-mega-col">
                  <div v-for="section in col" :key="section.title" class="mm-mega-section">
                    <div class="mm-mega-section-title">{{ section.title }}</div>

                    <div class="mm-mega-links">
                      <a
                        v-for="link in section.items"
                        :key="link"
                        class="mm-mega-link"
                        href="#"
                        @click.prevent="goCategory(activeMenuKey!, section.title, link)"
                      >
                        {{ link }}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="activeMenuKey === 'brands'" class="mm-brands-grid">
                <div class="mm-brands-col">
                  <a
                    v-for="b in brandsLeft"
                    :key="b"
                    class="mm-brand-link"
                    href="#"
                    @click.prevent="goBrand(b)"
                  >
                    {{ b }}
                  </a>
                </div>
                <div class="mm-brands-col">
                  <a
                    v-for="b in brandsRight"
                    :key="b"
                    class="mm-brand-link"
                    href="#"
                    @click.prevent="goBrand(b)"
                  >
                    {{ b }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  </header>
</template>

<style scoped>
/* ===================== NEW USER DROPDOWN CSS ===================== */
.relative { position: relative; }

.mm-user-dropdown {
  position: absolute;
  top: 52px;
  right: 0;
  width: 260px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  border: 1px solid #e5e5e5;
  color: #111;
  overflow: hidden;
  z-index: 100;
}

.mm-user-info {
  padding: 16px;
  background: #f9f9f9;
  border-bottom: 1px solid #eee;
}

.mm-welcome { font-size: 12px; color: #666; }
.mm-username { font-weight: 800; font-size: 15px; color: #df0000; overflow: hidden; text-overflow: ellipsis; }

.mm-user-link {
  display: block;
  width: 100%;
  text-align: left;
  padding: 12px 16px;
  font-size: 14px;
  color: #111;
  text-decoration: none;
  background: white;
  border: none;
  cursor: pointer;
}

.mm-user-link:hover { background: #f5f5f5; }
.mm-logout-btn { color: #df0000; font-weight: 700; border-top: 1px solid #eee; }

/* ===================== EXISTING BASE STYLES ===================== */
.mm-header {
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100%;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
}

.mm-container {
  width: min(1400px, calc(100% - 32px));
  margin: 0 auto;
}

/* ===================== MAIN RED BAR ===================== */
.mm-mainbar {
  background: #df0000;
  color: #fff;
  height: 80px;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 20;
}

.mm-mainbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}

/* Logo */
.mm-logo {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  margin-right: 10px;
}

.mm-logo-img {
  height: 34px;
  width: auto;
  display: block;
  filter: brightness(0) invert(1);
}

/* Search */
.mm-search {
  flex: 1;
  max-width: 760px;
  min-width: 260px;
  height: 46px;
  background: #fff;
  border-radius: 4px;
  position: relative;
  display: flex;
  align-items: center;
}

.mm-search-icon {
  position: absolute;
  left: 14px;
  width: 20px;
  height: 20px;
  opacity: 0.85;
}

.mm-search-icon svg {
  width: 20px;
  height: 20px;
  fill: #111;
}

.mm-search-input {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  font-size: 16px;
  color: #111;
  padding: 0 56px 0 44px;
  border-radius: 4px;
}

.mm-search-btn {
  position: absolute;
  right: 4px;
  width: 44px;
  height: 38px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  background: #df0000;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.mm-search-btn svg {
  width: 20px;
  height: 20px;
  fill: #fff;
}

/* Actions */
.mm-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

/* Store block */
.mm-store {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
  padding: 6px 6px;
  text-align: left;
}

.mm-store-text {
  display: flex;
  flex-direction: column;
  line-height: 1.15;
}

.mm-store-title {
  font-weight: 800;
  font-size: 18px;
}

.mm-store-sub {
  font-size: 12px;
  opacity: 0.95;
  font-weight: 600;
}

.mm-store-caret {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  opacity: 0.85;
}

.mm-store-caret svg {
  width: 18px;
  height: 18px;
  fill: #fff;
}

/* Icon circle buttons */
.mm-icon-btn {
  border: none;
  background: transparent;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.mm-icon-circle {
  width: 46px;
  height: 46px;
  border-radius: 999px;
  background: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.15s ease;
}

.mm-icon-btn:hover .mm-icon-circle {
  transform: scale(1.04);
}

.mm-icon-circle svg {
  width: 24px;
  height: 24px;
  fill: #111;
}

.mm-cart-circle {
  position: relative;
}

.mm-cart-badge {
  position: absolute;
  top: -6px;
  right: -6px;
  width: 22px;
  height: 22px;
  border-radius: 999px;
  background: #111;
  color: #fff;
  font-size: 12px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #fff;
}

/* ===================== NAV BAR ===================== */
.mm-nav {
  background: #df0000;
  height: 46px;
  display: flex;
  align-items: center;
}

.mm-nav-inner {
  display: flex;
  align-items: center;
  gap: 10px;
}

.mm-menu-btn {
  height: 36px;
  padding: 0 14px;
  border-radius: 4px;
  border: none;
  background: #fff;
  color: #111;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.mm-menu-ico svg {
  width: 18px;
  height: 18px;
  fill: #111;
}

.mm-menu-text {
  font-weight: 800;
  font-size: 16px;
}

/* viewport */
.mm-nav-viewport {
  overflow: hidden;
  flex: 1;
}

.mm-nav-track {
  display: flex;
  align-items: center;
  white-space: nowrap;
  transition: transform 240ms ease;
}

.mm-nav-link {
  position: relative;
  height: 46px;
  padding: 0 16px;
  border: none;
  background: transparent;
  color: #fff;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  opacity: 0.95;
}

.mm-nav-link::after {
  content: "";
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 6px;
  height: 3px;
  background: transparent;
  border-radius: 2px;
}

.mm-nav-link.is-active::after {
  background: #fff;
}

.mm-nav-link:hover {
  opacity: 1;
}

.mm-nav-more {
  width: 38px;
  height: 38px;
  border-radius: 999px;
  border: none;
  background: rgba(255, 255, 255, 0.22);
  color: #fff;
  font-size: 24px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.mm-nav-more:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* ===================== BLACK UTILITY BAR ===================== */
.mm-topbar {
  background: #191919;
  height: 40px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #2a2a2a;
}

.mm-topbar-inner {
  width: min(1100px, 100%);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
}

.mm-topbar-link {
  color: #cfcfcf;
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
}

.mm-topbar-link:hover {
  color: #fff;
  text-decoration: underline;
}

/* ===================== OVERLAY ===================== */
.mm-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 60;
}

/* ===================== STORE MODAL ===================== */
.mm-store-modal {
  position: fixed;
  inset: 0;
  z-index: 70;
  display: grid;
  place-items: center;
  padding: 18px;
}

.mm-store-card {
  width: min(820px, 96vw);
  height: min(680px, 92vh);
  background: #fff;
  border-radius: 18px;
  padding: 26px;
  position: relative;
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
}

.mm-x {
  position: absolute;
  right: 16px;
  top: 10px;
  border: none;
  background: transparent;
  font-size: 28px;
  cursor: pointer;
  color: #111;
  opacity: 0.7;
}

.mm-x:hover {
  opacity: 1;
}

.mm-store-h {
  font-size: 24px;
  font-weight: 900;
  margin: 6px 0 10px 0;
  color: #111;
}

.mm-store-p {
  margin: 0 0 18px 0;
  color: #333;
  line-height: 1.5;
  font-size: 14px;
}

.mm-store-search {
  height: 56px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 14px;
}

.mm-store-search-ico svg {
  width: 22px;
  height: 22px;
  fill: #111;
  opacity: 0.75;
}

.mm-store-input {
  flex: 1;
  height: 100%;
  border: none;
  outline: none;
  font-size: 15px;
}

.mm-store-empty {
  flex: 1;
}

.mm-store-footer {
  border-top: 1px solid #eaeaea;
  padding-top: 18px;
  display: flex;
  justify-content: flex-end;
}

.mm-store-cta {
  height: 52px;
  border-radius: 12px;
  border: none;
  padding: 0 20px;
  font-weight: 900;
  font-size: 16px;
  background: #bdbdbd;
  color: #fff;
  cursor: not-allowed;
}

/* ===================== ACCOUNT DRAWER ===================== */
.mm-drawer {
  position: fixed;
  top: 0;
  bottom: 0;
  width: min(420px, 92vw);
  background: #fff;
  z-index: 80;
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.25);
}

.mm-drawer-right {
  right: 0;
}

.mm-drawer-inner {
  height: 100%;
  padding: 22px;
  overflow: auto;
}

.mm-drawer-title {
  margin: 0 0 14px 0;
  font-size: 26px;
  font-weight: 900;
  color: #111;
}

.mm-drawer-subtitle {
  margin: 0 0 14px 0;
  font-size: 18px;
  font-weight: 900;
  color: #111;
}

.mm-form {
  display: grid;
  gap: 14px;
}

.mm-input {
  width: 100%;
  height: 56px;
  border-radius: 12px;
  border: 2px solid #e2e2e2;
  outline: none;
  padding: 0 14px;
  font-size: 15px;
}

.mm-pass {
  position: relative;
}

.mm-eye {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 4px;
  opacity: 0.7;
}

.mm-eye:hover {
  opacity: 1;
}

.mm-eye svg {
  width: 22px;
  height: 22px;
  fill: #111;
}

.mm-forgot {
  width: fit-content;
  color: #111;
  font-size: 14px;
  text-decoration: underline;
}

.mm-login {
  height: 56px;
  border-radius: 12px;
  border: none;
  background: #111;
  color: #fff;
  font-weight: 900;
  font-size: 18px;
  cursor: pointer;
}

.mm-account-card {
  margin-top: 10px;
  background: #f6f6f6;
  border-radius: 14px;
  padding: 16px;
}

.mm-account-card-h {
  font-size: 20px;
  font-weight: 900;
  color: #111;
  margin-bottom: 12px;
}

.mm-club {
  width: 100%;
  height: 56px;
  border-radius: 12px;
  border: 2px solid #111;
  background: #fff;
  color: #111;
  font-weight: 900;
  font-size: 18px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.mm-club-arrow {
  font-size: 26px;
}

.mm-club-fast {
  margin-top: 12px;
  display: inline-block;
  color: #111;
  font-size: 14px;
  text-decoration: underline;
}

/* ===================== MENU DRAWER ===================== */
.mm-menu-drawer {
  position: fixed;
  inset: 0;
  z-index: 90;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 18px;
}

.mm-menu-wrap {
  width: min(1180px, 96vw);
  height: min(720px, 92vh);
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.mm-menu-head {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 18px;
  border-bottom: 1px solid #eee;
  position: relative;
}

.mm-menu-logo {
  height: 26px;
  width: auto;
  display: block;
  filter: brightness(0);
}

.mm-x-dark {
  color: #111;
}

.mm-x-absolute {
  position: absolute !important;
  right: 0 !important;
  top: 0 !important;
  height: 64px;
  width: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mm-menu-body {
  flex: 1;
  display: flex;
  min-height: 0;
}

.mm-menu-left {
  width: 340px;
  border-right: 1px solid #eee;
  padding: 18px;
  overflow: auto;
}

.mm-menu-title {
  margin: 0 0 12px 0;
  font-size: 28px;
  font-weight: 900;
  color: #111;
}

.mm-menu-item {
  width: 100%;
  text-align: left;
  border: none;
  background: transparent;
  padding: 14px 10px;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  color: #111;
}

.mm-menu-item:hover {
  background: #f3f3f3;
}

.mm-menu-item.active {
  background: #f1f1f1;
}

.mm-menu-item-arrow {
  font-size: 20px;
  opacity: 0.8;
}

.mm-menu-right {
  flex: 1;
  padding: 18px;
  overflow: auto;
  min-width: 0;
}

.mm-mega-header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 10px;
}

.mm-mega-title {
  font-size: 22px;
  font-weight: 900;
  color: #111;
}

.mm-mega-columns {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 28px;
  align-items: start;
}

.mm-mega-section {
  margin-bottom: 18px;
}

.mm-mega-section-title {
  font-weight: 900;
  color: #111;
  margin-bottom: 8px;
  font-size: 16px;
}

.mm-mega-links {
  display: grid;
  gap: 8px;
}

.mm-mega-link {
  color: #111;
  text-decoration: none;
  font-size: 15px;
}

.mm-mega-link:hover {
  text-decoration: underline;
}

/* Brands block */
.mm-brands-grid {
  margin-top: 18px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
}

.mm-brand-link {
  display: block;
  padding: 8px 0;
  color: #111;
  text-decoration: none;
  font-weight: 800;
}

.mm-brand-link:hover {
  text-decoration: underline;
}

/* ===================== RESPONSIVE ===================== */
@media (max-width: 1100px) {
  .mm-store-title {
    font-size: 16px;
  }
  .mm-search {
    max-width: 620px;
  }
  .mm-mega-columns {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 860px) {
  .mm-search {
    max-width: none;
    min-width: 0;
  }
  .mm-topbar-inner {
    width: 100%;
  }
  .mm-mega-columns {
    grid-template-columns: 1fr;
  }
  .mm-menu-left {
    width: 320px;
  }
}
</style>