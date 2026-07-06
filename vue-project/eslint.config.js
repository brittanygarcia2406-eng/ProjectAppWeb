import pluginVue from 'eslint-plugin-vue'
import pluginVitest from '@vitest/eslint-plugin'
import pluginOxlint from 'eslint-plugin-oxlint'
import eslintConfigPrettier from 'eslint-config-prettier'

export default [
  // Archivos a ignorar
  {
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },
  
  // Configuración base de Vue
  ...pluginVue.configs['flat/essential'],
  
  // Configuración de Vitest
  {
    files: ['src/**/__tests__/*'],
    ...pluginVitest.configs.recommended,
  },
  
  // Oxlint
  ...pluginOxlint.buildFromOxlintConfigFile('.oxlintrc.json'),
  
  // Formateo
  eslintConfigPrettier,
];