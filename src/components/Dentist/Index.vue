<template>
  <div
    v-if="isActive"
    class="c-dentist qa-dentist"
  >
    <div
      class="c-dentist__header"
      v-bind:style="{ backgroundColor: color }"
    >
      <h3 class="c-dentist__title qa-dentist__title">{{ name }}</h3>
      <p class="c-dentist__info qa-dentist__info">
        <span class="c-dentist__info--cro">{{ cro }}</span>
        {{ providerType }}
      </p>
    </div>
    <div class="c-dentist__body">
      <div class="c-dentist__specialties">
        <h4 class="c-dentist__specialties__title">Especialidades</h4>
        <ul class="c-dentist__specialties__items qa-dentist__specialties__items">
          <Specialty
            v-for="(specialty, key) in dentist.specialties"
            :key="key"
            :type="specialty.type"
            :title="specialty.title" />
        </ul>
      </div>
      <div class="c-dentist__address">
        <h5
          class="c-dentist__address__title"
          v-bind:style="{ color: color }"
        >Endereço</h5>
        <p class="c-dentist__address__info qa-dentist__address__info">{{ address }}</p>
        <p class="c-dentist__address__info qa-dentist__address__info">{{ postcode }}</p>
        <p class="c-dentist__address__info c-dentist__address__info--last qa-dentist__address__info--last">{{ city }}</p>
      </div>
      <div class="c-dentist__contact">
        <h5
          class="c-dentist__contact__title"
          v-bind:style="{ color: color }"
        >Contato</h5>
        <p class="c-dentist__contact__info qa-dentist__contact__info">{{ dentist.phone }}</p>
      </div>
      <div
        v-if="dentist.scheduleUrl"
        class="c-dentist__boaconsulta qa-dentist__boaconsulta"
      >
        <a
          :href="dentist.scheduleUrl"
          class="c-button waves-effect waves-light btn-large blue btn-boaconsulta"
          target="_blank"
          v-bind:style="{ backgroundColor: color }"
        >Agende sua consulta</a>
      </div>
    </div>
  </div>
</template>

<script src="./index.js"></script>

<style src="./index.css" lang="scss" scoped></style>
