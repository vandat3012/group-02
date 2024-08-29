<template>
    <div class="container">
      <div class="button-container">
        <button class="btn btn-primary">
          <router-link :to="{ name: 'StudentCreate' }" class="link-text">
            Add +
          </router-link>
        </button>
      </div>
  
      <table v-if="list" class="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in list" :key="student.id">
            <td>{{ student.id }}</td>
            <td>{{ student.name }}</td>
            <td>{{ student.age }}</td>
            <td>
              <router-link :to="{ name: 'StudentDetail', params: { id: student.id } }" class="btn btn-info">
                Update
              </router-link>
              <button class="btn btn-danger" @click="openModal(student)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <Modal
        @confirm="handleDelete(seletedObject)"
        @close="closeModal"
        class="custom-modal"
      ></Modal>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  import axios from 'axios';
  import Modal from '../Modal/Modal.vue';
  
  const list = ref([]);
  const seletedObject = ref(null);
  const myModal = ref(null);
  const rootApi = process.env.VUE_APP_ROOT_API;
  
  onMounted(() => {
    myModal.value = new bootstrap.Modal(document.getElementById("exampleModal"));
    fetchStudents();
  });
  
  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${rootApi}/student`);
      list.value = response.data || [];
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };
  
  const handleDelete = async (data) => {
    try {
      await axios.delete(`${rootApi}/student/${data.id}`);
      list.value = list.value.filter((item) => item.id !== data.id);
      closeModal();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };
  
  const openModal = (student) => {
    seletedObject.value = student;
    myModal.value.show();
  };
  
  const closeModal = () => {
    myModal.value.hide();
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .button-container {
    margin-bottom: 20px;
    text-align: left;
  }
  
  .btn-primary {
    background-color: #007bff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 16px;
    font-weight: bold;
  }
  
  .link-text {
    color: #ffffff;
    text-decoration: none;
  }
  
  .styled-table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    background-color: #ffffff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .styled-table th, .styled-table td {
    padding: 12px;
    text-align: center;
    border-bottom: 1px solid #ddd;
  }
  
  .styled-table th {
    background-color: #f4f4f4;
    font-weight: 600;
  }
  
  .styled-table tbody tr:hover {
    background-color: #f9f9f9;
  }
  
  .btn-info {
    background-color: #17a2b8;
    border: none;
    color: #ffffff;
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: bold;
    margin-right: 5px;
  }
  
  .btn-info:hover {
    background-color: #138496;
  }
  
  .btn-danger {
    background-color: #dc3545;
    border: none;
    color: #ffffff;
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: bold;
  }
  
  .btn-danger:hover {
    background-color: #d62839;
  }
  
  .custom-modal .modal-dialog {
    max-width: 500px;
    margin: 30px auto;
  }
  
  .custom-modal .modal-content {
    border-radius: 8px;
    overflow: hidden;
  }
  
  .custom-modal .modal-header {
    background-color: #007bff;
    color: #ffffff;
    border-bottom: 1px solid #ddd;
  }
  
  .custom-modal .modal-footer {
    border-top: 1px solid #ddd;
  }
  </style>
  