export const TEACHERS = [
  'María González',
  'Carlos Ruiz',
  'Ana Martínez',
  'Laura Pérez',
  'Roberto Sánchez',
  'Diego Fernández',
]

export function createDefaultCurriculum(prefix) {
  const activityTemplates = [
    { title: 'Cuestionario inicial', type: 'cuestionario' },
    { title: 'Lectura obligatoria', type: 'lectura' },
    { title: 'Informe de avance', type: 'informe' },
    { title: 'Ejercicio práctico', type: 'práctica' },
    { title: 'Proyecto integrador', type: 'proyecto' },
  ]

  const weeks = Array.from({ length: 4 }, (_, weekIndex) => {
    const weekNumber = weekIndex + 1
    return {
      id: weekNumber,
      title: `Semana ${weekNumber}`,
      topics: [
        {
          id: weekNumber,
          title: `${prefix} - Tema semana ${weekNumber}`,
          activities: activityTemplates.map((template, activityIndex) => ({
            id: weekNumber * 100 + activityIndex + 1,
            title: template.title,
            type: template.type,
            maxScore: 10,
          })),
        },
      ],
    }
  })

  weeks.push({
    id: 5,
    title: 'Examen Final',
    topics: [
      {
        id: 5,
        title: `${prefix} - Evaluación final`,
        activities: [
          {
            id: 501,
            title: 'Examen final',
            type: 'examen',
            maxScore: 10,
          },
        ],
      },
    ],
  })

  return weeks
}

export function createInitialCourses() {
  const coursesData = [
    {
      id: 1,
      title: 'Desarrollo Web con React',
      level: 'intermedio',
      category: 'Desarrollo Web',
      hours: 12,
      instructor: 'María González',
      description:
        'Aprende a crear aplicaciones modernas con React, hooks, estado y componentes reutilizables.',
      synopsis:
        'Este curso te guía desde los fundamentos de React hasta el desarrollo de interfaces dinámicas. Aprenderás a estructurar componentes, manejar estado con hooks y consumir APIs para construir aplicaciones web escalables y mantenibles.',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=360&fit=crop',
    },
    {
      id: 2,
      title: 'Python para Data Science',
      level: 'principiante',
      category: 'Data Science',
      hours: 15,
      instructor: 'Carlos Ruiz',
      description:
        'Domina Python, pandas y visualización de datos para análisis profesional.',
      synopsis:
        'Explora el ecosistema de Data Science con Python: manipulación de datos con pandas, análisis exploratorio y visualizaciones claras. Al finalizar podrás transformar conjuntos de datos reales en conclusiones útiles para la toma de decisiones.',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=360&fit=crop',
    },
    {
      id: 3,
      title: 'Diseño UX/UI Avanzado',
      level: 'avanzado',
      category: 'Diseño',
      hours: 8,
      instructor: 'Ana Martínez',
      description:
        'Crea experiencias de usuario excepcionales con principios de diseño centrado en el usuario.',
      synopsis:
        'Profundiza en investigación de usuarios, arquitectura de información y prototipado de interfaces. Aplicarás principios de usabilidad y accesibilidad para diseñar productos digitales coherentes, atractivos y centrados en las necesidades reales del usuario.',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=360&fit=crop',
    },
    {
      id: 4,
      title: 'Marketing Digital Estratégico',
      level: 'intermedio',
      category: 'Marketing',
      hours: 10,
      instructor: 'Laura Pérez',
      description:
        'Estrategias de contenido, SEO y redes sociales para impulsar tu marca online.',
      synopsis:
        'Aprende a diseñar campañas digitales integrales: posicionamiento SEO, creación de contenido de valor y gestión de redes sociales. Medirás resultados con métricas clave para optimizar la presencia online de cualquier marca o emprendimiento.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=360&fit=crop',
    },
    {
      id: 5,
      title: 'Gestión de Proyectos Ágiles',
      level: 'principiante',
      category: 'Gestión',
      hours: 6,
      instructor: 'Roberto Sánchez',
      description: 'Metodologías Scrum y Kanban para liderar equipos de alto rendimiento.',
      synopsis:
        'Conoce los marcos ágiles más utilizados en la industria: roles, ceremonias y tableros de trabajo. Desarrollarás habilidades para planificar iteraciones, gestionar impedimentos y coordinar equipos multidisciplinarios con enfoque en la entrega continua de valor.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=360&fit=crop',
    },
    {
      id: 6,
      title: 'Ciberseguridad Fundamentos',
      level: 'avanzado',
      category: 'Seguridad',
      hours: 14,
      instructor: 'Diego Fernández',
      description:
        'Protege sistemas y datos con las mejores prácticas de seguridad informática.',
      synopsis:
        'Estudia los principios de la ciberseguridad: amenazas comunes, cifrado, control de accesos y hardening de sistemas. Aplicarás buenas prácticas para proteger infraestructuras y datos sensibles en entornos empresariales y en la nube.',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=360&fit=crop',
    },
  ]

  return coursesData.map((course) => ({
    ...course,
    totalSeats: 30,
    availableSeats: 30,
    active: true,
    weeks: createDefaultCurriculum(course.title),
  }))
}
