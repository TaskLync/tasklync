// hooks/useWaitlistForm.ts
'use client'

import { useState, useCallback, useRef } from 'react'
import { submitWaitlist }                 from '@/lib/waitlist/submit'
import { useAnalytics }                   from '@/hooks/useAnalytics'
import { ANALYTICS_EVENTS }               from '@/lib/analytics/events'
import type { WaitlistStep as FormState, UserType, WaitlistAPIResponse } from '@/types/waitlist'

interface UseWaitlistFormOptions {
  userType?: UserType
  onSuccess?: (result: WaitlistAPIResponse) => void
}

interface UseWaitlistFormReturn {
  // State
  formState:   FormState
  email:       string
  name:        string
  result:      WaitlistAPIResponse | null
  errorMessage: string | null

  // Handlers
  setEmail:         (v: string) => void
  setName:          (v: string) => void
  handleFirstFocus: () => void
  handleSubmit:     (e: React.FormEvent) => Promise<void>
  reset:            () => void
}

export function useWaitlistForm(options: UseWaitlistFormOptions = {}): UseWaitlistFormReturn {
  const { userType = 'homeowner', onSuccess } = options
  const { track } = useAnalytics()

  const [formState, setFormState]       = useState<FormState>('idle')
  const [email, setEmail]               = useState('')
  const [name, setName]                 = useState('')
  const [result, setResult]             = useState<WaitlistAPIResponse | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const hasStarted                      = useRef(false)

  const handleFirstFocus = useCallback(() => {
    if (!hasStarted.current) {
      hasStarted.current = true
      track(ANALYTICS_EVENTS.WAITLIST_FORM_STARTED)
    }
  }, [track])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    if (formState === 'loading') return

    setFormState('loading')
    setErrorMessage(null)
    track(ANALYTICS_EVENTS.WAITLIST_FORM_SUBMITTED)

    try {
      const data = await submitWaitlist({
        email,
        name:      name.trim() || undefined,
        user_type: userType,
      })

      setResult(data)
      setFormState('success')

      if (data.alreadySignedUp) {
        track(ANALYTICS_EVENTS.WAITLIST_ALREADY_JOINED, { position: data.position })
      } else {
        track(ANALYTICS_EVENTS.WAITLIST_SIGNUP_SUCCESS, { position: data.position })
      }

      onSuccess?.(data)

    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      setErrorMessage(message)
      setFormState('error')
      track(ANALYTICS_EVENTS.WAITLIST_SIGNUP_ERROR, { error_message: message })
    }
  }, [email, name, userType, formState, track, onSuccess])

  const reset = useCallback(() => {
    setFormState('idle')
    setEmail('')
    setName('')
    setResult(null)
    setErrorMessage(null)
    hasStarted.current = false
  }, [])

  return {
    formState,
    email,
    name,
    result,
    errorMessage,
    setEmail,
    setName,
    handleFirstFocus,
    handleSubmit,
    reset,
  }
}