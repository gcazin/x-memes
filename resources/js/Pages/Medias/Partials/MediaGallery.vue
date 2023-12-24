<script setup>
import { useForm } from '@inertiajs/vue3'
import { onBeforeMount, onMounted, ref, toRef } from 'vue'
import { router } from '@inertiajs/vue3'
import Stack from '@/Components/Layout/Stack.vue'
import Icon from '@/Components/Misc/Icon.vue'
import { all } from 'axios'
import MediaItem from '@/Components/Misc/MediaItem.vue'

const props = defineProps({
    medias: {
        type: Array,
        required: true,
    },
    numberOfCols: {
        type: Number,
        default: 3,
    },
    tags: {
        type: Array,
    },
    sortBy: {
        type: Array,
    },
})

const form = useForm({})
const allPosts = ref([...props.medias.data])
const pagination = toRef(props.medias)
const wrapper = ref(null)
const loadMoreIntersect = ref(null)
const loading = ref(false)
const selectedFilters = ref({
    filters: {
        tags: [],
    },
    sort: null,
})
const urlParams = new URLSearchParams(window.location.search)

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
    fetchData(
        pagination.value.next_page_url,
        selectedFilters.value.filters.tags.length || selectedFilters.value.sort
            ? getFiltersToSend()
            : {}
    )
}

const checkIfTagIsSelected = (tag) => {
    return selectedFilters.value.filters.tags.includes(tag)
}

const checkIfSortIsSelected = (sort) => {
    const selector = selectedFilters.value.sort

    if (selector && selector === sort) {
        return selector.charAt(0) === '-' ? 'down' : 'up'
    }

    return 'down'
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
 * Format the tags used to fetch data
 *
 * @returns {{filters: {}, sort: UnwrapRef<null>}}
 */
const getFiltersToSend = () => {
    return {
        filters: {
            ...(selectedFilters.value.filters.tags.length && {
                tags: selectedFilters.value.filters.tags.join(','),
            }),
        },
        ...(selectedFilters.value.sort && {
            sort: selectedFilters.value.sort,
        }),
    }
}

/**
 * Returns selected tags
 *
 * @param tag
 */
const addSelectedTag = (tag) => {
    const selected = selectedFilters.value.filters.tags
    if (selected.includes(tag)) {
        selected.splice(selected.indexOf(tag), 1)
    } else {
        selected.push(tag)
    }

    return getFiltersToSend()
}

const addSelectedSort = (index, sort) => {
    const selected = selectedFilters.value.sort
    let value = sort

    if (selected && selected === sort) {
        value = `-${sort}`
    }

    selectedFilters.value.sort = value

    return getFiltersToSend()
}

/**
 * Fetch data when user clicks on tags selection
 *
 * @param tag
 */
const filterByTags = (tag) => {
    fetchData(pagination.value.first_page_url, addSelectedTag(tag))
}

/**
 * Fetch data when user clicks on sort by selection
 */
const sortByProperty = (index, sorting) => {
    fetchData(pagination.value.first_page_url, addSelectedSort(index, sorting))
}

const fetchData = (url, filters = null) => {
    loading.value = true
    router.visit(url, {
        data: filters ?? {},
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
</script>
<template>
    <Stack>
        <div class="flex flex-col lg:flex-row lg:items-center">
            <div class="flex-1">
                <span class="text-sm">
                    {{ medias.total }} médias affiché{{
                        medias.total > 1 ? 's' : ''
                    }}
                </span>
            </div>
            <div
                class="flex-1 text-center lg:text-right space-x-2"
                v-if="(tags && tags.length) || sortBy"
            >
                <div
                    v-if="sortBy"
                    class="dropdown border-r border-gray-500 pe-2"
                >
                    <div
                        tabindex="0"
                        role="button"
                        class="btn btn-ghost btn-sm"
                    >
                        Trier <Icon name="chevron-down" />
                    </div>
                    <ul
                        tabindex="0"
                        class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                        aria-labelledby="dropdownSortButton"
                    >
                        <li v-for="(sort, index) in sortBy" :key="index">
                            <a @click="sortByProperty(index, sort.value)">
                                {{ sort.name }}
                                <Icon
                                    class="inline ms-auto"
                                    :name="`arrow-${checkIfSortIsSelected(
                                        sort.value
                                    )}`"
                                />
                            </a>
                        </li>
                    </ul>
                </div>
                <div v-if="tags.length" class="dropdown dropdown-end">
                    <div
                        tabindex="0"
                        role="button"
                        class="btn btn-ghost btn-sm"
                    >
                        Filter par tags <Icon name="chevron-down" />
                    </div>
                    <ul
                        tabindex="0"
                        class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                        aria-labelledby="dropdownTagsButton"
                    >
                        <li v-for="(tag, index) in tags" :key="index">
                            <a @click="filterByTags(tag.id)">
                                <input
                                    :id="`checkbox-item-${tag.name}`"
                                    type="checkbox"
                                    :value="tag.name"
                                    class="checkbox checkbox-primary checkbox-sm"
                                    :checked="checkIfTagIsSelected(tag.id)"
                                />
                                <label for="checkbox-item-1" class="label">
                                    {{ tag.name }}
                                </label>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div
            ref="wrapper"
            v-if="allPosts.length"
            class="grid grid-cols-1 md:grid-cols-3 gap-6"
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
<style scoped></style>
