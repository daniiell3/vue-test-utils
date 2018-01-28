<template>
  <div class="confirm-cancel" v-if="isActive">
    <h3 class="confirm-cancel__title">Tem certeza que deseja cancelar o seu plano {{ item.plan.title.toUpperCase() }} ?</h3>
    <div
      class="confirm-cancel__dependents-wrap"
      v-if="item.dependents.length > 0"
    >
      <p class="confirm-cancel__dependents-wrap__label">Você também <span class="confirm-cancel__dependents-wrap__label--red">cancelará</span> os planos dos dependentes:</p>
      <ul class="confirm-cancel__dependents-wrap__items">
        <li
          v-for="(dependent, key) in item.dependents"
          :key="key"
          class="confirm-cancel__dependents-wrap__items__item"
        >{{ dependent }}</li>
      </ul>
    </div>
    <div class="confirm-cancel__actions">
      <div class="confirm-cancel__actions__action confirm-cancel__actions__action--no">
        <VButton
          label="Não quero cancelar"
          size="btn-large"
          bg="gray"
          :onClick="cancel" />
      </div>
      <div class="confirm-cancel__actions__action confirm-cancel__actions__action--yes">
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
