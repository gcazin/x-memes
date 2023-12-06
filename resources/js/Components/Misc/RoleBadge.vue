<script setup>

import Tag from "@/Components/Misc/Tag.vue";
</script>
<template>
    <Tag
        v-for="(role) in $page.props.auth.user.roles"
        size="xl"
        outline
    >{{ role.name }}</Tag>
</template>
