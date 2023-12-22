<script setup>
import { computed } from 'vue'

const props = defineProps({
    badge: {
        type: Array,
        required: true,
    },
})

console.log(props.badge)
const iconType = computed(() => {
    return {
        // 'create': 'add',
        role: 'icon-blue',
        media: 'icon-grey',
        seniority: 'icon',
    }[props.badge.type.name]
})
</script>

<template>
    <div class="text-center">
        <div class="badge-hover">
            <div :class="`badge-icon badge-${iconType}`">
                <img
                    :src="`/images/${badge.path}`"
                    class="mx-auto"
                    width="80"
                />
            </div>
        </div>
        <div class="mt-2">
            <div class="text-lg">{{ badge.name }}</div>
            <div>{{ badge.description }}</div>
        </div>
    </div>
</template>

<style scoped>
.badge-icon::after,
.badge-icon::before,
.badge-modal_sprite1,
.badge-modal_sprite2,
.badge-modal_sprite3 {
    background-image: url(/public/images/badges/badges.png);
    width: 160px;
    height: 160px;
}

.badge-placeholder {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFcAAABXCAYAAABxyNlsAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MjZEMDU1MjZENzU4MTFFMUEyMjdFNUQxRTAzQTI3RDIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MjZEMDU1MjdENzU4MTFFMUEyMjdFNUQxRTAzQTI3RDIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyNkQwNTUyNEQ3NTgxMUUxQTIyN0U1RDFFMDNBMjdEMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoyNkQwNTUyNUQ3NTgxMUUxQTIyN0U1RDFFMDNBMjdEMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqEyGecAAAglSURBVHja5J2Jcts4DIZBSnbiHE7S9Mhm2t3Z93+wbqdNmqQ5bEuyVugCa5imDtugLNmc4UiZ1hL1CfwJXpDJ8xwwGWNgxykq8nGRj4o8oBxj0Shbyljgucgp5VmRp5SztgvPHGUyO4SLoE4pI9QhgWN4IP4GcVwqvzjKc4Q9KfJLkV/F9fYaLt7kvMjjIp8IkO6xCVj3uhKwFdaO6a3Iz5TzfYOLVfwdgTVOtXbh5g6AsnNTcS6lxJUUBPxY5KTvcLGqvy/yGT1YRhAzRzvzEkstA1smDT6pkHANabshubjXgtwm3JigXohGZy7gukB9FrtS/gqwdVLhAx3R8ZkgZ32Ai9X/ms4zkaXFVgHV0ETTAHQkIOPfP0kuOgkXJeCWjmkJ1HmNpoZsSF3Q1gMZJeL7JlIREu5lkT8SqNSBu0uo60Jm0GjFT7uGiz+6Idcq9Vis1NddQq2DbB0tjshHvmtaXm24WIDP1KNKHbhdhdoUckSNMj7PtyaNnSZc9Fu/UCEkWJ+1dhFqlTsnrTim8v9DzxccLjZYf1JBkhIpgB6B9VmxKxFAFpyEhDsgsFaAlVKQ9xBqnRWzRECVBW8LF2/yl3BZ9hFsHWB8tq++gSAfXLvGzT4fCFi3+81+ekocPtb0DNeGe1PhFewb2DrAMfVCVeBeVvix+wq2CjDmExrh2wrukKrBIYKts+ALauA3hnvr6dIeEtgywJyvq34U18jBkBownx8bCqyh+47oGMPyXBq/3IzKhnNnEzrmgQHz/Y1wTcdl4xBlrhh6BX/TBWdODywP9BA4j4aD6qdU+LIpH/AMvvD/eaUxgWlgN82IHhyy+lpwzJrCvSHBngnLTQPJAVroFXkjvqmfpnDllA6W+5EsOqQPzHAnBcf7JnCHZLWJsNpMDF5ogR2QZo08o2huDckbPqw7NjCl4cM0EGAeosRn+VawTOrg3lLVnDljB5pygNX/A6xO/fhmKtaF68404PkDyUUIeeDe27RgeVfVoA2EHPjcLo0C8YRl5uR8TYt1W3IXci4enhvnB2VJk+7ZqDDQuACclsF9t2HVbAr2E8lA2gDsNu4Sw7XimiMCfacEWN6Hy39OMrTi5/KCjSyA1TLY45IutHYNyZ3rcoPM6ydMQOs1Prjugg1Nq30vGq6korcXwjeV3VYGfBGgc8HnJz64Y48VaTz0GWXfNFBIsFDSq8roRZ8o34PvM1qCW1iypZvN12yp61JMXkEG/onLNpMLeFzTQ93Ueo9YGthyT8G/vAgU5GDeAbA+wDkB1rZebjyX4Pq8hG0AjyjPW9LXTXR4SD1DTbBzvqYV/fpcCSqnK4+GdwkuH88CWO/wtyYW8hDRHzNFSTiinLTceK0L2JD3wM+vBRe5WltitdtCOHcajy6B9fqnAXR3aMnCfFV2UxjG0XBNqYEAVTgnBkbhevJ8wCM6dUN766RhRWcEOgqYx1U0rxlbcVEtAKMAjWMbgIfK17W84EGzqzvsgST4pCFWvCamSG7E0LLeAXR/daMXhvI1jYXlOSiNFCnqd5uAjfLLsq7lakCxPQMrvRwtsP+DMD2qwl2HuyILIXWsTy9Lu6y5Bf0RqgxWN9wdLNxcuWpkPZUFTSMzDDcD/xaiTVOicI1dpEwJKj/3HOFqL5iYKb2kthszbQ4ZL/0xijCmUL6jvMteQqL9sly4GjCmjpvXZQs2AeCaMsvVanVfewBWwpgG8BaWLFdTJ59hOcZB1y13EuCaCa5tyowxiae3ZrZ4m1N6aZFjwXkHwaZKkiDZZQXXOffQJrC6SnDb9AjLQSNMB63WkoRpv7AZNzqYXgJU4wll61y7S2AT0JmYrIT76vyjFoQHWA3kYzoCltuGYBr++yaoD/BfeCir7EKlBDjqkDww3BfFrrrkNctpRbkcFQshDXzdVwHXQvOdm9pJLuefBLLaN3kzTr9gMSKv2algeZjtGLAVOvusDFUeJz64HNAsCmC9eO07erCo5UZObkJJhREFsdpcbF+3HvfJeOAaRcD4ZuOWdFhu6cea86QM1u18LW1qcaeTE9JHXOIUYmo8FxIxdgqnuYDEeLyCSeAXOHU3+vl0776kYdO0LnyBP2Cxxd46crGJJPki3rG3Enqzn/HpeNkOStypPoJw+9BkwnVa5wRZax9aSi9wBuGS3IeGVvvYFC7+4Ivod89Bfwelm3gz9ZG4zzpwQbhYCYRNcgclnv+gvkIjuJhwx8slhN/76yu4jPwcO1bJDyG3QM2c8rUBlvf+ohy8bBJA6BaWY4d1fdVim6NpPHN+R71cr2Ndlb57Ghvtxq1vYGWH5LGu11KVUBJ+Oj7poQJ2wT5BzaRmky7oE7W8sadXZQ4MLMvBRI4hlP6oYdA2jjYae/Q3dAPXNbAZ1ealZ9aIiPcHnR9KMCEXbE6drEYR8daN5RiTBR8CYBcs9169Y8BaUUjR//y054B9YCvDuWjGz40JsIH9j0KaE9jKWYsQkZ8/iDGBfYyfywM/tSsgQ8Usx8gbJx7AfY/8PIE1xn9DRtvHHZNXsAhN2OeY5Xj81cSPbQsuN3TXQib6GG0/pS7t2stJ2/rCyRiWQ7r04TsRmF5gi9hjbX6bBxu7C1iEdunyF04mJANbLdvfxVelOErnCLr3bR4cWH8GpRXlu/weGurwOSziGuzqq1JADZXmapudw5UPzGGnjqD8I3NV30WrcqPco1w1/kYSsHdf8iuDcgyL709GoPclP7TKGSwCFwfX9a7BdZMlyDx3Jr9VJlt1NxISu33yK6qth9bywf1XgAEAenSlp6DjETQAAAAASUVORK5CYII=);
    width: 87px;
    height: 87px;
    margin: 0 auto;
}

.badge-icon {
    width: 160px;
    height: 160px;
    position: relative;
    background-image: url(/public/images/badges/badges.png);
}

.badge-icon::after,
.badge-icon::before {
    transition: transform 0.3s;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
}

.badge-icon img {
    transition: 0.3s;
    position: absolute;
    z-index: 3;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.badge-icon-grey {
    background-position: 0 -480px;
}

.badge-icon-grey::before {
    background-position: 0 -640px;
}

.badge-icon-grey::after {
    background-position: 0 -800px;
}

.badge-icon-blue::before {
    background-position: 0 -160px;
}

.badge-icon-blue::after {
    background-position: 0 -320px;
}

.badge-hover {
    flex: none;
    width: 90px;
    height: 90px;
    margin-left: auto;
    margin-right: auto;
}

.badge-hover .badge-icon {
    transition: 0.3s;
    transform: translate(-35px, -35px) scale(0.6);
}

.badge-hover:hover .badge-icon {
    transform: translate(-35px, -35px) scale(0.7);
}

.badge-hover:hover .badge-icon::before {
    transform: scale(0.93);
}

.badge-hover:hover .badge-icon::after {
    transform: scale(0.95);
}
</style>
