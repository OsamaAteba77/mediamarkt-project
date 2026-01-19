 <template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
import { useCartStore } from '~/stores/cart';
const cartStore = useCartStore();

onMounted(() => {
  cartStore.initializeStore();
});
</script>