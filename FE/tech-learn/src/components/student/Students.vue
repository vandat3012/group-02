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
                <button @click="openModal(student)">Delete</button>
            </td>
        </tr>
    </tbody>
  </table>

  <Modal
    v-if="showModal"
    @confirm="handleDelete(selectedObject)"
    @close="closeModal"
    />
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import Modal from '../Modal/Modal.vue';

    let list = ref();
    let showModal = ref(false);
    let selectedObject = ref(null);

    onMounted(()=> {
        axios.get("http://localhost:3000/student")
        .then(response => (list.value = response.data));
    });

    const  handleDelete= async (data) =>{
        axios.delete(`http://localhost:3000/student/${data.id}`)
        .then(response => (list.value = list.value.filter((item) => item.id !== data.id)));
        closeModal();
    }

    const closeModal = () => {
        showModal.value = false;
        console.log(showModal.value);
    }

    const openModal = (object) => {
        console.log(showModal.value);
        selectedObject.value = object;
        showModal.value = true;
    }


</script>

<style>

</style>