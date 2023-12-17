<script setup>
import {useForm, usePage} from "@inertiajs/vue3";
import {onMounted, reactive, ref, toRef, watchEffect} from "vue";
import { router } from '@inertiajs/vue3'
import {all} from "axios";

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

const allPosts = ref([...props.medias.data])
const pagination = toRef(props.medias)
const loadMoreIntersect = ref(null)
const loading = ref(false)

onMounted(() => {
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                entry.isIntersecting && loadMorePosts()
            })
        })

    observer.observe(loadMoreIntersect.value);
})

const form = useForm({})

const loadMorePosts = () => {
    if (props.medias.next_page_url === null) {
        return
    }

    loading.value = true
    router.visit(pagination.value.next_page_url, {
        only: ['medias'],
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => {
            allPosts.value = [
                ...allPosts.value,
                ...props.medias.data,
            ]
            pagination.value = props.medias
            window.history.replaceState({}, '', pagination.value.path)
            loading.value = false
        }
    })
}
</script>
<template>
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
            <a :href="route('media.show', media.id)">
                <video controls v-if="media.extension === 'mp4'" :src="`/storage/${media.name}`"></video>
                <img v-else class="w-full h-full object-cover shadow" :src="`/storage/${media.filename}`" alt="">
            </a>
        </div>
    </div>
    <div v-else>
        Rien a afficher ici pour l'instant...
    </div>
    <div class="flex items-center justify-center py-4" ref="loadMoreIntersect">
        <template v-if="loading">
            <span class="loading loading-infinity loading-lg text-5xl"></span>
            <div class="font-bold">Chargement...</div>
        </template>
    </div>
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
