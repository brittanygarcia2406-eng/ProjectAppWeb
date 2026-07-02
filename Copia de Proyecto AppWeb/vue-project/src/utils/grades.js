export function gradeKey(studentEmail, courseId, activityId) {
  return `${studentEmail}-${courseId}-${activityId}`
}

export function getActivityGrade(grades, studentEmail, courseId, activityId) {
  const value = grades[gradeKey(studentEmail, courseId, activityId)]
  return value === undefined ? null : value
}

export function getTopicAverage(grades, studentEmail, courseId, topic) {
  const scores = topic.activities
    .map((activity) => getActivityGrade(grades, studentEmail, courseId, activity.id))
    .filter((score) => score !== null)

  if (!scores.length) return null
  return scores.reduce((sum, score) => sum + score, 0) / scores.length
}

export function getCourseAverage(grades, studentEmail, course) {
  const scores = []

  course.weeks.forEach((week) => {
    week.topics.forEach((topic) => {
      topic.activities.forEach((activity) => {
        const grade = getActivityGrade(grades, studentEmail, course.id, activity.id)
        if (grade !== null) scores.push(grade)
      })
    })
  })

  if (!scores.length) return null
  return scores.reduce((sum, score) => sum + score, 0) / scores.length
}

export function formatGrade(value) {
  if (value === null || value === undefined) return '—'
  return value.toFixed(1)
}
