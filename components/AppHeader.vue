<template>
    <div class="header flex justify-between items-center h-16 w-full relative top-0 left-0 py-0 px-5 text-white">
        <div class="header-left text-lg grow shrink-0 w-1/5">Mini-Designer</div>
        <div class="header-right flex justify-end grow w-4/5">
            <slot name="header-right"></slot>
        </div>
    </div>
</template>