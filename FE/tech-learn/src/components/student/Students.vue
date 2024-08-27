<template>
    <button >
        <router-link :to="{name : 'CreateStudent'}">
            Add
        </router-link>
    </button>
  <table v-if="list">
    <thead>
        <th>id</th>
        <th>name</th>
        <th>age</th>
        <th>action</th>
    </thead>
    <tbody>
        <tr v-for="student in list" :key="student">
            <td>{{ student.id }}</td>
            <td>{{ student.name }}</td>
            <td>{{ student.age }}</td>
            <td>
                <router-link :to="{name:'StudentDetail', params: {id: student.id}}">
                    update
                </router-link>
                <button @click="handleDelete(student)">Delete</button>
            </td>
        </tr>
    </tbody>
  </table>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
        let list = ref();
        onMounted(()=> {
            axios.get("http://localhost:3000/student")
            .then(response => (list.value = response.data));
        });

        const  handleDelete= async (i) =>{
            axios.delete(`http://localhost:3000/student/${i.id}`)
            .then(response => (list.value = list.value.filter((item) => item.id !== i.id)));
        }
</script>

<style>

</style>