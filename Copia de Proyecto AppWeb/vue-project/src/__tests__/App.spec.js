import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'
import LoginView from '../views/LoginView.vue'

describe('App', () => {
  it('muestra la pantalla de login', async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [{ path: '/', component: LoginView }],
    })

    const wrapper = mount(App, {
      global: {
        plugins: [createPinia(), router],
      },
    })

    await router.isReady()
    expect(wrapper.text()).toContain('Bienvenido')
  })
})
