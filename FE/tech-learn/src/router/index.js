import { createRouter, createWebHistory } from 'vue-router'
import Students from '@/components/student/Students.vue'
import CreateStudent from '@/components/student/StudentCreate.vue'
import StudentUpdate from '@/components/student/StudentUpdate.vue'
import NotFound from '@/components/NotFound/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'StudentList',
    component: Students
  },
  {
    path: '/student/:id',
    name: 'StudentDetail',
    component: StudentUpdate,
    props: true
  },
  {
    path: '/create-student',
    name: 'CreateStudent',
    component: CreateStudent,
    props: true
  },
  {
    path: "/:catchAll(.*)",
    name: 'NotFound',
    component: NotFound 
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
