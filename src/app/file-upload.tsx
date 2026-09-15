import type { ChangeEvent } from 'react'
import { slugify } from 'shuutils'

type FileUploadProps = {
  label: string
  name: string
  onFile: (file: File) => void
}

export function FileUpload({ label, name, onFile }: FileUploadProps) {
  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const [file] = event.target.files ?? []
    if (file !== undefined) onFile(file)
  }
  return (
    <label className="grid gap-2 text-sm" htmlFor={name}>
      {label}
      <input
        accept="image/*"
        className="cursor-pointer rounded-md border border-input bg-background p-2 file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-1 file:text-primary-foreground"
        data-testid={slugify(`input-${name}`)}
        id={name}
        name={name}
        onChange={onChange}
        type="file"
      />
    </label>
  )
}
