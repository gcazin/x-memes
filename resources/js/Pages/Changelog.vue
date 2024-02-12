<script setup>
import Text from '@/Components/Misc/Text.vue'
import PageLayout from '@/Layouts/PageLayout.vue'
import Section from '@/Layouts/Partials/Section.vue'
import Stack from '@/Layouts/Partials/Stack.vue'
import { Head, usePage } from '@inertiajs/vue3'
import { getActiveLanguage, trans } from 'laravel-vue-i18n'
import { marked } from 'marked'
import moment from 'moment'

const props = defineProps({
    releases: {
        type: Array,
    },
    commits: {
        type: Array,
    },
})

const markdown = (value) => {
    return marked(value)
}

const dateTime = (value) => {
    return moment(value).locale(getActiveLanguage()).fromNow()
}

const page = usePage()
</script>

<template>
    <Head :title="page.props.seo.title" />

    <PageLayout :title="page.props.seo.title">
        <template #action>
            {{
                trans('Dernière mise à jour du site : :date', {
                    date: dateTime(commits[0].commit.committer.date),
                })
            }}
        </template>
        <Section v-for="(release, index) in releases" :key="index">
            <Stack>
                <div class="flex justify-between">
                    <Text class="font-bold text-primary">
                        Version {{ release.tag_name }}
                    </Text>
                    <Text>
                        {{ dateTime(release.published_at) }}
                    </Text>
                </div>
                <p v-html="markdown(release.body)"></p>
            </Stack>
        </Section>
    </PageLayout>
</template>

<style scoped>
:deep(ul) {
    display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
}
</style>
