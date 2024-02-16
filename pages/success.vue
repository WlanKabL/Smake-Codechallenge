<template>
    <AppHeader>
    </AppHeader>
    <div class="h-screen flex items-center justify-center flex-wrap flex-col">
        <h1 class="md:text-7xl text-2xl mb-12 font-mono">Thank you for your order.</h1>
        <NuxtLink class="btn primary" @click="router.push('/')">Design another product</NuxtLink>
    </div>
</template>

<script setup lang="ts">
//* Defaults
import { useRouter } from "vue-router"

//* Instances
const router = useRouter();
</script>