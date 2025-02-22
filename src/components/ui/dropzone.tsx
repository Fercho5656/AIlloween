import { useRef, useState } from "react";
import { CloudUpload, Trash2, Send, LoaderCircle } from "lucide-react";
import { Button } from "./button";
import { uploadPhoto } from '@/services/uploadService'

export default function Dropzone() {

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  }

  const handleDragLeave = () => {
    setDragOver(false);
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
    setDragOver(false);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  }

  const handleDelete = () => {
    setSelectedFile(null);
    setPreview(null);
  }

  const handleInputClick = () => {
    inputRef.current?.click();
  }

  const handleSend = async () => {
    if (selectedFile) {
      setUploadingPhoto(true);
      const response = await uploadPhoto(selectedFile);
      if (response.errors) return setUploadingPhoto(false);
      const photoId = response.data.public_id;
      const encodedId = encodeURIComponent(photoId);
      console.log({ response });
      window.location.assign(`/photo?id=${encodedId}`);
    }
  }

  function NoPhoto() {
    return (
      <div className="flex flex-col h-full items-center justify-evenly">
        <CloudUpload className="hover:animate-bounce" size={48} />
        <p className="text-lg font-medium text-gray-100">Drop or upload your photo!</p>
        <Button className="mt-4" variant="secondary">
          Select Photo
        </Button>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
      </div>)
  }

  function PhotoPreview() {
    return (
      <div className={`relative w-full h-full ${uploadingPhoto ? 'opacity-50' : ''}`}>
        <img src={preview!} alt="Preview" className="w-full h-full object-cover" />
        <div className="absolute h-full p-1 flex flex-col justify-between top-0 right-0">
          <Button className="p-1" variant="destructive" onClick={handleDelete}>
            <Trash2 size={24} />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className={`w-full backdrop-blur-sm h-64 p-4 rounded-lg border-2 border-dashed border-gray-300 flex justify-center items-center
    ${dragOver ? 'bg-gray-100' : ''} ${uploadingPhoto ? 'pointer-events-none' : ''} relative cursor-pointer`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleInputClick}
      >
        {selectedFile ? <PhotoPreview /> : <NoPhoto />}
      </div>
      {selectedFile ?
        <Button className="mt-4 px-4 py-2" variant="default" onClick={handleSend} disabled={uploadingPhoto}>
          {uploadingPhoto ? <LoaderCircle className="mr-2 animate-spin" size={24} /> :
            <Send className="mr-2" size={24} />
          }
          Send photo
        </Button> : null
      }
    </>

  )
}