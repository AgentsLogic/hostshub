"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"

interface ImageUploadProps {
  value: { url: string; alt?: string }[]
  onChange: (value: { url: string; alt?: string }[]) => void
  onRemove: (index: number) => void
  maxFiles?: number
}

export function ImageUpload({ value = [], onChange, onRemove, maxFiles = 10 }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (value.length + acceptedFiles.length > maxFiles) {
        alert(`You can only upload a maximum of ${maxFiles} images.`)
        return
      }

      setIsUploading(true)

      try {
        // In a real application, you would upload these files to your storage service
        // For this demo, we'll create object URLs
        const newImages = acceptedFiles.map((file) => ({
          url: URL.createObjectURL(file),
          alt: file.name,
        }))

        onChange([...value, ...newImages])
      } catch (error) {
        console.error("Error uploading images:", error)
        alert("Failed to upload images. Please try again.")
      } finally {
        setIsUploading(false)
      }
    },
    [value, onChange, maxFiles],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    maxFiles: maxFiles - value.length,
    disabled: isUploading || value.length >= maxFiles,
  })

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition-colors ${
          isDragActive ? "border-primary bg-primary/10" : "border-muted-foreground/20"
        } ${isUploading || value.length >= maxFiles ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-2">
          <Upload className="h-8 w-8 text-muted-foreground" />
          <p className="text-sm font-medium">
            {isDragActive ? "Drop the images here" : `Drag & drop images here, or click to select files`}
          </p>
          <p className="text-xs text-muted-foreground">
            {value.length >= maxFiles
              ? `Maximum of ${maxFiles} images reached`
              : `Upload up to ${maxFiles - value.length} more image${maxFiles - value.length === 1 ? "" : "s"}`}
          </p>
        </div>
      </div>

      {value.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {value.map((image, index) => (
            <Card key={index} className="relative overflow-hidden group">
              <div className="aspect-square relative">
                <Image
                  src={image.url || "/placeholder.svg"}
                  alt={image.alt || "Property image"}
                  fill
                  className="object-cover"
                />
              </div>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => onRemove(index)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove image</span>
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

