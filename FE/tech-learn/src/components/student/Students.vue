<template>
     <div class="col-md-12 d-flex justify-content-start my-4">
    <button class="btn btn-primary custom-btn">
      <router-link to="{name: 'CreateStudent'}" class="text-white text-decoration-none">
        Add +
      </router-link>
    </button>
  </div>

  <table v-if="list"  class="table table-hover">
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
    @confirm="handleDelete(seletedObject)"
    @close="closeModal"
  ></Modal>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import Modal from '../Modal/Modal.vue';

    let list = ref();
    let seletedObject = ref();
    let myModal;

    onMounted(() => {
        myModal = new bootstrap.Modal(document.getElementById("exampleModal"))
    })

    onMounted(()=> {
        axios.get("http://localhost:3000/student")
        .then(response => (list.value = response.data));
    });

    const  handleDelete= async (data) =>{
        axios.delete(`http://localhost:3000/student/${data.id}`)
        .then(response => (list.value = list.value.filter((item) => item.id !== data.id)));
        myModal.hide()
    }


    const openModal = (student) => {
        seletedObject.value = student;
        myModal.show();
    }


</script>

<style>

</style>