<script setup>
import PageLayout from '@/Layouts/PageLayout.vue';
import {Head, useForm} from '@inertiajs/vue3';
import Text from "@/Components/Text.vue";
import Tag from "@/Components/Misc/Tag.vue";
import Card from "@/Components/Misc/Card.vue";
import axios from "axios";

const props = defineProps({
    media: {
        type: Object
    }
})

const form = useForm({
    media_id: props.media.id
})

const downloadItem = (item) => {
    console.log(item.filename.split('/')[1])
    axios.get(route('media.download', form.media_id), { responseType: 'blob' })
        .then(response => {
            const blob = new Blob([response.data], { type: response.headers.getContentType() })
            const link = document.createElement('a')
            link.href = URL.createObjectURL(blob)
            link.download = `${item.name}.${item.extension}`
            link.click()
            URL.revokeObjectURL(link.href)
        }).catch((e) => {
        console.log(e)
    })
}
</script>

<template>
    <PageLayout :title="`Média ${media.name} par ${media.user.username}`">
        <div class="flex flex-col lg:flex-row gap-4 pb-6">
            <div class="lg:w-2/4">
                <img class="h-full w-full rounded-lg" :src="`/storage/${media.filename}`" alt="">
            </div>

            <Card class="!mb-0">
                <Text type="subtitle">{{ media.name }}</Text>
                <Text>
                    Posté par
                    <Text type="link" :href="route('user.show', media.user.username)" class="font-bold">{{ media.user.username }}</Text>
                    le {{ new Date(media.created_at).toLocaleDateString() }}
                    à {{ new Date(media.created_at).toLocaleTimeString() }}
                </Text>

                <button
                    class="btn btn-primary"
                    @click="downloadItem(media)"
                    :disabled="form.processing"
                >
                    Télécharger
                    <Tag type="primary" outline>{{ media.download_count }}</Tag>
                </button>

                <div
                    class="flex gap-1"
                >
                    <Tag
                        size="sm"
                        v-for="(tag, index) in media.tags.map((tag) => tag.name.en)"
                        :key="index"
                    >
                        {{ tag }}
                    </Tag>
                </div>
            </Card>
        </div>
    </PageLayout>
</template>
