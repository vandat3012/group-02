<template>
  <form @submit.prevent="handleSubmit">
    <label>Name:</label>
    <input v-model="form.name" />
    <label>age:</label>
    <input v-model="form.age" />
    <button type="submit">submit</button>
  </form>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import axios from 'axios';
import { toast } from 'vue3-toastify';

const router = useRouter();
const form = reactive({
  name: "",
  age: "",
});

const handleSubmit = async () => {
  const res = await axios.post("http://localhost:3000/student", form);
  if (res.status === 201) {
    router.push("/").then(() => {
      toast.success("Create success !", {
        autoClose: 2000
      });
    });
  } else {
    toast.error("Create success 11!");
  }

}



</script>

<style></style>