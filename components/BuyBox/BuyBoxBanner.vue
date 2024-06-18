<template>
    <div>
        <div class="buyBox_banner" v-if="currentStep.id < 3">
        </div>
    </div>
</template>
<script setup lang="ts">
import { useBuyBoxStore } from '@/stores/buyBox';
import { storeToRefs } from "pinia";

const buyBoxStore = useBuyBoxStore(); 

const { currentStep } = storeToRefs(buyBoxStore);

</script>