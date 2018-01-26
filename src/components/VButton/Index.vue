<template>
  <button
    @click.prevent="handleClick"
    :class="[{'arrow-right': arrowRight}, btn, effect, size, bg]"
    :disabled="disabled"
  >
    <span>{{ label }}</span>
  </button>
</template>

<script src="./index.js"></script>

<style src="./index.css" lang="scss" scoped></style>
