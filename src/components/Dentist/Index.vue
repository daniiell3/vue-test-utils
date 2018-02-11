<template>
  <div
    v-if="isActive"
    ref="dentist"
    class="c-dentist qa-dentist"
  >
    <div
      class="c-dentist__header"
      v-bind:style="{ backgroundColor: color }"
    >
      <h3 class="c-dentist__h-title qa-dentist__h-title">{{ name }}</h3>
      <p class="c-dentist__h-info qa-dentist__h-info">
        <span class="c-dentist__h-info--cro">{{ cro }}</span>
        {{ providerType }}
      </p>
    </div>
    <div class="c-dentist__body">
      <div class="c-dentist__b-specialties">
        <h4 class="c-dentist__b-specialties__title">Especialidades</h4>
        <ul class="c-dentist__b-specialties__items qa-dentist__b-specialties__items">
          <Specialty
            v-for="(specialty, key) in dentist.specialties"
            :key="key"
            :type="specialty.type"
            :title="specialty.title" />
        </ul>
      </div>
      <div class="c-dentist__b-address">
        <h5
          class="c-dentist__b-address__title"
          v-bind:style="{ color: color }"
        >Endereço</h5>
        <p class="c-dentist__b-address__info qa-dentist__b-address__info">{{ address }}</p>
        <p class="c-dentist__b-address__info qa-dentist__b-address__info">{{ postcode }}</p>
        <p class="c-dentist__b-address__info c-dentist__b-address__info--last qa-dentist__b-address__info--last">{{ city }}</p>
      </div>
      <div class="c-dentist__b-contact">
        <h5
          class="c-dentist__b-contact__title"
          v-bind:style="{ color: color }"
        >Contato</h5>
        <p class="c-dentist__b-contact__info qa-dentist__b-contact__info">{{ dentist.phone }}</p>
      </div>
      <div
        v-if="dentist.scheduleUrl"
        class="c-dentist__b-boaconsulta qa-dentist__b-boaconsulta"
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
