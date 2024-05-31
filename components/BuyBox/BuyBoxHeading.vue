<template>
  <div class="nn-row nn-justify-center nn-mb-1-5 nn-mb-md-3">
    <div
        class="buyBox_heading nn-px-3 nn-px-md-5 nn-py-2 nn-py-md-3 nn-rounded-5 nn-bg-neutral1 nn-text-whiteColor nn-height-48 nn-height-md-74">
      <h1 class="nn-mx-md-2-5 nn-mb-0 nn-mb-md-1">
        <span class="nn-me-1">{{ $t(`fifa.title_1`) }}</span>
        <span>&nbsp;{{ $t(`fifa.title_2`) }}</span>
      </h1>
      <div class="nn-d-flex nn-height-12 nn-height-md-18 nn-align-center">
        <div class="nn-width-full nn-height-2 nn-height-md-4 nn-bg-whiteColor nn-rounded-4"></div>
        <!-- <img src="@/assets/images/heading-fifa23.svg" alt="Fifa23 icon" width="52" height="12"
            class="nn-d-md-none nn-ms-1">
        <img src="@/assets/images/heading-fifa23.svg" alt="Fifa23 icon" width="78" height="18"
            class="nn-d-none nn-d-md-inline-block nn-ms-1"> -->
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
export interface Props {
  coin?: string
};
const props = withDefaults(defineProps<Props>(), {
  coin: 'home',
});
</script>