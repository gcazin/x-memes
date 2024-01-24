<script setup>
import Text from '@/Components/Misc/Text.vue'
import PageLayout from '@/Layouts/PageLayout.vue'
import Section from '@/Layouts/Partials/Section.vue'
import Stack from '@/Layouts/Partials/Stack.vue'
import { Head } from '@inertiajs/vue3'
import { marked } from 'marked'

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
    return moment(value).fromNow()
}
</script>

<template>
    <Head title="Journal des modifications" />

    <PageLayout title="Journal des modifications">
        <template #action>
            Dernière mise à jour du site :
            {{ dateTime(commits[0].commit.committer.date) }}
        </template>
        <Section v-for="(release, index) in releases" :key="index">
            <Stack>
                <div class="flex justify-between">
                    <Text class="text-primary-content">
                        Version {{ release.tag_name }}
                    </Text>
                    <Text>
                        {{ dateTime(release.published_at) }}
                    </Text>
                </div>
                <Text v-html="markdown(release.body)"></Text>
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
