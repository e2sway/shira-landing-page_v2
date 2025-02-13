import { useState } from 'react'
import toast from 'react-hot-toast'

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbymEgzVJQiShp-7VzL47bA789cYBcbElHvyj3qAyRLU_VfvRm8CpLfClz7WkqJkQlte/exec'

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
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
        },
      })

      // Since we might not get JSON back due to CORS, we'll check if the URL was hit
      if (response.status === 0 || response.type === 'opaque') {
        // Assume success if we got any response
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
      }

      try {
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
          const errorMessage = data.message === 'Email already registered' 
            ? 'This email is already on the waitlist!'
            : 'Failed to join waitlist. Please try again.'
          
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
      } catch (jsonError) {
        // If we can't parse JSON but got a response, assume success
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