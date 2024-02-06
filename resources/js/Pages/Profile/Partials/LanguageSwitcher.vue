<script setup>
import Icon from '@/Components/Misc/Icon.vue'
import Text from '@/Components/Misc/Text.vue'
import helperService from '@/Services/helper.service.js'
import { router, usePage } from '@inertiajs/vue3'
import { onMounted } from 'vue'

onMounted(() => {
    helperService.setTheme()
    currentLanguage()
})

const page = usePage()
const availableLanguages = [
    {
        label: 'Français',
        value: 'fr',
    },
    {
        label: 'Anglais',
        value: 'en',
    },
]

const currentLanguage = () => {
    return page.props.locale
}

const toggleLanguage = (language) => {
    return router.visit(route('language', language), {
        onSuccess: () => {
            window.location.reload()
        },
    })
}
</script>
<template>
    <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-circle btn-ghost">
            <Icon name="language" size="2xl" />
        </div>
        <div
            tabindex="0"
            class="menu dropdown-content z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
        >
            <ul>
                <li
                    v-for="(language, index) in availableLanguages"
                    :key="index"
                >
                    <a @click="toggleLanguage(language.value)">
                        <Text type="sub">{{ language.label }}</Text>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>
