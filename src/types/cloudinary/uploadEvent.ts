import type { CloudinaryUploadWidget } from '@cloudinary-util/types'

export type CloudinaryUploadEvent = {
  event: String
  info: Info
  UploadWidget: CloudinaryUploadWidget
}

interface Info {
  id: string
  batchId: string
  asset_id: string
  public_id: string
  version: number
  version_id: string
  signature: string
  width: number
  height: number
  format: string
  resource_type: string
  created_at: string
  tags: string[]
  bytes: number
  type: string
  etag: string
  placeholder: boolean
  url: string
  secure_url: string
  folder: string
  access_mode: string
  original_filename: string
  path: string
  thumbnail_url: string
}