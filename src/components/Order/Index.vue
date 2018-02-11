<template>
  <li
    class="c-orders__item qa-orders__item"
    v-bind:class="{disabled: isDisabled}"
  >
    <div class="c-orders__item__plan">
      <img
        class="c-orders__item__plan__icon qa-orders__item__plan__icon"
        :src="plan.icon" />
      <h4 class="c-orders__item__plan__title qa-orders__item__plan__title">{{ plan.title }}</h4>
    </div>
    <div
      v-if="actionsActive"
      class="c-orders__item__actions qa-orders__item__actions"
    >
      <div class="c-orders__item__actions__documents qa-orders__item__actions__documents">
        <a
          class="btn a-btn waves-effect waves-light"
          :href="documents.proposal"
          target="_blank"
        ><span>Ver Proposta</span></a>
      </div>
      <div class="c-orders__item__actions__documents qa-orders__item__actions__documents">
        <a
          class="btn a-btn waves-effect waves-light"
          :href="documents.contract"
          target="_blank"
        ><span>Ver Contrato</span></a>
      </div>
      <div
        v-if="isComplete"
        class="c-orders__item__actions__cancel-plan qa-orders__item__actions__cancel-plan" 
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
      class="c-orders__item__canceled-text qa-orders__item__canceled-text"
    >Plano Cancelado</span>
    <div class="c-orders__item__life-main">
      <span class="c-orders__item__life-main__title">Titular</span>
      <span class="c-orders__item__life-main__name qa-orders__item__life-main__name">{{ beneficiaries.main }}</span>
    </div>
    <div class="c-orders__item__dependents">
      <span class="c-orders__item__dependents__title">Dependentes</span>
      <ul
        v-if="dependentsExists"
        class="c-orders__item__dependents__items qa-orders__item__dependents__items"
      >
        <li
          class="c-orders__item__dependents__items__item"
          v-for="(dependent, key) in beneficiaries.dependents"
          :key="key"
        >{{ dependent }}</li>
      </ul>
      <span
        v-if="!dependentsExists"
        class="c-orders__item__dependents__items__item qa-orders__item__dependents__items__item"
      >Sem Dependentes</span>
    </div>
  </li>
</template>

<script src="./index.js"></script>

<style src="./index.css" lang="scss" scoped></style>
