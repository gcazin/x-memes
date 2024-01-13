<script setup>
import helperService from '@/Services/helper.service.js'
import { onMounted } from 'vue'

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
    return localStorage.getItem('theme')
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

    <div class="mt-6 flex flex-col gap-10 lg:flex-row">
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
                        class="theme-controller radio"
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
                        class="theme-controller radio"
                        :value="theme.name"
                        @click="toggleTheme(theme.name)"
                        :checked="currentTheme() === theme.name"
                    />
                </label>
            </div>
        </div>
    </div>
</template>
