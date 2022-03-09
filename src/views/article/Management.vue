<template>

<h1>Test</h1>

      <div class="mb-5">
        <label
          for="category"
          class="form-label"
        >
          Category
        </label>
        <v-select
          id="category"
          v-model="formValues.category"
          :options="categories"
        />
        <div 
          :class="[
            (
              formValuesErrors?.role?.length ? 'invalid-feedback-custom-label ' : ''
            ),
          ]"
          v-if="formValuesErrors?.role?.length"
          >
          <ul>
            <li v-for="(item, index) in formValuesErrors.role" :key="index" :value="item">
              {{ item }}
            </li>
          </ul>
        </div>
      </div>

    <div v-for="article in listData" :key="article.id" class="mb-5">
        <div class="card">
        <h5 class="card-header">{{article.title}}</h5>
        <div class="card-body">
        <h5>
            <span 
            v-for="category in article.category"
            :key="category.id"
            class="card-title mb-2 text-muted">
            {{category.name}} | 
            </span>
        </h5>
        
        <div class="card-subtitle mb-2 text-muted">
            <span>
            
            Author: {{article.author}} | 
            </span>
            <span> 
            
            Published At: {{article.published_at}} 
            </span>
            
        
        </div>


            <p class="card-text">{{article.body_description}}</p>
            <a :href="article.source_link" class="btn btn-primary" target="_blank" rel="noopener noreferrer">Visitar Articulo</a>
        </div>
        </div>
    </div>
</template>

<script>
import vSelect from 'vue-select'

import { ref, reactive, onBeforeMount } from "vue";

import { getErrorsFromYup } from "@/helpers";

import useArticle from "@/composables/useArticle";

export const props = {};

export default {
  name: "CreateProduct",
  emits: ["finish_success"],
  props,
  components: {
    'v-select': vSelect,
  },
  setup(props, { emit, attrs }) {

    const {
        listFetchingData,
        listErrors,
        listData,
        listParams,
        setParams,
        getList,
        setStateChange,
    } = useArticle();

    onBeforeMount(() => {
      getList();
    });

    let formValues = reactive({
      nickname: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    });

    const formValuesErrors = ref({});

    const categories = ref([
      {
        code: 'innovacion',
        label: "Innovation",
      },
      {
        code: 'logistica-internacional',
        label: "International Logistics",
      },
    ]);

    return {
        formValues,
        formValuesErrors,
        listFetchingData,
        listErrors,
        listData,
        listParams,
        setParams,
        getList,
        setStateChange,
        categories,
    };
  },
};
</script>

<style></style>
