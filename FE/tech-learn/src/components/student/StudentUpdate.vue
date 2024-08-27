<template>

    <form @submit.prevent="handleSubmit">
    <label>Name:</label>
    <input v-model="form.name"/>
    <label>age:</label>
    <input v-model="form.age"/>
    <button type="submit">submit</button>
  </form>

</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
const form = reactive({
name:"",
age:""
});




const router = useRouter();
const route = useRoute();


onMounted(() => {
  const studentId = route.params.id;
//   console.log(studentId);
  fetch(`http://localhost:3000/student/${studentId}`)
    .then((res) => res.json())
    .then((data) => {
    //  console.log(data);
    form.age = data.age;
    form.name = data.name;
    })
    .catch((err) => console.log(err));
});

function handleSubmit() {
  const studentId = route.params.id;

  fetch(`http://localhost:3000/student/` + studentId, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log('Student updated:', data);
      router.push({ name: 'StudentList' });
    })
    .catch((err) => console.log(err));
}
</script>


<style>

</style>