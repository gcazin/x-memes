<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import {Head} from '@inertiajs/vue3';
import Section from "@/Components/Section.vue";
import Text from "@/Components/Text.vue";
import Tag from "@/Components/Tag.vue";

defineProps({
    media: {
        type: Object
    }
})
</script>

<template>
    <Head title="Dashboard" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                Voir un média
            </h2>
        </template>

        <div class="flex gap-4">
            <div class="flex-1">
                <img class="h-full w-full" :src="`/storage/${media.filename}`" alt="">
            </div>
            <Section class="flex-1">
                <Text type="subtitle">{{ media.name }}</Text>
                <Text>
                    Posté par
                    <a :href="route('user.show', media.user.id)" class="font-bold">{{ media.user.name }}</a>
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
            </Section>
        </div>
    </AuthenticatedLayout>
</template>
