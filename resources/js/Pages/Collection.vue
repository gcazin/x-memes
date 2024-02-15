<script setup>
import Button from '@/Components/Button/Button.vue'
import Icon from '@/Components/Misc/Icon.vue'
import Text from '@/Components/Misc/Text.vue'
import PageLayout from '@/Layouts/PageLayout.vue'
import { Head, usePage } from '@inertiajs/vue3'
import { onMounted, ref } from 'vue'
import Stack from '@/Layouts/Partials/Stack.vue'

const props = defineProps({
    tags: {
        type: Array,
    },
})

const page = usePage()
const tagsCollections = ref(props.tags)
const showWithOneElement = ref(false)

onMounted(() => {
    showCollectionWithOneElement()
})

/**
 * Function to toggle the display of a collection with one element.
 */
const showCollectionWithOneElement = () => {
    showWithOneElement.value = !showWithOneElement.value

    if (showWithOneElement.value) {
        tagsCollections.value = tagsCollections.value.filter(
            (tag) => tag.medias_count > 1
        )
    } else {
        tagsCollections.value = props.tags
    }
}
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
                            'Il y a actuellement :count collections présentes sur le site, et :show sont affichées.',
                            { count: tags.length, show: tagsCollections.length }
                        )
                    }}
        </template>

        <Stack>
            <div class="text-end">
                <Button
                    v-if="tags.length"
                    ghost
                    size="sm"
                    @click="showCollectionWithOneElement"
                >
                    <Icon
                        :name="
                                !showWithOneElement
                                    ? 'check-square'
                                    : 'square-full'
                            "
                        size="xl"
                    />
                    {{ $t('Afficher ceux avec un seul élément?') }}
                </Button>
            </div>

            <div class="grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-3">
                <div
                    class="card image-full h-64 bg-base-100 bg-cover shadow-lg"
                    v-for="tag in tagsCollections"
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
        </Stack>
    </PageLayout>
</template>

<style scoped></style>
