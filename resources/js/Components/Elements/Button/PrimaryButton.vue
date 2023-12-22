<script setup>
import { computed, ref } from 'vue'

defineProps({
    to: {
        type: String,
        required: false,
    },
})

const property = ref(
    'inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150'
)

/*computed(() => {
    property() {
        return {
            'inline-block rounded-full font-semibold leading-7 text-white transition-all duration-250 uppercase': true,
            'px-4 py-1 text-sm': this.size === 'sm',
            'px-4 py-2.5': this.size === 'normal',
            'px-4 py-3 text-lg': this.size === 'lg',
            'px-7 py-3 w-100': this.size === 'full',
            'bg-gray-100 hover:bg-gray-200 text-blue-500': this.color === 'white',
            'bg-blue-500 dark:bg-blue-700 hover:bg-blue-700': this.color === 'primary',
            'bg-transparent text-black dark:text-white px-0': this.color === 'transparent',
            'bg-blue-100 dark:bg-blue-800/50 text-blue-600 dark:text-blue-400 hover:bg-blue-500 hover:text-white dark:bg-gray-800 dark:hover:bg-blue-800': this.secondary,
            'cursor-not-allowed opacity-50': this.disabled
        }
    }
})*/
</script>

<template>
    <a v-if="to" :class="property" :href="route(to)">
        <slot />
    </a>
    <button v-else :class="property">
        <slot />
    </button>
</template>
