import { useAuth } from '@/providers/auth-provider'
import React, { PropsWithChildren, useCallback, useState } from 'react'
import { UIButton, UIFlexBox } from '../UI'
import { Input, TextField } from '@mui/material'
import { Colors } from '@/enums'

interface IProtectedRoute extends PropsWithChildren {}

export const ProtectedRoute: React.FC<IProtectedRoute> = ({ children }) => {
  const { isAuthenticated, setIsAuthenticated } = useAuth()
  const [password, setPassword] = useState('')

  const handleChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }, [setPassword])

  const handleAuthentication = useCallback(() => {
    fetch('/api/login', {
      method: "POST",
      body: JSON.stringify({
        password
      })
    })
      .then(res => res.json())
      .then(({ isAuthenticated }) => {
        setIsAuthenticated(isAuthenticated)
      })
      .finally(() => {
        setPassword('')
      })
  }, [password, setIsAuthenticated])

  if(!isAuthenticated) {
    return (
      <UIFlexBox 
        sx={{
          width: '100%',
          height: '100%',
          minHeight: '520px',
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <UIFlexBox 
          sx={{
            padding: '16px',
            border: '1px solid',
            width: '100%',
            height: 'fit-content',
            maxWidth: '320px',
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            borderRadius: '6px',
            gap: '12px'
          }}
        >
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={handleChangePassword}
            fullWidth
            variant='outlined'
            color="info"
          />

          <UIButton
            title='Login'
            iconSize={18}
            buttonColor={Colors.WHITE}
            buttonBackground={Colors.BLACK}
            hoverColor={Colors.GRAY_HOVER}
            rounded
            width={288}
            onClick={handleAuthentication}
          />
        </UIFlexBox>
      </UIFlexBox>
    )
  }

  return (
    <div>
      {children}
    </div>
  )
}