<template>
    <web-view :src="href"></web-view>
</template>
<script>
export default {
    data() {
        return {
            href: '' 
        }
    },
    onLoad(option) {
        if (option.href) {
            this.href = option.href
        }
    }
}
</script>