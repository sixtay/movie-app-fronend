import createDataContext from '@/libs/create-data-context';

import { MOVIE } from '../../constants/store';
import { ToastContextType } from '@/providers/toast-provider';
import {
  CreateMovieDocument,
  CreateMovieInput,
  CreateMovieMutation,
  GetAllMoviesDocument,
  GetAllMoviesQuery,
  RemoveMovieDocument,
  RemoveMovieMutation,
  UpdateMovieDocument,
  UpdateMovieMutation,
  useGetAllMoviesQuery,
} from '@/api/graphql/generated/graphql';
import { client } from '@/graphql/apollo';

type ToastFn = ({ severity, message }: ToastContextType) => void;
const sampleMovieData = [
  {
    title: 'The Shawshank Redemption',
    publishedYear: 1994,
    image: 'https://placehold.co/266x400',
  },
  {
    title: 'The Godfather',
    publishedYear: 1972,
    image: 'https://placehold.co/266x400',
  },
  {
    title: 'The Dark Knight',
    publishedYear: 2008,
    image: 'https://placehold.co/266x400',
  },
  {
    title: '12 Angry Men',
    publishedYear: 1957,
    image: 'https://placehold.co/266x400',
  },
  {
    title: "Schindler's List",
    publishedYear: 1993,
    image: 'https://placehold.co/266x400',
  },
  {
    title: 'The Lord of the Rings: The Return of the King',
    publishedYear: 2003,
    image: 'https://placehold.co/266x400',
  },
  {
    title: 'Pulp Fiction',
    publishedYear: 1994,
    image: 'https://placehold.co/266x400',
  },
  {
    title: 'The Good, the Bad and the Ugly',
    publishedYear: 1966,
    image: 'https://placehold.co/266x400',
  },
  {
    title: 'Fight Club',
    publishedYear: 1999,
    image: 'https://placehold.co/266x400',
  },
  {
    title: 'Forrest Gump',
    publishedYear: 1994,
    image: 'https://placehold.co/266x400',
  },
  {
    title: 'Inception',
    publishedYear: 2010,
    image: 'https://placehold.co/266x400',
  },
  {
    title: 'Star Wars: Episode V - The Empire Strikes Back',
    publishedYear: 1980,
    image: 'https://placehold.co/266x400',
  },
  {
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    publishedYear: 2001,
    image: 'https://placehold.co/266x400',
  },
  {
    title: "One Flew Over the Cuckoo's Nest",
    publishedYear: 1975,
    image: 'https://placehold.co/266x400',
  },
  {
    title: 'Goodfellas',
    publishedYear: 1990,
    image: 'https://placehold.co/266x400',
  },
  {
    title: 'The Matrix',
    publishedYear: 1999,
    image: 'https://placehold.co/266x400',
  },
  {
    title: 'Seven Samurai',
    publishedYear: 1954,
    image: 'https://placehold.co/266x400',
  },
  {
    title: 'City of God',
    publishedYear: 2002,
    image: 'https://placehold.co/266x400',
  },
  {
    title: 'Se7en',
    publishedYear: 1995,
    image: 'https://placehold.co/266x400',
  },
  {
    title: 'The Silence of the Lambs',
    publishedYear: 1991,
    image: 'https://placehold.co/266x400',
  },
];

export const fetchMovies =
  (dispatch: React.Dispatch<any>) => async (): Promise<void> => {
    try {
      dispatch({ type: MOVIE.FETCHMOVIESATTEMPTED });
      const getAllMoviesResponse = await client.query<GetAllMoviesQuery>({
        query: GetAllMoviesDocument,
      });

      dispatch({
        type: MOVIE.FETCHMOVIESSUCCESS,
        payload: (await getAllMoviesResponse).data.movies,
      });
    } catch (error) {
      dispatch({ type: MOVIE.FETCHMOVIESFAILED });
    }
  };

export const addMovie =
  (dispatch: React.Dispatch<any>) =>
  async (
    movie: Omit<Movie, 'id'>,
    { toast, router }: { toast: ToastFn; router: any }
  ): Promise<void> => {
    try {
      const createMovieResponse = await client.mutate<
        CreateMovieMutation,
        { input: CreateMovieInput }
      >({
        mutation: CreateMovieDocument,
        variables: {
          input: movie,
        },
      });

      if (createMovieResponse.data?.createMovie) {
        dispatch({
          type: MOVIE.ADDMOVIESUCCESS,
          payload: createMovieResponse.data.createMovie,
        });
        router.push('/movies');
      } else {
        dispatch({ type: MOVIE.ADDMOVIEFAILED });
      }
    } catch (error) {
      dispatch({ type: MOVIE.ADDMOVIEFAILED });
    }
  };

export const deleteMovie =
  (dispatch: React.Dispatch<any>) =>
  async (movieId: string): Promise<void> => {
    try {
      const removeMovieResponse = await client.mutate<RemoveMovieMutation>({
        mutation: RemoveMovieDocument,
        variables: {
          id: movieId,
        },
      });
      if (removeMovieResponse.data?.removeMovie) {
        dispatch({
          type: MOVIE.DELETEMOVIESSUCCESS,
          payload: removeMovieResponse.data?.removeMovie.id,
        });
      } else {
        dispatch({ type: MOVIE.DELETEMOVIESFAILED });
      }
    } catch (error) {
      dispatch({ type: MOVIE.DELETEMOVIESFAILED });
    }
  };

export const updateMovie =
  (dispatch: React.Dispatch<any>) =>
  async (movieId: string, updatedMovie: Movie): Promise<void> => {
    try {
      const updateMovieResponse = await client.mutate<UpdateMovieMutation>({
        mutation: UpdateMovieDocument,
        variables: {
          id: movieId,
          input: updatedMovie,
        },
      });

      if (updateMovieResponse.data?.updateMovie) {
        dispatch({
          type: MOVIE.UPDATEMOVIESSUCCESS,
          payload: updateMovieResponse.data?.updateMovie,
        });
      } else {
        dispatch({ type: MOVIE.UPDATEMOVIESFAILED });
      }
    } catch (error) {
      dispatch({ type: MOVIE.UPDATEMOVIESFAILED });
    }
  };

export const actions = {
  fetchMovies,
  addMovie,
  deleteMovie,
  updateMovie,
};

export type MoviesActionsType = typeof actions;

export type BoundedMoviesActionsType = {
  [K in keyof MoviesActionsType]: ReturnType<MoviesActionsType[K]>;
};

export type MoviesContextType = {
  state: Record<string, any>;
} & BoundedMoviesActionsType;

const moviesReducer = (state: Record<string, any>, action: any) => {
  switch (action.type) {
    case MOVIE.FETCHMOVIESSUCCESS:
      return {
        ...state,
        movies: action.payload,
        loading: false,
        initialMoviesLoaded: true,
        error: null,
      };
    case MOVIE.FETCHMOVIESFAILED:
      return {
        ...state,
        movies: [],
        loading: false,
        error: 'Failed to fetch movies.',
      };
    case MOVIE.ADDMOVIESUCCESS:
      return {
        ...state,
        movies: [...state.movies, action.payload],
        loading: false,
        error: null,
      };
    case MOVIE.ADDMOVIEFAILED:
      return {
        ...state,
        loading: false,
        error: 'Failed to add movie.',
      };
    case MOVIE.DELETEMOVIESSUCCESS:
      return {
        ...state,
        movies: state.movies.filter(
          (movie: Movie) => movie.id !== action.payload
        ),
        loading: false,
        error: null,
      };
    case MOVIE.DELETEMOVIESFAILED:
      return {
        ...state,
        loading: false,
        error: 'Failed to delete movie.',
      };
    case MOVIE.UPDATEMOVIESSUCCESS:
      return {
        ...state,
        movies: state.movies.map((movie: Movie) =>
          movie.id === action.payload.id ? action.payload : movie
        ),
        loading: false,
        error: null,
      };
    case MOVIE.UPDATEMOVIESFAILED:
      return {
        ...state,
        loading: false,
        error: 'Failed to update movie.',
      };
    default:
      return state;
  }
};

export const { Provider, Context } = createDataContext(moviesReducer, actions, {
  movies: sampleMovieData,
  loading: false,
  initialMoviesLoaded: false,
  error: null,
});

type Movie = {
  id: string;
  title: string;
  image: string;
  publishedYear: number;
};
