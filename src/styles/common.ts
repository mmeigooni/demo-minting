export const commonStyles = {
  // Layout
  modalOverlay:
    'fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-all duration-300',
  modalContent:
    'bg-black rounded-lg p-8 max-w-md w-full mx-4 relative transform transition-all duration-300 border border-white/10',

  // Buttons
  authOptionButton:
    'flex flex-col items-center justify-center bg-[#1A1A1A] rounded-lg p-4 hover:bg-[#2A2A2A] transition-colors',
  closeButton: 'absolute top-4 right-4 text-gray-400 hover:text-white',

  // Text
  heading: 'text-white text-2xl font-semibold mb-8 text-center',
  errorText: 'text-red-500 text-sm text-center',

  // Forms
  formContainer: 'space-y-4',
  buttonGroup: 'flex gap-4',

  // Icons
  iconContainer: 'w-8 h-8 mb-2',

  // Transitions
  slideTransition: {
    entering: 'opacity-100 translate-x-0',
    exiting: 'opacity-0 translate-x-[-100%] absolute inset-0',
  },

  // Utility
  flexCenter: 'flex items-center justify-center',
} as const;

export const variants = {
  modal: {
    open: 'opacity-100 scale-100',
    closed: 'opacity-0 scale-95',
  },

  visibility: {
    visible: 'opacity-100 visible',
    hidden: 'opacity-0 invisible',
  },
} as const;
