//* Defaults
import { defineStore } from 'pinia';

//* Interfaces
import { IUserInfo } from '~/interfaces/IUserInfo';
import { IOrderDetails } from '~/interfaces/IOrderDetails';
interface IErrors {
    name?: string[];
    address?: string[];
}

export const useCheckoutStore = defineStore('checkoutStore', () => {
    const userInfo = ref<IUserInfo>({
        name: null,
        address: null,
    });

    const checkoutProcess = ref<{
        currentStep: number;
        steps: string[];
    }>({
        currentStep: 0,
        steps: ['PersonalData', 'OrderData'],
    });

    function clearUserInfo(): void {
        userInfo.value.name = null;
        userInfo.value.address = null;
        checkoutProcess.value.currentStep = 0;
    }

    async function orderProduct(
        orderDetails: IOrderDetails,
    ): Promise<{ errors: IErrors } | null> {
        const errors: IErrors = {};

        if (!userInfo.value.name) {
            errors.name = ['The name field is empty'];
        }
        if (!userInfo.value.address) {
            errors.address = ['The address field is empty'];
        }
        if (Object.keys(errors).length > 0) {
            return { errors: errors };
        }

        const requestOptions: object = {
            method: 'POST',
            headers: {},
            body: JSON.stringify({
                name: userInfo.value.name,
                address: userInfo.value.address,
                color: orderDetails.color,
                motive: orderDetails.motive,
            }),
        };

        const { data, error } = await useFetch(
            'http://localhost:3023/api/order',
            requestOptions,
        );

        if (error.value || !data.value || !data.value.success) {
            return error.value?.data;
        } else {
            return null;
        }
    }

    return {
        userInfo,
        checkoutProcess,
        clearUserInfo,
        orderProduct,
    };
});
