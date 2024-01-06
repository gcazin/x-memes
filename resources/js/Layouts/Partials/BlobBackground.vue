<script setup></script>
<template>
    <div
        class="pointer-events-none absolute inset-x-0 top-0 flex justify-center overflow-hidden"
    >
        <div class="flex w-[108rem] flex-none justify-end">
            <picture>
                <source
                    srcset="/images/background/blur.avif"
                    type="image/avif"
                />
                <img
                    src="/images/background/blur-2.png"
                    alt=""
                    class="w-[71.75rem] max-w-none flex-none dark:hidden"
                    decoding="async"
                    loading="lazy"
                />
            </picture>
            <picture>
                <source
                    srcset="/images/background/blur-3.avif"
                    type="image/avif"
                />
                <img
                    src="/images/background/blur-4.png"
                    alt=""
                    class="hidden w-[90rem] max-w-none flex-none dark:block"
                    decoding="async"
                    loading="lazy"
                />
            </picture>
        </div>
    </div>
    <!--    <div class="absolute inset-0 bottom-10 bg-no-repeat h-full dark:bg-base-300 background"></div>-->
</template>
<style scoped>
.background {
    background-image: url(/images/blur-background.jpg);
    background-size: cover;
}
</style>
