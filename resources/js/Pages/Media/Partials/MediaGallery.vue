<script setup>
import MediaItem from '@/Components/Media/MediaItem.vue'
import Icon from '@/Components/Misc/Icon.vue'
import Tag from '@/Components/Misc/Tag.vue'
import Text from '@/Components/Misc/Text.vue'
import Modal from '@/Components/Modal/Modal.vue'
import Stack from '@/Layouts/Partials/Stack.vue'
import formService from '@/Services/form.service.js'
import { router, usePage } from '@inertiajs/vue3'
import { computed, onMounted, ref, toRef, watch } from 'vue'

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
})
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

/**
 * Display modal when user is not registered/connected
 */
watch(
    () => pagination.value,
    (newQuery) => {
        if (
            !page.props.auth.isConnected &&
            newQuery &&
            newQuery.current_page === 3
        ) {
            formService.openModal('shouldRegister')
        }
    },
    { immediate: true }
)
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

        <div class="flex flex-col lg:flex-row lg:items-center">
            <div
                class="flex-1"
                v-if="allPosts && allPosts.length && selectedFilters.sort"
            >
                {{ $t(getSortTitle) }}
            </div>
            <div
                class="mt-4 flex-1 space-x-2 text-right lg:mt-0"
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
                        <Text type="xs">{{ $t('Trier') }}</Text>
                        <Icon name="chevron-down" />
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
                        <Text type="xs">{{ $t('Filter par tags') }}</Text>
                        <Icon name="chevron-down" />
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
                <MediaItem
                    v-if="
                        page.props.auth.isConnected ||
                        (!page.props.auth.isConnected &&
                            pagination.current_page !== 3)
                    "
                    :media="media"
                />
                <template v-else>
                    <div class="space-y-6">
                        <div class="skeleton h-96"></div>
                        <div class="skeleton h-96"></div>
                        <div class="skeleton h-96"></div>
                        <div class="skeleton h-96"></div>
                        <div class="skeleton h-96"></div>
                        <div class="skeleton h-96"></div>
                    </div>
                </template>
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

        <Modal id="shouldRegisterModal" :is-closable="false" max-width="3xl">
            <Stack spacing="8" class="text-center">
                <Text type="title">Envie d'en voir plus ?</Text>
                <Text>
                    Crée un compte ou connecte-toi pour voir d'autres résultats
                    de recherche, ajouter des mèmes à tes favoris et bien plus
                    encore !
                </Text>
                <div class="space-x-2">
                    <a :href="route('register')" class="btn btn-primary"
                        >Inscription</a
                    >
                    <a
                        :href="route('login')"
                        class="btn btn-outline btn-primary"
                        >Connexion</a
                    >
                </div>
            </Stack>
        </Modal>
    </Stack>
</template>
<style scoped></style>
