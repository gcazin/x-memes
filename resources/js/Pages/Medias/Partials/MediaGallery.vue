<script setup>
import {useForm, usePage} from "@inertiajs/vue3";
import Card from "@/Components/Misc/Card.vue";
import {onMounted, ref, watchEffect} from "vue";

const props = defineProps({
    medias: {
        type: Object
    },
    numberOfCols: {
        type: Number,
        default: 3
    }
})

const page = usePage()

const allPosts = ref(props.medias)
const inertiaUrl = ref(page.url)
const loadMoreIntersect = ref(null)

onMounted(() => {
    const observer = new IntersectionObserver(
        entries => {
            entries
                .forEach(entry => entry.isIntersecting && loadMorePosts())
        })

    observer.observe(loadMoreIntersect.value);
})
const form = useForm({})

const loadMorePosts = () => {
    if (props.medias.next_page_url === null) {
        return
    }

    form.get(props.medias.next_page_url, {
        only: ['data'],
        preserveScroll: true,
    }, {
        onSuccess: () => {
            console.log('ici?')
            allPosts.value = [...allPosts.value, ...props.medias]
            // window.history.replaceState({}, this.$page.title, inertiaUrl.value)
        }
    })
}
</script>
<template>
    <div
        class="grid grid-cols-1 md:grid-cols-3 gap-4"
        :class="`grid-cols-1 md:grid-cols-${numberOfCols}`"
    >
        <div
            v-for="(media, index) in medias.data"
            :key="index"
        >
            <a :href="route('media.show', media.id)">
                <video controls v-if="media.extension === 'mp4'" :src="`/storage/${media.name}`"></video>
                <img v-else class="w-full h-full object-cover shadow" :src="`/storage/${media.filename}`" alt="">
            </a>
        </div>
        <span ref="loadMoreIntersect" id="box"></span>
    </div>
</template>
<style>
.gallery {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-auto-columns: 1fr;
    grid-auto-rows: 1fr;
    gap: 10px 10px;
    grid-auto-flow: row dense;
}

.featured { grid-area: 1 / 1 / 3 / 2; }

</style>
