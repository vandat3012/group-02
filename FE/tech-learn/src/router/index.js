import { createRouter, createWebHistory } from 'vue-router'
import Students from '@/components/student/Students.vue'
import StudentUpdate from '@/components/student/StudentUpdate.vue'
import NotFound from '@/components/NotFound/NotFound.vue'
import StudentCreate from '@/components/student/StudentCreate.vue'

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
    name: 'StudentCreate',
    component: StudentCreate,
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
