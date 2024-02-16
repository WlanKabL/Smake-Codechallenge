<template>
    <div class="absolute h-full w-full z-50 top-0 right-0 bottom-0 left-0 flex justify-center items-center"
        v-if="props.loading">
        <div class="rounded-lg p-4 backdrop-blur-sm h-full w-full flex items-center justify-center">
            <ProgressSpinner></ProgressSpinner>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    loading: Boolean,
})
</script>