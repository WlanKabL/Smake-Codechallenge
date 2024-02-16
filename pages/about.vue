<template>
    <AppHeader></AppHeader>
    <div class="h-screen flex items-center justify-center flex-wrap flex-col">
        <h1 class="md:text-7xl text-2xl mb-12 font-mono">This is a Demo Page</h1>
        <NuxtLink class="btn warning" @click="$router.back()">Back</NuxtLink>
    </div>
</template>