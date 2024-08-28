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
import axios from 'axios';
import { ref, onMounted, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { toast } from 'vue3-toastify';
const form = reactive({
  name: "",
  age: ""
});

const router = useRouter();
const route = useRoute();

onMounted(() => {
  const studentId = route.params.id;
  axios.get(`http://localhost:3000/student/${studentId}`)
    .then(res => {
      form.age = res.data.age;
      form.name = res.data.name;
    })

    .catch(error => {
      console.error(error);
    });
})



const handleSubmit = async () => {
  const studentId = route.params.id;

  const response = await axios.put(`http://localhost:3000/student/${studentId}`, form);
  if (response.status === 200) {
    router.push("/").then(() => {
      toast.success("Update success !", {
        autoClose: 2000
      });
    });
  } else {
    toast.error("Update Error, Try Later !")
  }
}
</script>


<style></style>