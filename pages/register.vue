 <script setup lang="ts">
import { ref } from 'vue';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useRouter } from 'vue-router';

const { $auth } = useNuxtApp();
const router = useRouter();

// STATE
const step = ref(1);
const loading = ref(false);
const errorMsg = ref('');

// FORM DATA
const form = ref({
  email: '',
  verificationCode: '',
  name: '',
  surname: '',
  phone: '',
  password: '',
  agree: false
});

// ACTIONS
const nextStep = () => {
  if (step.value === 1) {
    if (!form.value.email || !form.value.email.includes('@')) {
      errorMsg.value = 'Lütfen geçerli bir e-posta adresi giriniz.';
      return;
    }
    errorMsg.value = '';
    step.value = 2;
  } else if (step.value === 2) {
    if (form.value.verificationCode.length < 6) {
      errorMsg.value = 'Lütfen 6 haneli kodu giriniz.';
      return;
    }
    errorMsg.value = '';
    step.value = 3;
  }
};

const handleRegister = async () => {
  if (!form.value.agree) {
    errorMsg.value = 'Lütfen üyelik sözleşmesini onaylayınız.';
    return;
  }
  if (form.value.password.length < 6) {
    errorMsg.value = 'Şifre en az 6 karakter olmalıdır.';
    return;
  }

  loading.value = true;
  errorMsg.value = '';

  try {
    const userCredential = await createUserWithEmailAndPassword($auth, form.value.email, form.value.password);
    await updateProfile(userCredential.user, {
      displayName: `${form.value.name} ${form.value.surname}`
    });
    alert('Üyelik başarıyla tamamlandı!');
    router.push('/');
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      errorMsg.value = 'Bu e-posta adresi zaten kullanımda.';
      step.value = 1;
    } else {
      errorMsg.value = 'Hata: ' + error.message;
    }
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen bg-white text-[#191919]">
    <!-- Top back row like original -->
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

    <!-- Center content (more wide like screenshot) -->
    <div class="mx-auto w-full max-w-[1100px] px-4">
      <div class="mx-auto w-full max-w-[520px] pt-14 pb-24">

        <!-- Title -->
        <h1 class="text-center text-[40px] leading-[1.05] font-extrabold tracking-tight text-[#1b1b1b]">
          Henüz üye değil misiniz?
        </h1>

        <!-- Stepper -->
        <div class="mt-10">
          <div class="relative">
            <div class="absolute left-0 right-0 top-[18px] h-[2px] bg-[#d7d7d7]"></div>

            <div class="relative flex items-start justify-between">
              <!-- 1 -->
              <div class="flex w-1/3 flex-col items-center">
                <div
                  class="grid h-9 w-9 place-items-center rounded-full border-2 text-sm font-bold"
                  :class="step >= 1 ? 'bg-black text-white border-black' : 'bg-white text-gray-400 border-gray-300'"
                >
                  1
                </div>
                <div class="mt-2 text-[12px] font-extrabold text-black">
                  E-posta belirtin
                </div>
              </div>

              <!-- 2 -->
              <div class="flex w-1/3 flex-col items-center">
                <div
                  class="grid h-9 w-9 place-items-center rounded-full border-2 text-sm font-bold"
                  :class="step >= 2 ? 'bg-black text-white border-black' : 'bg-white text-gray-400 border-gray-300'"
                >
                  2
                </div>
                <div class="mt-2 text-[12px]" :class="step >= 2 ? 'font-extrabold text-black' : 'font-semibold text-gray-400'">
                  E-posta doğrulama
                </div>
              </div>

              <!-- 3 -->
              <div class="flex w-1/3 flex-col items-center">
                <div
                  class="grid h-9 w-9 place-items-center rounded-full border-2 text-sm font-bold"
                  :class="step >= 3 ? 'bg-black text-white border-black' : 'bg-white text-gray-400 border-gray-300'"
                >
                  3
                </div>
                <div class="mt-2 text-[12px]" :class="step >= 3 ? 'font-extrabold text-black' : 'font-semibold text-gray-400'">
                  Bilgilerinizi Girin
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Error -->
        <div
          v-if="errorMsg"
          class="mt-8 rounded-md border border-red-100 bg-red-50 px-4 py-3 text-center text-sm font-semibold text-red-600"
        >
          {{ errorMsg }}
        </div>

        <!-- STEP 1 -->
        <div v-if="step === 1" class="mt-12">
          <p class="text-center text-[15px] leading-6 text-[#2b2b2b]">
            E-posta adresinizi aşağıya girin: E-posta adresinizi<br />
            doğrulamak için size 6 haneli bir kod göndereceğiz.
          </p>

          <div class="mt-8 space-y-6">
            <input
              v-model="form.email"
              type="email"
              placeholder="E-posta adresi"
              class="h-[54px] w-full rounded-md border border-[#cfcfcf] px-4 text-[14px] text-black placeholder:text-gray-500
                     focus:outline-none focus:ring-0 focus:border-black"
            />

            <button
              @click="nextStep"
              class="h-[54px] w-full rounded-md bg-black text-[15px] font-extrabold text-white
                     hover:bg-[#111] active:scale-[0.99] transition"
            >
              Devam et
            </button>
          </div>

          <div class="mt-10 pt-10 border-t border-gray-200 text-center">
            <p class="text-[13px] font-extrabold text-black mb-4">Zaten üye misiniz?</p>

            <NuxtLink
              to="/login"
              class="flex h-[54px] w-full items-center justify-center gap-2 rounded-md border-2 border-black bg-white
                     text-[15px] font-extrabold text-black hover:bg-black hover:text-white transition"
            >
              <span class="text-xl leading-none">›</span>
              Buradan giriş yapın
            </NuxtLink>

            <div class="mt-8">
              <p class="text-[12px] font-bold text-black mb-2">
                Mağazada kayıtlı bir MediaMarkt CLUB üyeliğiniz var mı?
              </p>
              <a
                href="#"
                class="inline-flex items-center gap-2 text-[12px] font-extrabold text-[#df0000] hover:underline"
              >
                <span class="text-lg leading-none">›</span>
                CLUB üyelik numaranızla hızlı kayıt olun
              </a>
            </div>
          </div>
        </div>

        <!-- STEP 2 -->
        <div v-if="step === 2" class="mt-12 text-center">
          <p class="text-[#2b2b2b] text-[15px] leading-6">
            Lütfen <strong>{{ form.email }}</strong> adresine gönderilen<br />
            6 haneli doğrulama kodunu giriniz.
            <br /><span class="text-xs text-gray-400 mt-2 block font-normal">(Test Kodu: 123456)</span>
          </p>

          <div class="mt-8 space-y-6">
            <input
              v-model="form.verificationCode"
              type="text"
              maxlength="6"
              placeholder="6 Haneli Kod"
              class="h-[54px] w-full rounded-md border border-[#cfcfcf] px-4 text-center text-[16px] font-extrabold tracking-[0.6em]
                     focus:outline-none focus:border-black"
            />

            <button
              @click="nextStep"
              class="h-[54px] w-full rounded-md bg-black text-[15px] font-extrabold text-white hover:bg-[#111] transition"
            >
              Devam et
            </button>

            <button @click="step = 1" class="text-xs underline text-gray-500 hover:text-black">
              E-posta adresini değiştir
            </button>
          </div>
        </div>

        <!-- STEP 3 -->
        <div v-if="step === 3" class="mt-12">
          <p class="text-center text-[15px] text-[#2b2b2b]">
            Harika! Üyeliğinizi tamamlamak için son bilgileri girin.
          </p>

          <form @submit.prevent="handleRegister" class="mt-8 space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <input v-model="form.name" type="text" placeholder="Ad"
                class="h-[54px] w-full rounded-md border border-[#cfcfcf] px-4 text-sm focus:outline-none focus:border-black" required />
              <input v-model="form.surname" type="text" placeholder="Soyad"
                class="h-[54px] w-full rounded-md border border-[#cfcfcf] px-4 text-sm focus:outline-none focus:border-black" required />
            </div>

            <input v-model="form.phone" type="tel" placeholder="Cep Telefonu"
              class="h-[54px] w-full rounded-md border border-[#cfcfcf] px-4 text-sm focus:outline-none focus:border-black" />

            <div>
              <input v-model="form.password" type="password" placeholder="Şifre"
                class="h-[54px] w-full rounded-md border border-[#cfcfcf] px-4 text-sm focus:outline-none focus:border-black" required />
              <p class="mt-1 pl-1 text-[11px] text-gray-500">En az 6 karakter.</p>
            </div>

            <div class="pt-4">
              <label class="flex items-start gap-3 cursor-pointer select-none">
                <div class="relative mt-0.5">
                  <input v-model="form.agree" type="checkbox"
                    class="peer h-5 w-5 appearance-none rounded border border-gray-400 checked:bg-[#df0000] checked:border-[#df0000]" />
                  <svg class="pointer-events-none absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 text-white"
                    viewBox="0 0 14 14" fill="none">
                    <path d="M3 8L6 11L11 3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>

                <span class="text-xs text-gray-600 leading-tight">
                  <span class="font-extrabold text-black underline">Üyelik Sözleşmesi</span>'ni ve
                  <span class="font-extrabold text-black underline">Rıza Metni</span>'ni okudum, onaylıyorum.
                </span>
              </label>
            </div>

            <button
              type="submit"
              :disabled="loading"
              class="mt-4 h-[54px] w-full rounded-md bg-[#df0000] text-[15px] font-extrabold text-white
                     hover:bg-[#c00000] transition disabled:opacity-70"
            >
              {{ loading ? 'İşleniyor...' : 'Üyeliği Tamamla' }}
            </button>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>
