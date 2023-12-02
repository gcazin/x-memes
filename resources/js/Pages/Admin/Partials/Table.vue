<script setup>
defineProps({
    headers: {
        type: Array,
        required: true,
    },
    items: {
        type: [Object, Array],
        required: true
    },
    properties: {
        type: Array,
        required: true,
    },
    hasAction: {
        type: Boolean,
        required: false,
        default: false
    }
})
</script>
<template>
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-gray-700 uppercase dark:text-gray-400 border-b border-gray-700">
        <tr>
            <th
                v-for="(header, index) in headers"
                :key="index"
                scope="col"
                class="px-6 py-3"
            >
                {{ header }}
            </th>
            <th v-if="hasAction" scope="col" class="px-6 py-3 text-right">
                Actions
            </th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-if="items.length"
            class="bg-white dark:bg-gray-900 dark:border-gray-700"
            v-for="(item, index) in items"
        >
            <td v-if="properties" v-for="(property) in properties" class="px-6 py-4">
                <slot v-if="property === 'increment'" :name="property" v-bind="item">
                    {{ index + 1 }}
                </slot>
                <slot v-else :name="property" v-bind="item">
                    {{ property in item ? item[property] : item }}
                </slot>
            </td>
            <td v-else class="px-6 py-4">
                {{ item }}
            </td>
            <td v-if="hasAction" class="px-6 py-4 text-right">
                <template v-if="properties">
                    <slot name="actions" v-bind="item" />
                </template>
                <template v-else>
                    <slot name="actions" v-bind="item" />
                </template>
            </td>
        </tr>
        <tr v-else class="bg-white dark:bg-gray-900 dark:border-gray-700">
            <td class="px-6 py-4">
                Aucune donnée à afficher.
            </td>
        </tr>
        </tbody>
    </table>
</template>
