<script setup>
import helperService from '@/Services/helper.service.js'
import { onMounted } from 'vue'
import Text from '@/Components/Misc/Text.vue'

const availableThemes = [
    {
        label: 'Thème de base',
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
        <Text class="font-bold">Changer le thème global du site</Text>

        <Text type="xs">
            Mettez le site à votre image en changeant de thème.
        </Text>
    </header>

    <div class="mt-6 flex flex-col gap-10 lg:flex-row">
        <div class="flex-1">
            <Text class="mb-2 font-bold">Thème foncé</Text>
            <div
                v-for="theme in availableThemes.filter(
                    (t) => t.type === 'dark'
                )"
                class="form-control"
            >
                <label class="label cursor-pointer gap-4">
                    <span class="label-text">{{ $t(theme.label) }}</span>
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
            <Text class="mb-2 font-bold">Thème clair</Text>
            <div
                v-for="theme in availableThemes.filter(
                    (t) => t.type === 'light'
                )"
                class="form-control"
            >
                <label class="label cursor-pointer gap-4">
                    <span class="label-text">{{ $t(theme.label) }}</span>
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
