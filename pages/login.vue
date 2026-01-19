 <script setup lang="ts">
import { ref } from 'vue';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';

const { $auth } = useNuxtApp();
const router = useRouter();

const email = ref('');
const password = ref('');
const showPass = ref(false);

const errorMsg = ref('');
const loading = ref(false);

const handleLogin = async () => {
  if (!email.value || !password.value) {
    errorMsg.value = 'Lütfen tüm alanları doldurun.';
    return;
  }

  loading.value = true;
  errorMsg.value = '';

  try {
    await signInWithEmailAndPassword($auth, email.value, password.value);
    router.push('/');
  } catch (error: any) {
    if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found') {
      errorMsg.value = 'E-posta veya şifre hatalı.';
    } else if (error.code === 'auth/too-many-requests') {
      errorMsg.value = 'Çok fazla deneme yaptınız. Lütfen bekleyin.';
    } else {
      errorMsg.value = 'Giriş yapılamadı: ' + error.message;
    }
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen bg-white text-[#191919]">
    <!-- Top back row -->
    <div class="w-full border-b border-gray-200">
      <div class="mx-auto w-full max-w-[1100px] px-4 py-4">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 text-sm font-semibold text-black hover:underline"
        >
          <span class="text-xl leading-none">‹</span>
          Geri
        </NuxtLink>
      </div>
    </div>

    <!-- Centered layout like original -->
    <div class="mx-auto w-full max-w-[1100px] px-4">
      <div class="mx-auto w-full max-w-[520px] pt-14 pb-24">

        <h1 class="text-[38px] leading-[1.08] font-extrabold tracking-tight text-[#1b1b1b]">
          MediaMarkt CLUB üyesi<br />misiniz?
        </h1>

        <p class="mt-4 text-[15px] leading-6 text-[#2b2b2b]">
          MediaMarkt CLUB üyeliğinin tüm avantajlarından yararlanmak<br />
          için şimdi giriş yapın.
        </p>

        <!-- Error -->
        <div
          v-if="errorMsg"
          class="mt-8 rounded-md border border-red-100 bg-red-50 px-4 py-3 text-center text-sm font-semibold text-red-600"
        >
          {{ errorMsg }}
        </div>

        <!-- Form -->
        <form @submit.prevent="handleLogin" class="mt-8 space-y-5">
          <input
            v-model="email"
            type="email"
            placeholder="E-posta adresi"
            class="h-[54px] w-full rounded-md border border-[#cfcfcf] px-4 text-[14px] text-black placeholder:text-gray-500
                   focus:outline-none focus:border-black"
          />

          <!-- Password with eye icon -->
          <div class="relative">
            <input
              v-model="password"
              :type="showPass ? 'text' : 'password'"
              placeholder="Şifre"
              class="h-[54px] w-full rounded-md border border-[#cfcfcf] px-4 pr-12 text-[14px] text-black placeholder:text-gray-500
                     focus:outline-none focus:border-black"
            />

            <button
              type="button"
              class="absolute right-3 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center text-gray-700 hover:text-black"
              @click="showPass = !showPass"
              aria-label="Şifreyi göster/gizle"
            >
              <!-- eye / eye-off -->
              <svg v-if="!showPass" viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              <svg v-else viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 3l18 18"></path>
                <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8"></path>
                <path d="M9.9 5.1A10.4 10.4 0 0 1 12 5c6.5 0 10 7 10 7a18 18 0 0 1-4 5.2"></path>
                <path d="M6.1 6.1A18 18 0 0 0 2 12s3.5 7 10 7c1 0 2-.2 2.9-.5"></path>
              </svg>
            </button>
          </div>

          <div class="text-left">
            <NuxtLink to="/forgot-password" class="text-[13px] text-[#111] underline hover:text-black">
              Şifremi unuttum.
            </NuxtLink>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="mt-2 h-[54px] w-full rounded-md bg-black text-[15px] font-extrabold text-white
                   hover:bg-[#111] transition disabled:opacity-60"
          >
            {{ loading ? 'Giriş Yapılıyor...' : 'Giriş yap' }}
          </button>
        </form>

        <!-- Divider section -->
        <div class="mt-12 text-center">
          <p class="text-[13px] font-extrabold text-black mb-4">Henüz üyeliğiniz yok mu?</p>

          <NuxtLink
            to="/register"
            class="flex h-[54px] w-full items-center justify-center gap-2 rounded-md border-2 border-black bg-white
                   text-[15px] font-extrabold text-black hover:bg-black hover:text-white transition"
          >
            <span class="text-xl leading-none">›</span>
            Hemen üye olun
          </NuxtLink>

          <div class="mt-8">
            <p class="text-[12px] font-bold text-black mb-2">
              Mağazada kayıtlı bir MediaMarkt CLUB kart numaranız var mı?
            </p>

            <a
              href="#"
              class="inline-flex items-center gap-2 text-[12px] font-extrabold text-[#df0000] hover:underline"
            >
              <span class="text-lg leading-none">›</span>
              MediaMarkt CLUB Kart Numaranız ile kayıt olun
            </a>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
