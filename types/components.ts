export interface BackgroundImageProps {
  src: string
}

export interface NumberInputProps {
  modelValue: number | null
  label?: string
  unit?: string
  min?: number
  max?: number
  required?: boolean
  id: string
}

export interface ErrorMessageProps {
  message?: string
  id?: string
}

export interface FormNavigationProps {
  backPath: string
  backLabel?: string
  nextLabel?: string
  disabled?: boolean
}

export interface ToggleGroupOption<T extends string = string> {
  value: T
  label: string
} 