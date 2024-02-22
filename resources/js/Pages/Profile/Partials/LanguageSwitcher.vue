<script setup>
import Icon from '@/Components/Misc/Icon.vue'
import Text from '@/Components/Misc/Text.vue'
import helperService from '@/Services/helper.service.js'
import { usePage } from '@inertiajs/vue3'
import { onMounted, ref } from 'vue'

onMounted(() => {
    helperService.setTheme()
    currentLanguage()
    getSupportedLocales()
})

const page = usePage()
const availableLanguages = ref([])
const getSupportedLocales = () => {
    const supportedLocales = page.props.supportedLocales

    Object.values(supportedLocales).forEach((supportedLocale) => {
        availableLanguages.value.push({
            label: supportedLocale.native,
            value: supportedLocale.regional.slice(0, 2).toLowerCase(),
        })
    })
}

const currentLanguage = () => {
    return page.props.locale
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
                    <a :href="route('language', language.value)">
                        <Text type="sub">{{ $t(language.label) }}</Text>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>
