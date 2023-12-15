<script setup>
import {Head, useForm} from '@inertiajs/vue3';
import AdminDashboardLayout from "@/Pages/Admin/Layout/AdminDashboardLayout.vue";
import Icon from "@/Components/Misc/Icon.vue";

defineProps({
    users: {
        type: Array
    },
    medias: {
        type: Object
    },
    tags: {
        type: Object
    }
})

const form = useForm({})

const approveMedia = (id) => {
    form.patch(route('admin.media.approve', id), {
        preserveScroll: true,
        // onSuccess: () => closeModal(),
        // onError: () => passwordInput.value.focus(),
        // onFinish: () => form.reset(),
    });
};
const deleteMedia = (id) => {
    form.delete(route('media.destroy', id), {
        preserveScroll: true,
        // onSuccess: () => closeModal(),
        // onError: () => passwordInput.value.focus(),
        // onFinish: () => form.reset(),
    });
};
</script>

<template>
    <AdminDashboardLayout title="Dashboard">
        <div class="stats shadow w-full bg-base-300">
            <div class="stat">
                <div class="stat-figure text-primary">
                    <Icon name="people" size="3xl" />
                </div>
                <div class="stat-title">Nombre d'utilisateurs inscrits</div>
                <div class="stat-value">
                    {{ users.length }}
                </div>
<!--                <div class="stat-desc">Jan 1st - Feb 1st</div>-->
            </div>
            <div class="stat">
                <div class="stat-figure text-primary">
                    <Icon name="images" size="3xl" />
                </div>
                <div class="stat-title">Nombre de medias uploadés approuvés</div>
                <div class="stat-value">
                    {{ medias.filter((media) => media.approved).length }}
                </div>
<!--                <div class="stat-desc">↗︎ 400 (22%)</div>-->
            </div>

            <div class="stat">
                <div class="stat-figure text-primary">
                    <Icon name="pricetags" size="3xl" />
                </div>
                <div class="stat-title">Nombre de tags ajoutés</div>
                <div class="stat-value">
                    {{ medias.filter((media) => !media.approved).length }}
                </div>
<!--                <div class="stat-desc">↘︎ 90 (14%)</div>-->
            </div>
        </div>
    </AdminDashboardLayout>
</template>
