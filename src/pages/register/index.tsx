import { AppLayout } from '@/layouts';
import styled from '@emotion/styled';
import { useContext } from 'react';
import { Button, TextField } from '@mui/material';
import { PasswordField } from '@/components/UI/Forms';
import Link from 'next/link';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useAppToast } from '@/providers';
import { Context as AuthContext, AuthContextType } from '@/context/auth';
import { withAuth } from '@/hocs/auth';

const initialValues = {
  email: '',
  password: '',
};

const RegisterPage = () => {
  const { registerUser } = useContext<AuthContextType>(AuthContext);

  const toast = useAppToast();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
  });

  return (
    <AppLayout title="Sign up" showPeople={false}>
      <FormPageContainer>
        <AuthPagesNavList>
          <RegisterLink href={'#'}>Sign up</RegisterLink>
        </AuthPagesNavList>
        <Formik
          initialValues={initialValues}
          onSubmit={(e) => registerUser(e, { toast })}
          validationSchema={validationSchema}
        >
          {(props) => (
            <SignUpFormContainer>
              <StyledTextField
                name="email"
                type="email"
                label="Email"
                value={props.values?.email}
                helperText={props.touched.email && props.errors?.email}
                error={Boolean(props.touched.email && props.errors?.email)}
                onChange={props.handleChange('email')}
                onBlur={props.handleBlur('email')}
                fullWidth
                InputLabelProps={{ style: { color: 'white' } }}
                InputProps={{
                  autoComplete: 'username',
                  sx: {
                    borderRadius: '10px',
                    backgroundColor: '#224957',
                    '& .MuiInputBase-input': {
                      color: 'white',
                    },
                  },
                }}
              />
              <StyledPasswordField
                name="password"
                label="Password"
                value={props.values?.password}
                helperText={props.touched?.password && props.errors?.password}
                error={Boolean(
                  props.touched?.password && props.errors?.password
                )}
                onChange={props.handleChange('password')}
                onBlur={props.handleBlur('password')}
                fullWidth
                autoComplete="current-password"
                aria-label="Password"
                InputLabelProps={{ style: { color: 'white' } }}
                InputProps={{
                  autoComplete: 'current-password',
                  sx: {
                    borderRadius: '10px',
                    backgroundColor: '#224957',
                    '& .MuiInputBase-input': {
                      color: 'white',
                    },
                  },
                }}
              />
              <StyledButton
                variant="contained"
                size="large"
                onClick={props.handleSubmit as (values: any) => void}
              >
                Continue
              </StyledButton>
            </SignUpFormContainer>
          )}
        </Formik>
        <CallToRegister>
          Already have an account?{' '}
          <RegisterText href={'/register'}>Login</RegisterText>
        </CallToRegister>
      </FormPageContainer>
    </AppLayout>
  );
};

export default withAuth({
  redirectIfUserIsAuthenticated: true,
})(RegisterPage);

const CallToRegister = styled.div`
  display: flex;
  margin-top: 24px;
  justify-content: center;
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
`;

const RegisterText = styled(Link)`
  font-weight: 700;
  padding-left: 10px;
  text-decoration: none;
`;

const FormPageContainer = styled.div`
  display: flex;
  margin: 0 auto;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
`;
const AuthPagesNavList = styled.div`
  display: flex;
`;
const SignUpFormContainer = styled.div`
  max-width: 300px;
  margin-top: 24px;
`;
const LoginLink = styled(Link)<{ active?: any }>`
  display: flex;
  flex: 1;
  justify-content: center;
  ${(props) => !props.active && `color: #FFFFFF;`}
  font-size: 64px;
  font-weight: 700;
  padding-bottom: 10px;
  margin-bottom: 10px;
  text-decoration: none;
`;

const RegisterLink = LoginLink;

const StyledTextField = styled(TextField)`
  margin-bottom: 20px;
  color: white;
`;

const StyledPasswordField = styled(PasswordField)``;

const StyledButton = styled(Button)`
  display: flex;
  flex: 1;
  width: 100%;
  border-radius: 10px;
  background-color: #2bd17e;
  margin-top: 24px;

  &:hover {
    background-color: #2fe58a;
    color: #404040;
  }
`;
