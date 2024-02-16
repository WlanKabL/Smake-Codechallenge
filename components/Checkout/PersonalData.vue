<template>
    <h1 class="text-3xl">Personal Data</h1>
    <div class="flex flex-col gap-2">
        <InputText :invalid="orderErrors && Object.keys(orderErrors).includes('name') && !userInfo.name"
            v-model="userInfo.name" class="mt-4 py-2 pl-1 rounded-lg w-full" placeholder="Enter your Name" />

        <small v-if="orderErrors && Object.keys(orderErrors).includes('name')" v-for="error in orderErrors.name"
            class="text-red-500">
            {{ error }}
        </small>
    </div>

    <div class="flex flex-col gap-2">
        <InputText :invalid="orderErrors && Object.keys(orderErrors).includes('address') && !userInfo.address"
            v-model="userInfo.address" class="mt-4 py-2 pl-1 rounded-lg w-full" placeholder="Enter your Address" />

        <small v-if="orderErrors && Object.keys(orderErrors).includes('address')" v-for="error in orderErrors.address"
            class="text-red-500">
            {{ error }}
        </small>
    </div>
</template>

<script setup lang="ts">
//* Default
import { inject } from 'vue'
//* Interfaces
import { IUserInfo } from "~/interfaces/IUserInfo";

//? Inject userInfo Variables with default values
const userInfo: IUserInfo = inject<IUserInfo>('userInfo') || { name: '', address: '' };
//? Inject orderErrors with default empty array
const orderErrors: any = inject<IUserInfo>('orderErrors') || [];
</script>