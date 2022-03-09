<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <div class="row">
            <div class="col">
              <h4 class="card-title">Listado Usuarios</h4>
            </div>
            <div class="col">
              <div class="d-flex justify-content-end gap-2">
                <ButtonCustom
                  :classesNames="{
                    btn_custom:
                      'btn btn-outline-primary d-flex align-items-center gap-2',
                  }"
                  type="button"
                  text="Nuevo"
                  icon="plus"
                  @click="modalEvent"
                />
                <ButtonCustom
                  :classesNames="{
                    btn_custom:
                      'btn btn-outline-primary d-flex align-items-center gap-2',
                  }"
                  type="button"
                  text="Actualizar"
                  icon="rotate-cw"
                  :loading="listFetchingData"
                  @click="getList"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="card-content collapse show">
          <div class="card-body">
            <div class="row">
              <div class="col-md-12">
                <TableCustom
                  :columns="[
                    {
                      label: 'N°',
                      field: 'id',
                    },
                    {
                      label: 'Nombre',
                      field: 'name',
                      type: 'text',
                    },
                    {
                      label: 'Email',
                      field: 'email',
                      type: 'text',
                    },
                    {
                      label: 'Estado',
                      field: 'is_active',
                      type: 'custom',
                    },
                    {
                      label: 'Creado',
                      field: 'created_at',
                      type: 'date',
                    },
                    {
                      label: 'Accion',
                      field: 'Actions',
                      type: 'custom',
                    },
                  ]"
                  :list="listData"
                  @update="updateList"
                >
                  <template
                    v-slot:custom="{ dataRow, dataField, dataFieldExact }"
                  >
                    <div v-if="dataField == 'is_active'">
                      <div class="form-check form-switch">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          :checked="dataRow.is_active"
                          @click.stop.prevent="
                            state_change({
                              active: $event.target.checked,
                              id: dataRow?.id,
                            })
                          "
                        />
                      </div>
                    </div>
                    <div v-else-if="dataField === 'Actions'">
                      <div class="btn-group" role="group" aria-label="">
                        <button
                          v-on:click="modalEventUpdate(dataRow)"
                          class="btn btn-outline-info"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-pencil-square"
                            viewBox="0 0 16 16"
                          >
                            <path
                              d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                            />
                            <path
                              fill-rule="evenodd"
                              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div v-else>
                      {{ dataFieldExact }}
                    </div>
                  </template>
                </TableCustom>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Create ref="modal_create" @finish_success="getList" />
    <Update ref="modal_update" @finish_success="getList" />
  </div>
</template>

<script>
import { ref, onBeforeMount } from "vue";

import TableCustom from "@/components/Table.vue";
import ButtonCustom from "@/components/Button.vue";
import Create from "./Create.vue";
import Update from './Update.vue';

import useUser from "@/composables/useUser";
import { useSwal } from "@/composables/useSwal";

export default {
  name: "ProductManagement",
  components: {
    TableCustom,
    ButtonCustom,
    Create,
    Update,
  },
  setup() {
    const Swal = useSwal();

    const {
      listFetchingData,
      listErrors,
      listData,
      listParams,
      setParams,
      getList,
      setStateChange,
    } = useUser();

    onBeforeMount(() => {
      getList();
    });

    const updateList = ({ per_page, page }) => {
      getList();
    };

    const modal_create = ref(null);
    const modalEvent = () => {
      modal_create.value.open();
    };

    const modal_update = ref(null);
    const modalEventUpdate = ({ id,name, email}) => {
      modal_update.value.open({ id,name, email });
    };

    const state_change = ({ id, active }) => {
      console.log("state_change", id, active);
      setStateChange({ id, active })
        .then(getList)
        .catch(({ errors }) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: errors,
          });
          getList();
        });
    };

    return {
      listFetchingData,
      listErrors,
      listData,
      listParams,
      updateList,
      getList,
      modalEvent,
      modal_create,
      modalEventUpdate,
      modal_update,
      state_change,
    };
  },
};
</script>
