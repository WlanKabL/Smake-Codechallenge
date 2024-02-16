<template>
    <div class="flex md:flex-col items-center rounded shadow-lg md:p-5 p-2 switcher">
        <div class="hide-mobile flex justify-center order-1" @click="Scroll(-1)">
            <span class="pi pi-angle-up text-4xl"></span>
        </div>
        <div class="show-mobile flex justify-center order-1" @click="Scroll(-1)">
            <span class="pi pi-angle-left text-4xl"></span>
        </div>
        <div ref="scrollContainer"
            class="switcher-option-list flex md:flex-col flex-row align-center order-2 overflow-auto">
            <div v-for="option in props.items" @click="designerStore.setOrderProperty(option)"
                class="switcher-option md:h-20 md:w-28 relative flex justify-center items-center rounded md:py-9 py-1 md:px-0 px-1 md:my-1 mx-0"
                :class="{ active: activeName == option.name }">

                <div v-if="option && option.color" class="color-option relative md:h-16 h-12 md:w-16 w-12 rounded-full"
                    :style="{ background: option.color }"></div>

                <div v-else-if="option && option.img" class="relative flex justify-center md:h-16 h-32 w-32 mx-2">
                    <img :src="option.img" class="relative rounded-lg md:w-auto h-full w-full" />
                </div>
            </div>
        </div>
        <div class="hide-mobile flex justify-center order-3" @click="Scroll(1)">
            <span class="pi pi-angle-down text-4xl"></span>
        </div>
        <div class="show-mobile flex items-center order-3" @click="Scroll(1)">
            <span class="pi pi-angle-right text-4xl"></span>
        </div>
    </div>
</template>

<script setup lang="ts">
//* Default Imports
import { computed } from "vue";
//* Stores
import { useDesignerStore } from "~/stores/designer";
//* Interfaces
import { IItem } from "~/interfaces/IItem"

const props = defineProps({
    items: Array<IItem>,
})

const designerStore = useDesignerStore();

const activeName = computed(() => {
    if (!props?.items) return "";

    const colorItem = props.items.find((obj: IItem) => !!obj.color);
    if (colorItem) {
        return designerStore.currentDesign?.colorObject?.name || "";
    }

    const imageItem = props.items.find((obj: IItem) => !!obj.img);
    if (imageItem) {
        return designerStore.currentDesign?.motiveObject?.name || "";
    }
    return "";
});

const scrollContainer = ref<any>(null);
function Scroll(direction: Number) {
    if (scrollContainer.value) {
        scrollContainer.value.scrollBy({
            top: +direction * 100,
            left: +direction * 100,
            behavior: "smooth"
        });
    }
};
</script>
