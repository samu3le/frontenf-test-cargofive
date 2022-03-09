<template>

<h1>Lista Articulos</h1>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <div class="row">
            <div class="col">
              <div class="d-flex justify-content-between gap-2">
                <ButtonCustom
                  :classesNames="{
                    btn_custom:
                      'btn btn-outline-primary d-flex align-items-center gap-2',
                  }"
                  type="button"
                  text="Cargar todos los  articulos"
                  icon="rotate-cw"
                  :loading="listFetchingData"
                  @click="getList"
                />
                <ButtonCustom
                  :classesNames="{
                    btn_custom:
                      'btn btn-outline-primary d-flex align-items-center gap-2',
                  }"
                  type="button"
                  text="Scrapping Articulos"
                  icon="rotate-cw"
                  :loading="listScrappArticle"
                  @click="getArticles"
                />
              </div>
              <div class="card-subtitle">
                <div class="row m-5">
                  <div class="col-6">
                    <label
                      for="author"
                      class="form-label fw-bold"
                    >
                      Autor
                    </label>
                    <select name="authors" class="form-control" v-model="formValues.author" v-on:change="getByAuthor($event)">
                      <option value="" disabled>Please Choose One</option>
                      <option
                        v-for="authors in listAuthorsData"
                        :value="authors.author">
                        {{authors.author}}
                      </option>
                    </select>
                  </div>
                  <div class="col-6">
                    <label
                      for="category"
                      class="form-label fw-bold"
                    >
                      Categoria
                    </label>
                    <select name="categories" class="form-control" v-model="formValues.category" v-on:change="getByCategory($event)">
                      <option value="" disabled>Please Choose One</option>
                      <option 
                        v-for="categories in listCategoriesData"
                        :value="categories.name">
                        {{categories.name}}
                      </option>
                    </select>
                  </div>  
                </div>
              </div>
              <div class="card-content collapse show">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-12">
                      <div v-for="article in listData" :key="article.id" class="mb-5">
                        <template v-if="article?.article">
                          <div v-for="data in article.article">
                            <div class="card mb-5">
                              <h5 class="card-header">{{data.title}}</h5>
                              <div class="card-body">
                              
                              <div class="card-subtitle mb-2 text-muted">
                                  <span>
                                  Autor: {{data.author}} | 
                                  </span>
                                  <span>             
                                  Publicado en: {{data.published_at}} 
                                  </span>
                              </div>
                                  <p class="card-text">{{data.body_description}}</p>
                                  <a :href="data.source_link" class="btn btn-primary" target="_blank" rel="noopener noreferrer">Visitar Articulo</a>
                              </div>
                            </div> 
                          </div>   
                        </template>
                        <template v-else>
                          <div class="card">
                            <h5 class="card-header">{{article.title}}</h5>
                            <div class="card-body">
                            <h5>
                                <span 
                                v-for="category in article?.category"
                                :key="category.id"
                                class="card-title mb-2 text-muted">
                                {{category?.name}} | 
                                </span>
                            </h5>
                            <div class="card-subtitle mb-2 text-muted">
                                <span>
                                Autor: {{article.author}} | 
                                </span>
                                <span>             
                                Publicado en: {{article.published_at}} 
                                </span>
                            </div>
                                <p class="card-text">{{article.body_description}}</p>
                                <a :href="article.source_link" class="btn btn-primary" target="_blank" rel="noopener noreferrer">Visitar Articulo</a>
                            </div>
                          </div> 
                        </template>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>      
  </div> 






</template>

<script>
import vSelect from 'vue-select'
import { ref, reactive, onBeforeMount } from "vue";

import ButtonCustom from "@/components/Button.vue";
import { getErrorsFromYup } from "@/helpers";

import useArticle from "@/composables/useArticle";

export const props = {};

export default {
  name: "CreateProduct",
  emits: ["finish_success"],
  props,
  components: {
    'v-select': vSelect,
    ButtonCustom,
  },
  setup(props, { emit, attrs }) {

    const {
      listFetchingData,
      listErrors,
      listData,
      getList,
      scrappArticles,
      listScrappArticle,

      categoriesFetchingData,
      listCategoriesErrors,
      listCategoriesData,
      getCategories,
      authorsFetchingData,
      listAuthorsErrors,
      listAuthorsData,
      getAuthors,
      getListByCategory,
      getListByAuthor,
    } = useArticle();

    onBeforeMount(() => {
      getList();
      getCategories();
      getAuthors();
    });

    const getArticles = async ()=>{
      await scrappArticles();
      getList();
    }

    let formValues = reactive({
      author : '',
      category : '',
    });

    const formValuesErrors = ref({});

    const getByAuthor = (event) => {
      const author = event.target.value;
      getListByAuthor({author}); 
    }

    const getByCategory = (event) => {
      const name = event.target.value;
      getListByCategory({name}); 
    }

    return {
      formValues,
      formValuesErrors,
      listFetchingData,
      listErrors,
      listData,
      getList,
      scrappArticles,
      listScrappArticle,
      getArticles,
      listCategoriesData,
      listAuthorsData,
      getListByCategory,
      getListByAuthor,
      getByAuthor,
      getByCategory,
    };
  },
};
</script>

<style></style>
