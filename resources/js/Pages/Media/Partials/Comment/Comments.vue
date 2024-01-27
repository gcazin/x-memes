<script setup>
import Stack from '@/Layouts/Partials/Stack.vue'
import Comment from '@/Pages/Media/Partials/Comment/Comment.vue'
import { useForm, usePage } from '@inertiajs/vue3'
import { ref } from 'vue'
import CommentForm from '@/Pages/Media/Partials/Comment/CommentForm.vue'
import Modal from '@/Components/Modal/Modal.vue'

const props = defineProps({
    media: {
        type: Object,
        required: true,
    },
    comments: {
        type: Array,
        required: true,
    },
    isReply: {
        type: Boolean,
        default: false,
        required: false,
    },
})

const openReply = ref(false)
const replyComment = ref(null)
</script>

<template>
    <div
        v-for="(comment, index) in comments.data"
        :key="index"
        class="flex flex-col !space-y-2"
    >
        <Stack>
            <Comment
                :comment
                :media
                v-model:open-reply="openReply"
                v-model:reply-comment="replyComment"
            />

            <!-- Replies -->

            <template v-if="openReply && replyComment === comment.id">
                <!-- Reply comments -->
                <Comment
                    v-if="comment.replies.length"
                    v-for="(reply, index) in comment.replies"
                    :key="index"
                    is-reply
                    :comment="reply"
                    :media="media"
                />

                <!-- Reply form -->
                <CommentForm
                    v-model:cancel="openReply"
                    :media="media"
                    class="ms-auto w-11/12"
                    is-reply
                    :comment="comment"
                    submit-text="Répondre"
                    :label-text="`Répondre à ${comment.user.username}`"
                />
            </template>
        </Stack>
    </div>
</template>

<style scoped></style>
