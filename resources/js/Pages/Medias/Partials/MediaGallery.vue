<script setup>
import { useForm } from '@inertiajs/vue3'
import { onBeforeMount, onMounted, ref, toRef } from 'vue'
import { router } from '@inertiajs/vue3'
import MediaItem from '@/Components/Misc/MediaItem.vue'
import Stack from '@/Components/Layout/Stack.vue'
import Icon from '@/Components/Misc/Icon.vue'
import { all } from 'axios'

const props = defineProps({
    medias: {
        type: Array,
    },
    numberOfCols: {
        type: Number,
        default: 3,
    },
    tags: {
        type: Array,
    },
});

const form = useForm({})
const allPosts = ref([...props.medias.data])
const pagination = toRef(props.medias)
const wrapper = ref(null)
const loadMoreIntersect = ref(null)
const loading = ref(false)
const selectedTags = ref([])
const urlParams = new URLSearchParams(window.location.search)
const pathContainsTag = ref(urlParams.get('tags'))

onMounted(() => {
    addQueryTagsToSelectedTags()
    infiniteScrolling()
})

/**
 * Add infinite scrolling to fetch medias
 */
const infiniteScrolling = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            entry.isIntersecting && loadMorePosts()
        })
    })

    observer.observe(loadMoreIntersect.value)
}

/**
 * Load more posts when scrolling
 */
const loadMorePosts = () => {
    if (props.medias.next_page_url === null) {
        return
    }

    /*
     If some tags are selected,
     we send tags to fetch data
     */
    if (selectedTags.value.length) {
        fetchData(pagination.value.next_page_url, getTagsToSend(), true)
    } else {
        fetchData(pagination.value.next_page_url)
    }
}

/**
 * Format the tags used to fetch data
 *
 * @returns {{tags: string}}
 */
const getTagsToSend = () => {
    return {
        tags: selectedTags.value.join(','),
    }
}

/**
 * Add query tags to selected tags
 */
const addQueryTagsToSelectedTags = () => {
    if (urlParams.get('tags')) {
        const tags = urlParams.get('tags').split(',')

        tags.forEach((tag) => {
            addSelectedTag(tag)
        })
    }
}

/**
 * Returns
 * @param tag
 * @returns {{tags: string}}
 */
const addSelectedTag = (tag) => {
    if (selectedTags.value.includes(tag)) {
        selectedTags.value.splice(selectedTags.value.indexOf(tag), 1)
    } else {
        selectedTags.value.push(tag)
    }

    return getTagsToSend()
}

/**
 * Fetch data when user clicks on tags selection
 *
 * @param tag
 */
const filterByTags = (tag) => {
    fetchData(pagination.value.first_page_url, addSelectedTag(tag), true)
}

const fetchData = (url, data = {}, filtered = false) => {
    loading.value = true
    router.visit(url, {
        data: data,
        only: ['medias'],
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => {
            if (url === pagination.value.first_page_url) {
                allPosts.value = [...props.medias.data]
            } else {
                allPosts.value = [...allPosts.value, ...props.medias.data]
            }
            window.history.replaceState({}, '', pagination.value.path)
            pagination.value = props.medias
            loading.value = false
        },
    })
}

const sortBy = [
    {
        name: 'Par date',
        value: 'created_at',
    },
    {
        name: 'Par titre',
        value: 'name',
    },
]
</script>
<template>
    <Stack>
        <div class="flex">
            <div class="flex-1">
                <span class="text-sm">
                    {{ medias.total }} médias affiché{{
                        medias.total > 1 ? 's' : ''
                    }}
                </span>
            </div>
            <div class="flex-1 text-right space-x-2" v-if="tags.length">
                <div
                    class="dropdown dropdown-end border-r border-gray-500 pe-2"
                >
                    <div tabindex="0" role="button" class="">
                        Trier <Icon name="chevron-down" />
                    </div>
                    <ul
                        class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                        aria-labelledby="dropdownCheckboxButton"
                    >
                        <li v-for="(sort, index) in sortBy" :key="index">
                            <div class="flex items-center">
                                <input
                                    :id="`checkbox-item-${sort.value}`"
                                    type="checkbox"
                                    :value="sort.value"
                                    class="checkbox checkbox-primary checkbox-sm"
                                    @click="filterByTags(sort.value)"
                                />
                                <label for="checkbox-item-1" class="label">
                                    {{ sort.name }}
                                </label>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="dropdown dropdown-end">
                    <div tabindex="0" role="button" class="">
                        Filter par tags <Icon name="chevron-down" />
                    </div>
                    <ul
                        class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                        aria-labelledby="dropdownCheckboxButton"
                    >
                        <li v-for="(tag, index) in tags" :key="index">
                            <div class="flex items-center">
                                <input
                                    :id="`checkbox-item-${tag.name}`"
                                    type="checkbox"
                                    :value="tag.name"
                                    class="checkbox checkbox-primary checkbox-sm"
                                    @click="filterByTags(tag.name)"
                                />
                                <label for="checkbox-item-1" class="label">
                                    {{ tag.name }}
                                </label>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div
            ref="wrapper"
            v-if="allPosts.length"
            class="grid grid-cols-1 md:grid-cols-3 gap-4"
            :class="`grid-cols-1 md:grid-cols-${numberOfCols}`"
        >
            <div
                v-for="(media, index) in allPosts"
                :key="index"
                class="animate-[pulse_0.5s_ease-in-out]"
            >
                <MediaItem :media="media" />
            </div>
            <div
                class="flex items-center justify-center py-4 mt-28"
                ref="loadMoreIntersect"
            >
                <template v-if="loading">
                    <span
                        class="loading loading-infinity loading-lg text-5xl"
                    ></span>
                    <div class="font-bold">Chargement...</div>
                </template>
            </div>
        </div>
        <div v-else>Rien a afficher ici pour l'instant...</div>
    </Stack>
</template>
<style>
/*.gallery {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-auto-columns: 1fr;
    grid-auto-rows: 1fr;
    gap: 10px 10px;
    grid-auto-flow: row dense;
}

.featured { grid-area: 1 / 1 / 3 / 2; }*/
</style>
