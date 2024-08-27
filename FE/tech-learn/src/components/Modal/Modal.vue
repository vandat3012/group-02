<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal">
      <h3>Confirm Deletion</h3>
      <p>Are you sure you want to delete?</p>
      <button @click="confirmDelete">Yes</button>
      <button @click="closeModal">No</button>
    </div>
  </div>
</template>
<script setup>
import { defineEmits } from 'vue';
import { toast } from 'vue3-toastify';
const emit = defineEmits(['confirm', 'close']);

const confirmDelete = () => {
  emit('confirm');
  toast.success("Delete success !", {
    autoClose: 2000
  });
};

const closeModal = () => {
  emit('close');
};

</script>

<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}
</style>
