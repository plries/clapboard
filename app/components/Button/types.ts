export type ButtonPropTypes = {
  label: string
  icon?: React.ReactNode
  onClick?: () => void
  additionalClasses?: string
  iconRight?: boolean
  disabled?: boolean
  buttonRef?: (el: HTMLButtonElement | null) => void | React.RefObject<HTMLButtonElement | null> 
};