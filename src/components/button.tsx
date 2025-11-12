function getSize (size: 'sm' | 'md' | 'lg' | 'xl'): string {
  switch (size) {
    case 'sm': return 'px-2 py-1 text-sm'
    case 'md': return 'px-4 py-2 text-md'
    case 'lg': return 'px-6 py-3 text-lg'
    case 'xl': return 'px-8 py-4 text-xl'
  }
}

function getVariant (variant: 'primary' | 'ghost' | 'underline' | 'outline', disabled: boolean): string {
  switch (variant) {
    case 'primary': return disabled ? 'bg-moccaccino-200 text-moccaccino-400' : 'bg-moccaccino-500 hover:bg-moccaccino-600 text-white shadow-sm hover:shadow-md'
    case 'ghost': return disabled ? 'bg-transparent text-moccaccino-200' : 'bg-transparent text-moccaccino-500 hover:bg-moccaccino-50'
    case 'underline': return disabled ? 'underline text-moccaccino-200' : 'underline hover:no-underline underline-offset-4'
    case 'outline': return disabled ? 'border-2 border-moccaccino-200 text-moccaccino-400' : 'border-2 border-moccaccino-500 text-moccaccino-500 hover:bg-moccaccino-50'
  }
}

function Button ({
  children = 'Click me',
  onClick,
  size = 'md',
  variant = 'primary',
  disabled = false,
  type
}: {
  children: React.ReactNode
  onClick?: () => void
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'primary' | 'ghost' | 'underline' | 'outline'
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}): React.ReactNode {
  return (
    <button
      className={`rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-moccaccino-500 focus:ring-offset-2 ${disabled ? 'opacity-60 cursor-not-allowed' : 'transition-colors duration-200 cursor-pointer'} ${getSize(size)} ${getVariant(variant, disabled)}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
