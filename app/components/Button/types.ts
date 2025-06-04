export type ButtonPropTypes = {
  label: string
  icon?: React.ReactNode
  onClick?: () => void
  additionalClasses?: string
  iconRight?: boolean
  disabled?: boolean
  buttonRef?: React.RefObject<HTMLButtonElement | null> | ((el: HTMLButtonElement | null) => void) 
};