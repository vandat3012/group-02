<template>
  <form @submit.prevent="onSubmit" class="form-container">
    <div class="form-group">
      <label for="name">Name:</label>
      <input id="name" v-model="name" type="text" class="form-input" />
      <span class="form-error">{{ nameError }}</span>
    </div>
    <div class="form-group">
      <label for="age">Age:</label>
      <input id="age" v-model="age" type="number" class="form-input" />
      <span class="form-error">{{ ageError }}</span>
    </div>
    <button type="submit" class="form-submit">Submit</button>
  </form>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { toast } from 'vue3-toastify';
import { useField, useForm } from "vee-validate";
import * as yup from "yup";

const rootApi = process.env.VUE_APP_ROOT_API;
const router = useRouter();
const route = useRoute();

const { handleSubmit, resetForm } = useForm({
  validationSchema: yup.object({
    name: yup.string().required("Name is required"),
    age: yup
      .number()
      .typeError("Age must be a number")
      .positive("Age must be a positive number")
      .required("Age is required"),
  }),
});

const { value: name, errorMessage: nameError, setValue: setName } = useField("name");
const { value: age, errorMessage: ageError, setValue: setAge } = useField("age");

onMounted(() => {
  const studentId = route.params.id;
  axios.get(`${rootApi}/student/${studentId}`)
    .then(res => {
      setName(res.data.name);
      setAge(res.data.age);
    })
    .catch(error => {
      console.error(error);
    });
});

const onSubmit = handleSubmit(async (values) => {
  const studentId = route.params.id;
  try {
    const response = await axios.put(`${rootApi}/student/${studentId}`, values);
    if (response.status === 200) {
      resetForm();
      router.push("/").then(() => {
        toast.success("Update success!", {
          autoClose: 2000
        });
      });
    } else {
      toast.error("Update Error, Try Later!");
    }
  } catch (error) {
    toast.error("An error occurred while updating the student!");
  }
});
</script>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 30px;
  background: #f4f4f9;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  border: 1px solid #ddd;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-size: 1.1rem;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
}

.form-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  background-color: #fff;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

.form-input:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
}

.form-error {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 5px;
  display: block;
}

.form-submit {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background-color: #007bff;
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.form-submit:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

.form-submit:active {
  background-color: #004085;
  transform: scale(1);
}
</style>
