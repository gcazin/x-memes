<script setup>
import PageLayout from '@/Layouts/PageLayout.vue';
import {Head, useForm} from '@inertiajs/vue3';
import DangerButton from "@/Components/DangerButton.vue";
import SecondaryButton from "@/Components/SecondaryButton.vue";
import Section from "@/Components/Section.vue";
import Text from "@/Components/Text.vue";
import AdminDashboardLayout from "@/Pages/Admin/Layout/AdminDashboardLayout.vue";
import Card from "@/Components/Card.vue";
import helperService from "@/Services/helper.service.js";

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
    form.patch(route('media.approve', id), {
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
    <Head title="Administration" />

    <AdminDashboardLayout title="Dashboard">
        <div class="stats shadow w-full bg-base-300">
            <div class="stat">
                <div class="stat-figure text-primary">
                    <ion-icon class="text-3xl" name="people-outline"></ion-icon>
                </div>
                <div class="stat-title">Nombre d'utilisateurs inscrits</div>
                <div class="stat-value">
                    {{ users.length }}
                </div>
<!--                <div class="stat-desc">Jan 1st - Feb 1st</div>-->
            </div>
            <div class="stat">
                <div class="stat-figure text-primary">
                    <ion-icon class="text-3xl" name="images-outline"></ion-icon>
                </div>
                <div class="stat-title">Nombre de medias uploadés approuvés</div>
                <div class="stat-value">
                    {{ medias.filter((media) => media.approved).length }}
                </div>
<!--                <div class="stat-desc">↗︎ 400 (22%)</div>-->
            </div>

            <div class="stat">
                <div class="stat-figure text-primary">
                    <ion-icon class="text-3xl" name="pricetags-outline"></ion-icon>
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
