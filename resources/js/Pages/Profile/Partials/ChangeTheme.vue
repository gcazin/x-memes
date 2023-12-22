<script setup>
import { onMounted } from 'vue'
import theme from 'tailwindcss/defaultTheme.js'
import helperService from '@/Services/helper.service.js'

const availableThemes = [
    {
        label: 'Foncé',
        name: 'dark',
        type: 'dark',
    },
    {
        label: 'Noir',
        name: 'black',
        type: 'dark',
    },
    {
        label: 'Synthwave',
        name: 'synthwave',
        type: 'dark',
    },
    {
        label: 'Clair',
        name: 'light',
        type: 'light',
    },
    {
        label: 'Froid',
        name: 'nord',
        type: 'light',
    },
    {
        label: 'Pastel',
        name: 'pastel',
        type: 'light',
    },
]

onMounted(() => {
    helperService.setTheme()
    currentTheme()
})

const currentTheme = () => {
    return localStorage.theme
}

const toggleTheme = (selectedTheme) => {
    helperService.storeTheme(selectedTheme)
}
</script>
<template>
    <header>
        <h2 class="text-lg font-medium">Changer le thème global du site</h2>

        <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Mettez le site à votre image en changeant de thème.
        </p>
    </header>

    <div class="flex flex-col lg:flex-row gap-10 mt-6">
        <div class="flex-1">
            <p class="mb-2 font-bold">Thème foncé</p>
            <div
                v-for="theme in availableThemes.filter(
                    (t) => t.type === 'dark'
                )"
                class="form-control"
            >
                <label class="label cursor-pointer gap-4">
                    <span class="label-text">{{ theme.label }}</span>
                    <input
                        type="radio"
                        name="theme-radios"
                        class="radio theme-controller"
                        :value="theme.name"
                        @click="toggleTheme(theme.name)"
                        :checked="currentTheme() === theme.name"
                    />
                </label>
            </div>
        </div>
        <div class="flex-1">
            <p class="mb-2 font-bold">Thème clair</p>
            <div
                v-for="theme in availableThemes.filter(
                    (t) => t.type === 'light'
                )"
                class="form-control"
            >
                <label class="label cursor-pointer gap-4">
                    <span class="label-text">{{ theme.label }}</span>
                    <input
                        type="radio"
                        name="theme-radios"
                        class="radio theme-controller"
                        :value="theme.name"
                        @click="toggleTheme(theme.name)"
                        :checked="currentTheme() === theme.name"
                    />
                </label>
            </div>
        </div>
    </div>
</template>
