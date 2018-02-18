<template>
  <li
    class="c-orders qa-orders"
    v-bind:class="{disabled: isDisabled}"
  >
    <div class="c-orders__plan">
      <img
        class="c-orders__icon qa-orders__icon"
        :src="plan.icon" />
      <h4 class="c-orders__title qa-orders__title">{{ plan.title }}</h4>
    </div>
    <div
      v-if="actionsActive"
      class="c-orders__actions qa-orders__actions"
    >
      <div class="c-orders__documents qa-orders__documents">
        <a
          class="btn a-btn waves-effect waves-light"
          :href="documents.proposal"
          target="_blank"
        ><span>Ver Proposta</span></a>
      </div>
      <div class="c-orders__documents qa-orders__documents">
        <a
          class="btn a-btn waves-effect waves-light"
          :href="documents.contract"
          target="_blank"
        ><span>Ver Contrato</span></a>
      </div>
      <div
        v-if="isComplete"
        class="c-orders__cancel-plan qa-orders__cancel-plan"
      >
        <VButton
          label="Cancelar Plano"
          :onClick="handleCancel"
          eventData=""
          bg="gray" />
      </div>
    </div>
    <span
      v-if="isDisabled"
      class="c-orders__canceled-text qa-orders__canceled-text"
    >Plano Cancelado</span>
    <div class="c-orders__main">
      <span class="c-orders__main__title">Titular</span>
      <span class="c-orders__main__name qa-orders__main__name">{{ beneficiaries.main }}</span>
    </div>
    <div class="c-orders__dependents">
      <span class="c-orders__dependents__title">Dependentes</span>
      <ul
        v-if="dependentsExists"
        class="c-orders__dependents__items qa-orders__dependents__items"
      >
        <li
          class="c-orders__dependents__item"
          v-for="(dependent, key) in beneficiaries.dependents"
          :key="key"
        >{{ dependent }}</li>
      </ul>
      <span
        v-if="!dependentsExists"
        class="c-orders__dependents__item qa-orders__dependents__item"
      >Sem Dependentes</span>
    </div>
  </li>
</template>

<script src="./index.js"></script>

<style src="./index.css" lang="scss" scoped></style>
