<template>
  <div
    v-if="isActive"
    ref="dentist"
    class="an-dentist"
  >
    <div
      class="an-dentist__header"
      v-bind:style="{ backgroundColor: color }"
    >
      <h3 class="an-dentist__h-title">{{ name }}</h3>
      <p class="an-dentist__h-info">
        <span class="an-dentist__h-info--cro">{{ cro }}</span>
        {{ providerType }}
      </p>
    </div>
    <div class="an-dentist__body">
      <div class="an-dentist__b-specialties">
        <h4 class="an-dentist__b-specialties__title">Especialidades</h4>
        <ul class="an-dentist__b-specialties__items">
          <Specialty
            v-for="(specialty, key) in dentist.specialties"
            :key="key"
            :type="specialty.type"
            :title="specialty.title" />
        </ul>
      </div>
      <div class="an-dentist__b-address">
        <h5
          class="an-dentist__b-address__title"
          v-bind:style="{ color: color }"
        >Endereço</h5>
        <p class="an-dentist__b-address__info">{{ address }}</p>
        <p class="an-dentist__b-address__info">{{ postcode }}</p>
        <p class="an-dentist__b-address__info an-dentist__b-address__info--last">{{ city }}</p>
      </div>
      <div class="an-dentist__b-contact">
        <h5
          class="an-dentist__b-contact__title"
          v-bind:style="{ color: color }"
        >Contato</h5>
        <p class="an-dentist__b-contact__info">{{ dentist.phone }}</p>
      </div>
      <div
        v-if="dentist.scheduleUrl"
        class="an-dentist__b-boaconsulta"
      >
        <a
          :href="dentist.scheduleUrl"
          class="an-button waves-effect waves-light btn-large blue btn-boaconsulta"
          target="_blank"
          v-bind:style="{ backgroundColor: color }"
        >Agende sua consulta</a>
      </div>
    </div>
  </div>
</template>

<script src="./index.js"></script>

<style src="./index.css" lang="scss" scoped></style>
