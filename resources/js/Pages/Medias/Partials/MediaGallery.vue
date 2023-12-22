<script setup>
import { useForm } from '@inertiajs/vue3'
import { onMounted, ref, toRef } from 'vue'
import { router } from '@inertiajs/vue3'
import MediaItem from '@/Components/Misc/MediaItem.vue'
import Stack from '@/Components/Layout/Stack.vue'
import Icon from '@/Components/Misc/Icon.vue'

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
})

const form = useForm({})
const allPosts = ref([...props.medias.data])
const pagination = toRef(props.medias)
const loadMoreIntersect = ref(null)
const loading = ref(false)
const selectedTags = ref([])
const urlParams = new URLSearchParams(window.location.search)

onMounted(() => {
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

    fetchData(pagination.value.next_page_url)
}

/**
 * Check if path has the given tag
 *
 * @param tag
 * @returns {boolean}
 */
const checkIfPathHaveTag = (tag) => {
    console.log(typeof tag)
    /*if (urlParams.get('tags')) {
        const tags = urlParams.get('tags').split(',')
        return tags.includes(tag)
    }*/
}

const filterByTags = (tag) => {
    if (selectedTags.value.includes(tag)) {
        selectedTags.value.splice(selectedTags.value.indexOf(tag), 1)
    } else {
        selectedTags.value.push(tag)
    }

    let tags = {
        tags: selectedTags.value.join(','),
    }

    fetchData(pagination.value.first_page_url, tags, true)
}

const fetchData = (url, data = {}, filtered = false) => {
    loading.value = true
    router.visit(pagination.value.first_page_url, {
        data: data,
        only: ['medias'],
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => {
            allPosts.value = filtered
                ? props.medias.data
                : [...allPosts.value, ...props.medias.data]

            if (filtered) {
                if (selectedTags.value.length === 0) {
                    window.history.replaceState({}, '', pagination.value.path)
                }
            } else {
                window.history.replaceState({}, '', pagination.value.path)
            }

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
                                    :id="`checkbox-item-${tag.name['fr']}`"
                                    type="checkbox"
                                    :value="tag.name['fr']"
                                    class="checkbox checkbox-primary checkbox-sm"
                                    :checked="
                                        checkIfPathHaveTag(tag.name['fr'])
                                    "
                                    @click="filterByTags(tag.name['fr'])"
                                />
                                <label for="checkbox-item-1" class="label">
                                    {{ tag.name['fr'] }}
                                </label>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div
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
        </div>
        <div v-else>Rien a afficher ici pour l'instant...</div>
        <div
            class="flex items-center justify-center py-4"
            ref="loadMoreIntersect"
        >
            <template v-if="loading">
                <span
                    class="loading loading-infinity loading-lg text-5xl"
                ></span>
                <div class="font-bold">Chargement...</div>
            </template>
        </div>
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
