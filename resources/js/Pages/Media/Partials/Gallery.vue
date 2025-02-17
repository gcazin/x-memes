<script setup>
import MediaItem from '@/Components/Media/MediaItem.vue'
import Icon from '@/Components/Misc/Icon.vue'
import ShouldRegisterModal from '@/Components/Misc/ShouldRegisterModal.vue'
import Tag from '@/Components/Misc/Tag.vue'
import Text from '@/Components/Misc/Text.vue'
import Stack from '@/Layouts/Partials/Stack.vue'
import { router, usePage } from '@inertiajs/vue3'
import { computed, onMounted, ref, toRef } from 'vue'

const props = defineProps({
    medias: {
        type: Object,
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
    defaultSort: {
        type: String,
    },
})

const page = usePage()
const auth = page.props.auth
const allPosts = ref(props.medias?.data ? [...props.medias.data] : null)
const pagination = toRef(props.medias)
const wrapper = ref(null)
const loadMoreIntersect = ref(null)
const loading = ref(false)
const selectedFilters = ref({
    filters: {
        tags: [],
    },
    sort: props.defaultSort,
    type: 'all',
})
const types = [
    {
        name: 'Image',
        value: 'image',
    },
    {
        name: 'Vidéo',
        value: 'video',
    },
    {
        name: 'Voir tout',
        value: 'all',
    },
]
const urlParams =
    typeof window !== 'undefined'
        ? new URLSearchParams(window.location.search)
        : null

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

    if (loadMoreIntersect.value) {
        observer.observe(loadMoreIntersect.value)
    }
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

const getTypeTitle = computed(() => {
    const selector = selectedFilters.value.type

    let title = ''
    if (selector) {
        switch (selector) {
            case 'image':
                title += 'Images'
                break
            case 'video':
                title += 'Vidéos'
                break
            case 'all':
                title += 'Tous les mèmes'
                break
        }
    }

    return title
})

const getSortTitle = computed(() => {
    const selector = selectedFilters.value.sort

    let title = ''
    if (selector) {
        if (selector.charAt(0) === '-') {
            switch (selector.slice(1)) {
                case 'name':
                    title += 'Par ordre alphabétique (Z-A)'
                    break
                case 'download_count':
                    title += 'Les plus populaires 🔥'
                    break
                case 'created_at':
                    title += 'Les plus récents'
            }
        } else {
            switch (selector) {
                case 'name':
                    title += 'Par ordre alphabétique (A-Z)'
                    break
                case 'download_count':
                    title += 'Les moins populaires'
                    break
                case 'created_at':
                    title += 'Les plus anciens'
            }
        }
    }

    return title
})

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
 * Adds query tags to selected tags
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
            type: selectedFilters.value.type,
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

const addSelectedType = (index, sort) => {
    selectedFilters.value.type = sort

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

/**
 * Fetch data when user clicks on type of meme selection
 */
const sortByType = (index, sorting) => {
    fetchData(pagination.value.first_page_url, addSelectedType(index, sorting))
}

const fetchData = (url, filters = null) => {
    loading.value = true
    if (url) {
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
                if (typeof window !== 'undefined') {
                    window.history.replaceState({}, '', pagination.value.path)
                }
                pagination.value = props.medias
                loading.value = false
            },
        })
    } else {
        loading.value = false
    }
}
</script>
<template>
    <Stack>
        <div v-if="selectedFilters.filters.tags.length">
            <Stack spacing="1">
                <Text>Tags sélectionnés</Text>
                <div class="space-x-1">
                    <Tag
                        v-for="(tag, index) in selectedFilters.filters.tags"
                        :key="index"
                        size="lg"
                        type="secondary"
                    >
                        {{ tags.find((t) => t.id === tag).name }}
                    </Tag>
                </div>
            </Stack>
        </div>

        <div
            class="mt-4 flex w-full justify-between space-x-2 md:justify-center md:text-right lg:mt-0 lg:block"
            v-if="(tags && tags.length) || sortBy"
        >
            <div v-if="sortBy" class="dropdown md:dropdown-end">
                <div tabindex="0" role="button" class="btn btn-ghost btn-sm">
                    <Text type="xs">{{ $t('Type de mème') }}</Text>
                    <Icon name="angle-down" />
                </div>
                <ul
                    tabindex="0"
                    class="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
                    aria-labelledby="dropdownSortButton"
                >
                    <li v-for="(sort, index) in types" :key="index">
                        <a @click="sortByType(index, sort.value)">
                            {{ $t(sort.name) }}
                        </a>
                    </li>
                </ul>
            </div>
            <div
                v-if="sortBy"
                class="dropdown dropdown-end border-l border-gray-500 pl-2"
            >
                <div tabindex="0" role="button" class="btn btn-ghost btn-sm">
                    <Text type="xs">{{ $t('Trier') }}</Text>
                    <Icon name="angle-down" />
                </div>
                <ul
                    tabindex="0"
                    class="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
                    aria-labelledby="dropdownSortButton"
                >
                    <li v-for="(sort, index) in sortBy" :key="index">
                        <a @click="sortByProperty(index, sort.value)">
                            {{ $t(sort.name) }}
                            <Icon
                                class="ms-auto inline"
                                :name="`angle-${checkIfSortIsSelected(
                                    sort.value
                                )}`"
                            />
                        </a>
                    </li>
                </ul>
            </div>
            <div
                v-if="tags.length"
                class="dropdown dropdown-end border-l border-gray-500 pl-2"
            >
                <div tabindex="0" role="button" class="btn btn-ghost btn-sm">
                    <Text type="xs">{{ $t('Filter par tags') }}</Text>
                    <Icon name="angle-down" />
                </div>
                <ul
                    tabindex="0"
                    class="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
                    aria-labelledby="dropdownTagsButton"
                >
                    <li v-for="(tag, index) in tags" :key="index">
                        <a @click="filterByTags(tag.id)">
                            <input
                                :id="`checkbox-item-${tag.name}`"
                                type="checkbox"
                                :value="tag.id"
                                class="checkbox-primary checkbox checkbox-sm"
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

        <div
            class="text-center"
            v-if="allPosts && allPosts.length && selectedFilters.sort"
        >
            {{ $t(getTypeTitle) }} - {{ $t(getSortTitle) }}
        </div>

        <div
            ref="wrapper"
            v-if="allPosts && allPosts.length"
            class="grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-3"
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
        <div v-else>
            <Text>
                {{
                    $t(
                        "Aucun résultat n'a été trouvé, mais tu peux y remédier, j'dis ça j'dis rien..."
                    )
                }}
            </Text>
        </div>

        <div ref="loadMoreIntersect">
            <div
                v-if="loading"
                class="mt-8 flex items-center justify-center py-4"
            >
                <span
                    class="loading loading-infinity loading-lg text-5xl"
                ></span>
                <div class="font-bold">Chargement...</div>
            </div>
        </div>

        <ShouldRegisterModal :is-closable="false">
            <template #title>
                {{
                    $t(
                        'Inscris-toi pour avoir un accès gratuit à tous les mèmes!'
                    )
                }}
            </template>
        </ShouldRegisterModal>
    </Stack>
</template>
<style scoped></style>
