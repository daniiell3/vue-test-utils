<template>
  <div v-if="title" class="plan">
    <span
      class="plan__label"
      v-if="label"
    >{{ label }}</span>
    <div class="plan__wrap">
      <img v-if="icon" class="plan__icon" :src="icon" />
      <h3 class="plan__title">{{ title }}</h3>
      <div class="plan__description" v-html="description"></div>
      <div class="plan__advantages">
        <h5 class="plan__advantages__title">Algumas das Vantagens</h5>
        <ul class="plan__advantages__items">
          <li
            class="plan__advantages__items__item"
            v-for="(advantage, key) in advantages"
            :key="key"
          >{{ advantage }}</li>
        </ul>
      </div>
      <span class="plan__price">
        <span class="plan__price--real">{{ real }},</span>
        <span class="plan__price--cents">{{ cents }}</span>
      </span>
    </div>
  </div>
</template>

<script src="./index.js"></script>

<style src="./index.css" lang="scss" scoped></style>
