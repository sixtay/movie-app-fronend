import React, { useContext, useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { Colors } from '@/enums';
import { useDropzone } from 'react-dropzone';
import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';
import { Button as MuiButton } from '@mui/material';
import { AppLayout } from '@/layouts';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Context as AuthContext, AuthContextType } from '@/context/auth';
import { Context as MovieContext, MoviesContextType } from '@/context/movie';
import { useAppToast } from '@/providers';
import { withAuth } from '@/hocs/auth';
interface FormValues {
  title: string;
  publishedYear: string;
}

const extentedMovieDataPagination = (
  extendedMovieData: { title: string; publishedYear: number; image: string }[],
  currentPage: number
) => {
  return extendedMovieData.slice((currentPage - 1) * 8, currentPage * 8);
};

const MoviesPage = () => {
  const router = useRouter();
  const toast = useAppToast();
  const { logOut } = useContext<AuthContextType>(AuthContext);
  const { state, addMovie, fetchMovies } =
    useContext<MoviesContextType>(MovieContext);
  const { loading, movies, initialMoviesLoaded } = state;
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setFilePreview(URL.createObjectURL(file));
    }
  }, []);

  useEffect(() => {
    return () => {
      if (filePreview) {
        URL.revokeObjectURL(filePreview);
      }
    };
  }, [filePreview]);

  useEffect(() => {
    if (!initialMoviesLoaded && !loading) fetchMovies();
  }, [initialMoviesLoaded]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.png'],
    },
  });

  return (
    <AppLayout
      title="Movies"
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
      }}
    >
      <Container>
        <PageNav>
          <TitleContainer>
            <Title>My movies</Title>
            <AddCircleOutlineIcon
              sx={{
                color: '#fff',
                fontSize: 32,
                marginTop: 1,
                cursor: 'pointer',
              }}
              onClick={() => router.push('/movies/create')}
            />
          </TitleContainer>
          <LogoutButton
            onClick={() => {
              logOut({ toast });
            }}
          >
            <LogoutText>Logout</LogoutText>
            <LogoutIcon sx={{ color: '#fff' }} />
          </LogoutButton>
        </PageNav>
        <MoviesListView>
          {movies && movies.length > 0 ? (
            extentedMovieDataPagination(movies, currentPage).map((movie) => (
              <MovieCard key={movie.title}>
                <img
                  src={movie.image}
                  width={266}
                  height={400}
                  alt="movie poster"
                  style={{
                    borderRadius: 12,
                    objectFit: 'cover',
                    alignSelf: 'center',
                  }}
                />
                <MovieDataContainer>
                  <MovieTitle>{movie.title}</MovieTitle>
                  <MovieYear>{movie.publishedYear}</MovieYear>
                </MovieDataContainer>
              </MovieCard>
            ))
          ) : (
            <MovieListEmptyMessage>
              Your movie list is empty
              <StyledButton
                variant="contained"
                size="large"
                onClick={() => router.push('/movies/create')}
              >
                Add a new Movie
              </StyledButton>
            </MovieListEmptyMessage>
          )}
          {movies && movies.length > 0 && (
            <MovieListPaginationContainer>
              <PaginationButton
                onClick={() => {
                  if (currentPage > 1) {
                    setCurrentPage(currentPage - 1);
                  }
                }}
              >
                Prev
              </PaginationButton>
              {Array.from(
                Array(Math.ceil(state?.movies.length / 8)).keys()
              ).map((page) => (
                <PaginationButton
                  key={page}
                  oddPage={(page + 1) % 2 === 0}
                  onClick={() => setCurrentPage(page + 1)}
                  isActive={page + 1 === currentPage}
                >
                  {page + 1}
                </PaginationButton>
              ))}
              <PaginationButton
                onClick={() => {
                  if (currentPage < Math.ceil(state?.movies.length / 8)) {
                    setCurrentPage(currentPage + 1);
                  }
                }}
              >
                Next
              </PaginationButton>
            </MovieListPaginationContainer>
          )}
        </MoviesListView>
      </Container>
    </AppLayout>
  );
};

export default withAuth()(MoviesPage);

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

const TitleContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 220px;
  max-width: 1200px;
`;

const Title = styled.h1`
  color: #fff;
  font-size: 48px;
  font-weight: 600;
  margin: 0;
  margin-right: 14px;
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

const PageNav = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 120px;
`;

const LogoutText = styled.p`
  margin: 0;
  margin-right: 14px;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
`;

const LogoutButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #fff;
  border: none;
  background-color: transparent;
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

const MovieCard = styled.div`
  min-width: 282px;
  max-width: 282px;
  height: 504px;
  background-color: #fff;
  border-radius: 12px;
  flex: 4;
  margin-bottom: 24px;
  background-color: #092c39;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const MoviesListView = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 24px;
`;

const MovieTitle = styled.p`
  margin: 0;
  font-size: 20px;
  font-weight: 500;
  color: #fff;
  margin-bottom: 12px;
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const MovieYear = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 400;
  color: #fff;
  margin-bottom: 16px;
`;

const MovieDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px;
`;

const MovieListPaginationContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 120px;
`;

const PaginationButton = styled.button<{
  oddPage?: boolean;
  isActive?: boolean;
}>`
  border: none;
  border-radius: 4px;
  height: 32px;
  width: 32px;
  margin-right: 8px;
  cursor: pointer;
  color: #fff;
  font-size: 16px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  background-color: ${({ oddPage }) => (oddPage ? '#092C39' : '#4caf50')};
  border: ${({ isActive }) => (isActive ? '2px solid #fff' : 'none')};

  &:first-of-type {
    background-color: transparent;
    color: #fff;
    margin-right: 16px;
    width: unset;
  }

  &:last-of-type {
    background-color: transparent;
    color: #fff;
    margin: 0;
    margin-left: 8px;
    width: unset;
  }
`;

const MovieListEmptyMessage = styled.div`
  flex-direction: column;
  font-size: 48px;
  font-weight: 600;
  color: #fff;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 504px;
`;

const StyledButton = styled(MuiButton)`
  display: flex;
  border-radius: 10px;
  background-color: #2bd17e;
  margin-top: 24px;

  &:hover {
    background-color: #2fe58a;
    color: #404040;
  }
`;
