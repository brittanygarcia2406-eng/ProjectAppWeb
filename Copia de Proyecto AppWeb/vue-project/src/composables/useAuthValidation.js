export function useAuthValidation() {
  const validateLogin = (email, password) => {
    const roleByDomain = {
      edu: 'estudiante',
      doc: 'docente',
      admin: 'admin',
    }

    const match = email.match(/@.+\.(edu|doc|admin)$/)
    const isValidPassword = password.length === 3

    if (!match) {
      return { success: false, message: 'Correo inválido para los tipos permitidos.' }
    }
    if (!isValidPassword) {
      return { success: false, message: 'La contraseña debe tener 3 dígitos.' }
    }

    return { success: true, role: roleByDomain[match[1]] }
  }

  return { validateLogin }
}
