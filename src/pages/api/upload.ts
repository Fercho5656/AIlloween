import type { APIResponse } from "@/types/api";
import type { APIRoute } from "astro";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: import.meta.env.PUBLIC_CLOUDINARY_API_KEY,
  api_secret: import.meta.env.PRIVATE_CLOUDINARY_API_SECRET
})

export const POST: APIRoute = async ({ request }): Promise<Response> => {
  const formData = await request.formData();
  const photo = formData.get('file')

  if (!photo || typeof photo === 'string') {
    const response: APIResponse = {
      errors: [
        {
          "status": 400,
          "title": "Bad Request",
          "detail": "No photo uploaded"
        }
      ]
    }
    return Response.json(response, { status: 400 })
  }

  const arrayBuffer = await photo.arrayBuffer()
  const uint8Array = new Uint8Array(arrayBuffer)

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({ folder: 'ailloween' }, (error, result) => {
      if (error) return reject(error)
      const response: APIResponse = {
        data: {
          ...result
        }
      }
      resolve(Response.json(response))
    }).end(uint8Array)
  })
}