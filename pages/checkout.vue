<template>
    <AppHeader>
        <template #header-right>
            <NuxtLink to="/" class="btn warning">Back</NuxtLink>
        </template>
    </AppHeader>
    <div class="h-auto w-screen flex justify-center items-center flex-col">
        <div class="container flex items-center justify-center checkout-view md:flex-row flex-col h-full relative">
            <div class="flex-auto">
                <div class="shirt-container mt-10 flex items-center justify-center container relative">
                    <Shirt class="shirt" />
                </div>
            </div>

            <div class="checkout-details-container flex flex-col flex-auto relative h-full md:mb-0 mb-20">
                <div class="flex flex-col items-center">
                    <div class="data-card flex flex-col justify-between shadow-lg rounded relative h-96 w-80 m-5 p-5">
                        <LoadingSpinner :loading="orderLoading"></LoadingSpinner>
                        <div class="w-full h-full relative">
                            <component :is="currentComponent"></component>
                        </div>

                        <div class="w-full flex justify-between  mt-2">
                            <Button v-show="checkoutStore.checkoutProcess.currentStep > 0" @click="previousStep"
                                class="btn secondary">Previous</Button>
                            <Button
                                v-if="checkoutStore.checkoutProcess.currentStep < checkoutStore.checkoutProcess.steps.length - 1"
                                @click="nextStep" class="btn primary">Next</Button>
                            <Button v-else @click="orderProduct" class="btn primary ml-5">Order</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <AppFooter></AppFooter>
</template>

<script setup lang="ts">
//* Defaults
import { provide, computed, defineAsyncComponent } from "vue";
import { useRouter } from "vue-router"

//* Stores
import { useDesignerStore } from "~/stores/designer";
import { useCheckoutStore } from "~/stores/checkout";

//* Instances
const router = useRouter()
const designerStore = useDesignerStore();
const checkoutStore = useCheckoutStore();

//* Variables
const orderLoading = ref(false);
const orderErrors = ref<string[]>();

//? Injections for Checkout/PersonalData.vue
provide("userInfo", checkoutStore.userInfo);
provide("orderErrors", orderErrors);

//? Dynamische Komponenten basierend auf dem aktuellen Schritt
const currentComponent = computed(() => {
    const stepName = checkoutStore.checkoutProcess.steps[checkoutStore.checkoutProcess.currentStep];
    //? Verwende defineAsyncComponent hier nicht direkt, importiere stattdessen dynamisch
    return defineAsyncComponent(() => import(`~/components/Checkout/${stepName}.vue`));
});

//* Functions
function nextStep() {
    checkoutStore.checkoutProcess.currentStep++;
}
function previousStep() {
    checkoutStore.checkoutProcess.currentStep--;
}

async function orderProduct() {
    orderLoading.value = true;
    const checkoutResult: any = await checkoutStore.orderProduct(designerStore.prepareOrder());
    if (!checkoutResult || checkoutResult.length == 0) {
        router.push("/success")
        checkoutStore.clearUserInfo();
        designerStore.resetDesignProerties();
    } else {
        orderErrors.value = checkoutResult.errors;
        checkoutStore.checkoutProcess.currentStep = 0;
        orderLoading.value = false;
    }
}
</script>