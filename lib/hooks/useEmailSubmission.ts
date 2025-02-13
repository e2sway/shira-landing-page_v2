import { useState } from 'react'
import toast from 'react-hot-toast'

// Update this URL with your working web app URL.
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby7e5nht7jX2Xh9Gv4NvVBymi2AvKMei6uUjqcMml0QWSRwRHsGMc_7tIB881Qccbkd/exec'

interface SubmissionResponse {
  success: boolean;
  message: string;
}

export function useEmailSubmission() {
  const [isLoading, setIsLoading] = useState(false)

  const submitEmail = async (email: string) => {
    if (!email) {
      toast.error('Please enter your email address', {
        style: {
          background: '#282828',
          color: '#fff',
          border: '1px solid #3d3d3d',
        },
        iconTheme: {
          primary: '#8A80F9',
          secondary: '#282828',
        },
      })
      return false
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address', {
        style: {
          background: '#282828',
          color: '#fff',
          border: '1px solid #3d3d3d',
        },
        iconTheme: {
          primary: '#8A80F9',
          secondary: '#282828',
        },
      })
      return false
    }

    setIsLoading(true)

    try {
      // Create URL with parameters
      const url = new URL(GOOGLE_SCRIPT_URL)
      url.searchParams.append('email', email.toLowerCase().trim())

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      })

      const data: SubmissionResponse = await response.json()
      
      if (data.success) {
        toast.success('Successfully joined the waitlist!', {
          duration: 5000,
          style: {
            background: '#282828',
            color: '#fff',
            border: '1px solid #3d3d3d',
          },
          iconTheme: {
            primary: '#8A80F9',
            secondary: '#282828',
          },
        })
        return true
      } else {
        // Handle specific error messages from the server
        let errorMessage = 'Failed to join waitlist. Please try again.'
        
        if (data.message === 'Email already registered') {
          errorMessage = 'This email is already on the waitlist!'
        } else if (data.message === 'Invalid email format') {
          errorMessage = 'Please enter a valid email address.'
        } else if (data.message === 'No email provided.') {
          errorMessage = 'Please enter your email address.'
        }
        
        toast.error(errorMessage, {
          style: {
            background: '#282828',
            color: '#fff',
            border: '1px solid #3d3d3d',
          },
          iconTheme: {
            primary: '#8A80F9',
            secondary: '#282828',
          },
        })
        return false
      }
    } catch (error) {
      console.error('Error submitting email:', error)
      toast.error('Failed to join waitlist. Please try again.', {
        style: {
          background: '#282828',
          color: '#fff',
          border: '1px solid #3d3d3d',
        },
        iconTheme: {
          primary: '#8A80F9',
          secondary: '#282828',
        },
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return { submitEmail, isLoading }
}
