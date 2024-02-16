<template>
    <h1 class="text-3xl">Order Data</h1>
    <div class="flex flex-row justify-between mt-4" v-if="designerStore.currentDesign.motiveObject">
        <div>Motive:</div>
        <div>{{ designerStore.currentDesign.motiveObject.price }} €</div>
    </div>
    <div class="flex flex-row justify-between mt-4">
        <div>Shirt:</div>
        <div>{{ designerStore.currentDesign.colorObject?.price || "0" }} €</div>
    </div>
    <div class="mt-auto w-full absolute bottom-0">
        <div class="line"></div>
        <div class="flex flex-row justify-between mt-2">
            <div>Total:</div>
            <div>{{ designerStore.currentDesignPrice || "0 €" }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
//* Stores
import { useDesignerStore } from '~/stores/designer'; const designerStore = useDesignerStore();
</script>