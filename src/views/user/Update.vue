<template>
  <modal
    ref="modal"
    :custom="{
      bg: {
        header: 'primary',
      },
      size: '',
    }"
    @close="close"
  >
    <template v-slot:title>
      <h5 class="modal-title font-weight-bold">Modificar Usuario: {{formValues.email}}</h5>
    </template>

    <template v-slot:body>
      <div class="mb-3">
        <InputText
          name="name"
          type="text"
          label="Name"
          placeholder="name"
          v-model.lazy="formValues.name"
          :value="formValues.name"
          :errors="formValuesErrors.name"
        />
      </div>

      <div class="mb-3">
        <InputText
          name="name"
          :type="formTypes.password"
          label="Contraseña"
          placeholder="********"
          v-model.lazy="formValues.password"
          :value="formValues.password"
          :errors="formValuesErrors.password"
        >
          <template v-slot:buttons>
            <ButtonCustom
              :classesNames="{
                btn_custom: 'btn btn-outline-info d-flex align-items-center gap-2',
              }"
              type="button"
              icon="eye"
              @click="passwordShow"
            />
          </template>
        </InputText>
      </div>

      <div class="mb-3">
        <InputText
          name="name"
          :type="formTypes.password"
          label="Confirma la contraseña"
          placeholder="********"
          v-model.lazy="formValues.passwordConfirmation"
          :value="formValues.passwordConfirmation"
          :errors="formValuesErrors.passwordConfirmation"
        >
          <template v-slot:buttons>
            <ButtonCustom
              :classesNames="{
                btn_custom: 'btn btn-outline-info d-flex align-items-center gap-2',
              }"
              type="button"
              icon="eye"
              @click="passwordShow"
            />
          </template>
        </InputText>
      </div>
    </template>

    <template v-slot:actions>
      <ButtonCustom
        :classesNames="{
          btn_custom: 'btn btn-primary d-flex align-items-center gap-2',
        }"
        type="button"
        text="Guardar"
        icon="save"
        :loading="updateFetchingData"
        @click="updateEvent"
      />
    </template>
  </modal>
</template>

<script>

import { ref, reactive } from "vue";

import * as yup from "yup";

import Modal from "@/components/Modal.vue";
import ButtonCustom from "@/components/Button.vue";
import InputText from "@/components/InputText.vue";


import useUser from "@/composables/useUser";

import { getErrorsFromYup } from "@/helpers";

export const props = {};

export default {
  name: "UpdateUser",
  emits: ["finish_success"],
  props,
  components: {
    Modal,
    ButtonCustom,
    InputText,
  },
  setup(props, { emit, attrs }) {
    const { 
      updateFetchingData, 
      updateErrors, 
      update,
    } = useUser();

    const schemaCreate = yup.object().shape({
      name: yup.string().required().min(5).max(25),
      password: yup.string().required().min(5).max(25),
      passwordConfirmation: yup.string().required().min(5).max(25).oneOf([yup.ref('password')]),
    });

    let formValues = reactive({
      id:0,
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    });

    const formValuesErrors = ref({});

    const modal = ref(null);
    const open = ({id,name,email}) => {
      formValues.id = id;
      formValues.name = name;
      formValues.email = email;
      modal.value.open({});
    };
    const close = () => {
      for (const key in formValues) {
        delete formValues[key];
      }
      for (const key in formValuesErrors.value) {
        delete formValuesErrors.value[key];
      }
    };

    const updateEvent = async () => {
      try {
        await schemaCreate.validate(formValues, { abortEarly: false });
        for (const key in formValuesErrors.value) {
          formValuesErrors.value[key] = [];
        }
        try {
          await update(formValues);
          modal.value.close();
          emit("finish_success");
        } catch (err) {
          if (err?.errors) {
            for (const key in formValuesErrors.value) {
              formValuesErrors.value[key] = [];
            }
            const { errors } = err;
            for (const error in errors) {
              formValuesErrors.value[error] = err.errors[error];
            }
          }
        }
      } catch (err) {
        console.log("updateEvent -> catch", err);
        formValuesErrors.value = getErrorsFromYup({
          arr: formValuesErrors.value,
          err,
        });
      }
    };

    const formTypes = ref({
      password: "password",
    });
    const passwordShow = () => {
      formTypes.value.password = formTypes.value.password === "password" ? "text" : "password";
    };

    return {
      modal,
      open,
      close,
      formValues,
      formValuesErrors,

      updateErrors,
      updateFetchingData,
      updateEvent,

      passwordShow,
      formTypes,
    };
  },
};
</script>

<style scoped>
    .invalid-feedback-custom-label {
        width: 100%;
        margin-top: .25rem;
        font-size: 80%;
        color: #dc3545;
    }

    .invalid-feedback-custom {
        width: 100%;
        margin-top: .25rem;
        /* font-size: 80%; */
        color: #dc3545;
    }

    label {
        font-weight: bold;
    }
</style>