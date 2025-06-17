export type ButtonPropTypes = {
  children: React.ReactNode
  icon?: React.ReactNode
  onClick?: () => void
  additionalClasses?: {
    button?: string;
    text?: string;
  }
  iconRight?: boolean
  disabled?: boolean
  buttonRef?: React.RefObject<HTMLButtonElement | null> | ((el: HTMLButtonElement | null) => void) 
  onMouseOver?: () => void
  onMouseOut?: () => void
  href?: string
};