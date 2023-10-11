import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useGetMovieBySearchQuery } from "../redux/services/tmdb";
import { useDispatch } from "react-redux";
import { setLastLink, setOpenSideBar } from "../redux/features/movieSlice";

const Container = styled.div`
  position: relative;
  display: inline-block; /* Добавляем inline-block, чтобы контейнер занимал только необходимую ширину и не растягивался на всю ширину. */
`;

const Input = styled.input`
  height: 2rem;
  width: 15rem;
  border: none;
  border-radius: 9999px;
  background-color: #414a4c;
  color: white;
  padding-right: 2rem; /* Устанавливаем отступ справа, чтобы уступить место для иконки. */

  @media (max-width: 640px) {
    width: 8rem;
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  right: 10px;
  top: 50%; /* Выравниваем иконку вертикально по середине контейнера. */
  transform: translateY(
    -50%
  ); /* Сдвигаем иконку вертикально на половину ее собственной высоты. */
  cursor: pointer;
`;

const Results = styled.div`
  margin-top: 25rem;
  position: absolute;
  background-color: grey;
  opacity: 0.9;
  color: white;
  width: 25rem;
  border-radius: 1.5rem;
`;

const Result = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Box = styled.div`
  width: 50%;
`;

const Image = styled.img`
  width: 3rem;
`;

const SearchBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isFetching, error } = useGetMovieBySearchQuery(searchTerm);
  const [result, setResult] = useState([]);

  useEffect(() => {
    if (data) {
      console.log(data);
      setResult(data.results.slice(0, 5));
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate(`/search/${searchTerm}`);
  };

  const handleCLick = (id) => {
    dispatch(setOpenSideBar(false));
    dispatch(setLastLink("/trending"));
    navigate(`/movie/${id}`);
    setSearchTerm("");
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <Container>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Search everything..."
            onChange={handleChange}
          />
        </form>

        <SearchIcon className="search-icon" />
      </Container>
      <Results>
        {result?.map((data) => (
          <Result onClick={(id) => handleCLick(data.id)}>
            <Box>
              <Image
                src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`}
              />
            </Box>
            <Box>{data.title}</Box>
          </Result>
        ))}
      </Results>
    </>
  );
};

export default SearchBar;
