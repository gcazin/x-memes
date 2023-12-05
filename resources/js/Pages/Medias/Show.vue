<script setup>
import PageLayout from '@/Layouts/PageLayout.vue';
import {Head} from '@inertiajs/vue3';
import Section from "@/Components/Section.vue";
import Text from "@/Components/Text.vue";
import Tag from "@/Components/Tag.vue";
import Card from "@/Components/Card.vue";

defineProps({
    media: {
        type: Object
    }
})
</script>

<template>
    <Head title="Dashboard" />

    <PageLayout :title="`Média ${media.name} par ${media.user.name}`">
        <div class="flex gap-4">
            <div class="w-2/4">
                <img class="h-full w-full rounded-lg" :src="`/storage/${media.filename}`" alt="">
            </div>

            <Card class="mb-0">
                <Text type="subtitle">{{ media.name }}</Text>
                <Text>
                    Posté par
                    <Text type="link" :href="route('user.show', media.user.id)" class="font-bold">{{ media.user.name }}</Text>
                    le {{ new Date(media.created_at).toLocaleDateString() }}
                    à {{ new Date(media.created_at).toLocaleTimeString() }}
                </Text>

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
