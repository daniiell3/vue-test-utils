<template>
  <li
    class="orders__item"
    v-bind:class="{disabled: disabled}"
  >
    <div class="orders__item__plan">
      <img class="orders__item__plan__icon" :src="item.plan.icon">
      <h4 class="orders__item__plan__title">{{ item.plan.title }}</h4>
    </div>
    <div class="orders__item__actions" v-if="item.orderStatus === 'complete' || item.orderStatus === 'payment_review'">
      <div class="orders__item__actions__proposal">
        <a
          class="btn a-btn waves-effect waves-light"
          :href="item.plan.proposalUrl"
          target="_blank"
        ><span>Ver Proposta</span></a>
      </div>
      <div class="orders__item__actions__proposal">
        <a
          class="btn a-btn waves-effect waves-light"
          :href="item.plan.contractUrl"
          target="_blank"
        ><span>Ver Contrato</span></a>
      </div>
      <div
        class="orders__item__actions__cancel-plan"
        v-if="item.orderStatus === 'complete'"
      >
        <VButton
          label="Cancelar Plano"
          :onClick="handleCancel"
          :eventData="item"
          bg="gray" />
      </div>
    </div>
    <span class="orders__item__canceled-text" v-if="disabled">Plano Cancelado</span>
    <div class="orders__item__life-main">
      <span class="orders__item__life-main__title">Titular</span>
      <span class="orders__item__life-main__name">{{ item.main }}</span>
    </div>
    <div class="orders__item__dependents">
      <span class="orders__item__dependents__title">Dependentes</span>
      <ul
        class="orders__item__dependents__items"
        v-if="item.dependents.length > 0"
      >
        <li
          class="orders__item__dependents__items__item"
          v-for="(dependent, key) in item.dependents"
          :key="key"
        >{{ dependent }}</li>
      </ul>
      <span
        class="orders__item__dependents__items__item"
        v-if="item.dependents.length < 1"
      >Sem Dependentes</span>
    </div>
  </li>
</template>

<script src="./index.js"></script>

<style src="./index.css" lang="scss" scoped></style>
