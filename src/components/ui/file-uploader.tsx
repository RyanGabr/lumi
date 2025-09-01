import { AlertCircleIcon, XIcon } from "lucide-react";

import { useFileUpload } from "@/hooks/use-file-upload";
import { useEffect } from "react";
import { ArchiveBoxArrowDownIcon } from "@heroicons/react/20/solid";

type FileUploaderProps = {
  value?: File | null;
  onChange?: (file: File | null) => void;
};

export default function FileUploader({ onChange, value }: FileUploaderProps) {
  const maxSizeMB = 5;
  const maxSize = maxSizeMB * 1024 * 1024; // 5MB default

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ] = useFileUpload({
    accept: "image/*",
    maxSize,
  });

  const previewUrl = files[0]?.preview || null;

  useEffect(() => {
    const fileOrMeta = files[0]?.file ?? files[0];

    if (fileOrMeta instanceof File) {
      onChange?.(fileOrMeta);
    } else {
      onChange?.(null);
    }
  }, [files, onChange]);

  return (
    <div className="flex flex-col gap-2 cursor-default select-none">
      <div className="relative">
        {/* Drop area */}
        <div
          role="button"
          onClick={openFileDialog}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          data-dragging={isDragging || undefined}
          className="border-border border-dashed cursor-pointer border-2 bg-foreground/1 hover:bg-foreground/4 data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-52 flex-col items-center justify-center overflow-hidden rounded-md p-4 transition-colors has-disabled:pointer-events-none has-disabled:opacity-50 has-[img]:border-none has-[input:focus]:ring-[3px]"
        >
          <input
            {...getInputProps()}
            className="sr-only"
            aria-label="Upload file"
          />
          {previewUrl ? (
            <div className="absolute inset-0">
              <img
                src={previewUrl}
                alt={files[0]?.file?.name || "Uploaded image"}
                className="size-full object-cover"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center px-4 py-3 text-center gap-2">
              <div aria-hidden="true">
                <ArchiveBoxArrowDownIcon className="size-6 opacity-40" />
              </div>
              <p className="text-xs font-medium text-muted-foreground">
                Solte sua imagem aqui ou clique para selecionar
              </p>
            </div>
          )}
        </div>
        {previewUrl && (
          <div className="absolute top-4 right-4">
            <button
              type="button"
              className="focus-visible:border-ring focus-visible:ring-ring/50 z-50 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
              onClick={() => removeFile(files[0]?.id)}
              aria-label="Remove image"
            >
              <XIcon className="size-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>

      {errors.length > 0 && (
        <div
          className="text-destructive flex items-center gap-1 text-xs"
          role="alert"
        >
          <AlertCircleIcon className="size-3 shrink-0" />
          {/* <span>{errors[0]}</span> */}
          <span>Você excedeu o tamanho máximo permitido de 5MB</span>
        </div>
      )}
    </div>
  );
}
