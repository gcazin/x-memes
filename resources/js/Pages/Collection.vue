<script setup>
import Text from '@/Components/Misc/Text.vue'
import PageLayout from '@/Layouts/PageLayout.vue'
import { Head, usePage } from '@inertiajs/vue3'

const props = defineProps({
    tags: {
        type: Array,
    },
})

const page = usePage()
</script>

<template>
    <Head :title="page.props.seo.title" />

    <PageLayout :title="page.props.seo.title">
        <template #action>
            <a :href="route('library')" class="btn btn-ghost text-secondary">
                {{ $t('Voir tout') }}
            </a>
        </template>
        <template #subtitle>
            {{
                $t(
                    'Il y a actuellement :count collections présentes sur le site.',
                    { count: tags.length }
                )
            }}
        </template>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-3">
            <div
                class="card image-full h-64 bg-base-100 bg-cover shadow-lg"
                v-for="tag in tags"
                :key="tag.id"
                :style="`background-image: url(/storage/${
                    tag.medias.type === 'video'
                        ? tag.medias.thumbnail_path
                        : tag.medias.path
                })`"
            >
                <div class="card-body">
                    <h2 class="card-title">
                        {{ tag.name.toUpperCase() }}
                    </h2>
                    <Text>
                        {{
                            $t('Collection de :count mèmes', {
                                count: tag.medias_count,
                            })
                        }}
                    </Text>
                    <div class="card-actions justify-end">
                        <a
                            :href="route('tag.show', tag.name)"
                            class="btn btn-primary"
                            type="secondary"
                        >
                            {{ $t('Explorer') }}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </PageLayout>
</template>

<style scoped></style>
