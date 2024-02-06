<script setup>
import helperService from '@/Services/helper.service.js'
import { computed, onMounted } from 'vue'
import Icon from '@/Components/Misc/Icon.vue'
import { usePage, Link, router } from '@inertiajs/vue3'
import Text from '@/Components/Misc/Text.vue'
import Stack from '@/Layouts/Partials/Stack.vue'
import DropdownLink from '@/Components/Dropdown/DropdownLink.vue'

onMounted(() => {
    helperService.setTheme()
    currentLanguage()
})

const page = usePage()
const availableLanguages = [
    {
        label: 'Français',
        value: 'fr'
    },
    {
        label: 'English',
        value: 'en'
    }
]

const currentLanguage = () => {
    return page.props.locale
}

const toggleLanguage = (language) => {
    return router.visit(route('language', language), {
        onSuccess: () => {
            window.location.reload()
        }
    })
}
</script>
<template>
    <div class="dropdown dropdown-end">
        <div
            tabindex="0"
            role="button"
            class="btn btn-ghost btn-circle"
        >
            <Icon name="language" size="2xl" />
        </div>
        <div
            tabindex="0"
            class="menu dropdown-content z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
        >
            <ul>
                <li v-for="(language, index) in availableLanguages" :key="index">
                    <a @click="toggleLanguage(language.value)">
                        <Text type="sub">{{ language.label }}</Text>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>
