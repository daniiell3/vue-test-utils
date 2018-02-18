<template>
  <div v-if="title" class="c-plan">
    <span
      v-if="label"
      class="c-plan__label qa-plan__label"
    >{{ label }}</span>
    <div class="c-plan__wrap">
      <img
        v-if="icon"
        class="c-plan__icon qa-plan__icon"
        :src="icon" />
      <h3 class="c-plan__title qa-plan__title">{{ title }}</h3>
      <div
        v-if="description"
        class="c-plan__description qa-plan__description"
        v-html="description" />
      <div
        v-if="advantages"
        class="c-plan__advantages qa-plan__advantages"
      >
        <h5 class="c-plan__advantages__title">Algumas das Vantagens</h5>
        <ul class="c-plan__advantages__items qa-plan__advantages__items">
          <li
            class="c-plan__advantages__item"
            v-for="(advantage, key) in advantages"
            :key="key"
          >{{ advantage }}</li>
        </ul>
      </div>
      <span class="c-plan__price qa-plan__price">
        <span class="c-plan__price--real">{{ real }},</span>
        <span class="c-plan__price--cents">{{ cents }}</span>
      </span>
    </div>
  </div>
</template>

<script src="./index.js"></script>

<style src="./index.css" lang="scss" scoped></style>
