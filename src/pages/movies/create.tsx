import React, { useContext } from 'react';
import { TextField } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { Colors } from '@/enums';
import { useDropzone } from 'react-dropzone';
import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';
import { AppLayout } from '@/layouts';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { Context as MovieContext, MoviesContextType } from '@/context/movie';
import { useRouter } from 'next/router';
import { addMovie } from '@/context/movie';
import { useAppToast } from '@/providers';

interface FormValues {
  title: string;
  publishedYear: number;
}

const CreateMoviePage: React.FC = () => {
  const toast = useAppToast();
  const { state, addMovie } = useContext<MoviesContextType>(MovieContext);
  const router = useRouter();
  const [filePreview, setFilePreview] = React.useState<string | null>(null);
  const [imageBase64, setImageBase64] = React.useState<string | null>(null);

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setFilePreview(URL.createObjectURL(file));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  React.useEffect(() => {
    // Clean up the URL object
    return () => {
      if (filePreview) {
        URL.revokeObjectURL(filePreview);
      }
    };
  }, [filePreview]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.png'],
    },
  });

  return (
    <AppLayout title="Create Movie">
      <Container>
        <TitleContainer>
          <Title>Create a new movie</Title>
        </TitleContainer>
        <MovieFormContainer>
          {filePreview ? (
            <ImagePreviewContainer>
              <ImagePreview src={filePreview} alt="Uploaded image preview" />
              <ClearButton onClick={() => setFilePreview(null)}>
                <CloseIcon sx={{ color: '#fff', fontSize: 48 }} />
              </ClearButton>
            </ImagePreviewContainer>
          ) : (
            <DropzoneContainer {...getRootProps()}>
              <input {...getInputProps()} />
              <DropMessage>
                <SaveAltIcon sx={{ color: '#fff' }} />
                <DropMessageText>Drop an image here</DropMessageText>
              </DropMessage>
            </DropzoneContainer>
          )}
          <Formik<FormValues>
            initialValues={{ title: '', publishedYear: 0 }}
            onSubmit={(values, actions) => {
              if (!imageBase64) {
                toast.error('Please upload an image');
                return;
              }
              addMovie({ ...values, image: imageBase64 }, { toast, router });
            }}
          >
            {({ isSubmitting, values, handleBlur, handleChange }) => (
              <StyledForm>
                <StyledField
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={values.title}
                  onChange={handleChange('title')}
                  onBlur={handleBlur('title')}
                  InputLabelProps={{
                    style: { color: 'white', fontWeight: 400 },
                  }}
                  InputProps={{
                    autoComplete: 'title',
                    sx: {
                      borderRadius: '10px',
                      backgroundColor: '#224957',
                      '& .MuiInputBase-input': {
                        color: 'white',
                      },
                    },
                  }}
                />
                <StyledField
                  type="number"
                  name="publishedYear"
                  value={values.publishedYear}
                  onChange={handleChange('publishedYear')}
                  onBlur={handleBlur('publishedYear')}
                  placeholder="Publishing year"
                  InputProps={{
                    autoComplete: 'publishedYear',
                    sx: {
                      borderRadius: '10px',
                      backgroundColor: '#224957',
                      '& .MuiInputBase-input': {
                        color: 'white',
                      },
                    },
                  }}
                />
                <ButtonContainer>
                  <Button type="button" onClick={() => router.push('/movies')}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting || !imageBase64}>
                    Submit
                  </Button>
                </ButtonContainer>
              </StyledForm>
            )}
          </Formik>
        </MovieFormContainer>
      </Container>
    </AppLayout>
  );
};

export default CreateMoviePage;

const ClearButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px 20px;
  background-color: transparent;
  opacity: 0;
  border: none;
  border-radius: 200px;
  cursor: pointer;
  color: #333;
  &:hover {
    opacity: 1;
    border: 2px solid #fff;
  }
`;

const MovieFormContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  max-width: 996px;
`;

const Title = styled.h1`
  color: #fff;
  margin-bottom: 120px;
  font-size: 48px;
  font-weight: 600;
`;

const DropzoneContainer = styled.div`
  border: 2px dashed #fff;
  border-radius: 12px;
  width: 473px;
  height: 504px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  margin-right: 127px;
  cursor: pointer;
  color: #fff;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 400px;
`;

const StyledField = styled(TextField)`
  margin-bottom: 24px;
  border-radius: 10px;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 10px;
  height: 56px;
  margin-right: 10px;
  cursor: pointer;
  flex: 1;
  font-size: 16px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;

  &:first-of-type {
    background-color: transparent;
    color: #fff;
    border: 1px solid #fff;
  }

  &:last-of-type {
    background-color: #4caf50;
    color: #fff;
    margin: 0;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 64px;
`;

const DropMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const DropMessageText = styled.p`
  margin: 0;
  margin-top: 12px;
`;

const ImagePreviewContainer = styled.div`
  position: relative;
  border: 2px dashed #fff;
  border-radius: 12px;
  width: 473px;
  height: 504px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  margin-right: 127px;
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 12px;
  object-fit: cover;
`;
