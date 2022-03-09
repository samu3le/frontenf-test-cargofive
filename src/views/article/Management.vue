<template>

<h1>Lista Articulos</h1>

  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <div class="row">
            <div class="col">
              <div class="d-flex justify-content-start gap-2">
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
                    <select name="authors" class="form-control">
                      <option enhabled="true">select</option>
                      <option v-for="authors in listAuthorsData" v-bind:value="authors">{{authors.author}}</option>
                    </select>
                  </div>
                  <div class="col-6">
                    <label
                      for="category"
                      class="form-label fw-bold"
                    >
                      Categoria
                    </label>
                    <select name="categories" class="form-control">
                      <option enhabled="true">select</option>
                      <option v-for="categories in listCategoriesData" v-bind:value="categories">{{categories.name}}</option>
                    </select>
                  </div>  
                </div>
              </div>
              <div class="card-content collapse show">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-12">

                      <div v-for="article in listData?.article ?? listData" :key="article.id" class="mb-5">
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
      nickname: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    });

    const formValuesErrors = ref({});

    const dataToSelect = async (listData) => {
      const list_select = [];
      for(const data of listData){
        await list_select.push({
          code: data?.authors ?? data?.name,
          label: data?.authors ?? data?.name,
        });
      }
      return list_select;
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
    };
  },
};
</script>

<style></style>
