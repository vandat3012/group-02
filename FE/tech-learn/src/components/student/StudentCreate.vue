<template>
  <form @submit.prevent="onSubmit" class="student-form">
    <div class="form-group">
      <label for="name">Name:</label>
      <input id="name" v-model="name" type="text" class="form-control" />
      <span class="error-message">{{ nameError }}</span>
    </div>
    <div class="form-group">
      <label for="age">Age:</label>
      <input id="age" v-model="age" type="number" class="form-control" />
      <span class="error-message">{{ ageError }}</span>
    </div>
    <button type="submit" class="submit-btn">Submit</button>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { toast } from 'vue3-toastify';
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';
const rootApi = process.env.VUE_APP_ROOT_API;


const router = useRouter();

const { handleSubmit, resetForm } = useForm({
  validationSchema: yup.object({
    name: yup.string().required('Name is required'),
    age: yup
      .number()
      .typeError('Age must be a number')
      .positive('Age must be a positive number')
      .required('Age is required'),
  }),
});

const { value: name, errorMessage: nameError } = useField('name');
const { value: age, errorMessage: ageError } = useField('age');

const onSubmit = handleSubmit(async (values) => {
  try {
    const response = await axios.post(`${rootApi}/student`, values);
    if (response.status === 201) {
      resetForm();
      router.push('/').then(() => {
        toast.success('Create success!', {
          autoClose: 2000
        });
      });
    } else {
      toast.error('Create failed!');
    }
  } catch (error) {
    toast.error('An error occurred while creating the student!');
  }
});
</script>

<style scoped>
.student-form {
  max-width: 600px;
  margin: 20px auto;
  padding: 25px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
}

.form-control {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ced4da;
  border-radius: 5px;
  font-size: 1rem;
  box-sizing: border-box;
}

.error-message {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.submit-btn {
  background-color: #007bff;
  color: #ffffff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #0056b3;
}
</style>

