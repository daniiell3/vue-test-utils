<template>
  <div
    v-if="isActive"
    class="c-confirm-cancel"
  >
    <h3 class="c-confirm-cancel__title qa-confirm-cancel__title">{{ finalTitle }}</h3>
    <div
      v-if="dependentsExists"
      class="c-confirm-cancel__dependents-wrap qa-confirm-cancel__dependents-wrap"
    >
      <p class="c-confirm-cancel__dependents-wrap__label">Você também <span class="c-confirm-cancel__dependents-wrap__label--red">cancelará</span> os planos dos dependentes:</p>
      <ul class="c-confirm-cancel__dependents-wrap__items qa-confirm-cancel__dependents-wrap__items">
        <li
          v-for="(dependent, key) in dependents"
          :key="key"
          class="c-confirm-cancel__dependents-wrap__items__item"
        >{{ dependent }}</li>
      </ul>
    </div>
    <div class="c-confirm-cancel__actions">
      <div class="c-confirm-cancel__actions__action c-confirm-cancel__actions__action--no qa-confirm-cancel__actions__action--no">
        <VButton
          label="Não quero cancelar"
          size="btn-large"
          bg="gray"
          :onClick="cancel" />
      </div>
      <div class="c-confirm-cancel__actions__action c-confirm-cancel__actions__action--yes qa-confirm-cancel__actions__action--yes">
        <VButton
          label="Sim, quero cancelar"
          size="btn-large"
          bg="red"
          :onClick="proceed" />
      </div>
    </div>
  </div>
</template>

<script src="./index.js"></script>

<style src="./index.css" lang="scss" scoped></style>
