<template>
    <header class="bg-white shadow">
        <div class="max-w-8xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 v-if="title" class="text-3xl font-bold text-gray-900">
                {{ title }}
            </h1>
            <slot name="header"></slot>
        </div>
    </header>
    <main>
        <div class="max-w-8xl mx-auto sm:px-4 lg:px-8">
            <!-- Replace with your content -->
            <div class="px-2 sm:px-0">
                <slot></slot>
            </div>
            <!-- /End replace -->
        </div>
    </main>
</template>

<script setup>
const props = defineProps({
    title: String,
});
</script>

<style>
 
</style>