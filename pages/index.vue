<template>
    <AppHeader>
        <template #header-right>
            <div class="md:text-xl text-lg w-auto flex items-center">{{ designerStore.currentDesignPrice }}</div>
            <NuxtLink to="/checkout" class="btn primary ml-6">Checkout</NuxtLink>
        </template>
    </AppHeader>
    <div class="h-auto w-screen flex justify-center mb-20">
        <div v-if="designerStore.colors && designerStore.motives && !loading" class="md:container md:mx-auto md:px-4">
            <div class="container flex md:flex-row flex-col items-center justify-center">
                <Switcher :items="designerStore.colors" class="h-full m-4 md:mr-auto order-2 md:order-1"></Switcher>
                <div
                    class="shirt-container mt-10 flex items-center justify-center container relative order-1 md:order-2 md:mb-0 mb-10">
                    <Shirt class="shirt" />
                </div>
                <Switcher :items="designerStore.motives" class="h-full m-4 md:ml-auto order-3"></Switcher>
            </div>
        </div>
        <div v-else>
            <LoadingSpinner :loading="loading"></LoadingSpinner>
        </div>
    </div>
    <AppFooter></AppFooter>
</template>

<script setup lang="ts">
//* Stores
import { useDesignerStore } from "~/stores/designer";

//* Instances
const designerStore = useDesignerStore();

//* Variables
const loading = ref(false);
</script>