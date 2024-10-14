export const uploadPhoto = async (photo: File) => {
  const formData = new FormData()
  formData.append('file', photo)

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData
  })

  if (!response.ok) {
    throw new Error('Failed to upload photo')
  }

  return await response.json()
}
