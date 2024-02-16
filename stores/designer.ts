//* Default Imports
import { computed } from 'vue';
import { defineStore } from 'pinia';

//* Interfaces
import { IItem } from '~/interfaces/IItem';
import { IColor } from '~/interfaces/IColor';
import { IMotive } from '~/interfaces/IMotive';
import { IOrderDetails } from '~/interfaces/IOrderDetails';
import { IDesign } from '~/interfaces/IDesign';

export const useDesignerStore = defineStore('designerStore', () => {
    const colors = ref<IColor[]>([]);
    const motives = ref<IMotive[]>([]);

    const currentDesign = ref<IDesign>({
        colorObject: null,
        motiveObject: null,
    });

    const currentDesignPrice = computed((): string => {
        const totalPrice =
            (currentDesign.value.colorObject?.price || 0) +
            (currentDesign.value.motiveObject?.price || 0);
        //? Round commercially
        const roundedPrice = Math.round(totalPrice * 100) / 100;
        return roundedPrice + ' €';
    });

    function setOrderProperty(orderProperty: IItem) {
        if (orderProperty?.color) {
            currentDesign.value.colorObject = <IColor>orderProperty;
        } else if (orderProperty?.img) {
            //? Allow motive deselection
            if (currentDesign.value.motiveObject == orderProperty) {
                currentDesign.value.motiveObject = null;
            } else {
                currentDesign.value.motiveObject = <IMotive>orderProperty;
            }
        }
    }

    function resetDesignProerties() {
        currentDesign.value.colorObject = colors.value[0];
        currentDesign.value.motiveObject = motives.value[0];
    }

    function prepareOrder(): IOrderDetails {
        return {
            color: <IColor>currentDesign.value.colorObject,
            motive: <IMotive>currentDesign.value?.motiveObject || null,
        };
    }

    async function fetchData() {
        const { data: colorData } = await useFetch(
            'http://localhost:3023/api/colors',
        );
        const { data: motivesData } = await useFetch(
            'http://localhost:3023/api/motives',
        );
        colors.value = <IColor[]>colorData.value;
        motives.value = <IMotive[]>motivesData.value;

        setOrderProperty(colors.value[0]);
        setOrderProperty(motives.value[0]);
    }

    fetchData();

    return {
        currentDesignPrice,
        colors,
        motives,
        currentDesign,
        setOrderProperty,
        resetDesignProerties,
        prepareOrder,
    };
});
