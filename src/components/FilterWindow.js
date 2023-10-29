import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Container = styled.div`
  margin-top: 2rem;
  background-color: #f0f0f0;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Filters = styled.div`
  display: flex;
  flex-direction: column;
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

const FilterRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.25rem;
  margin-bottom: 10px;
`;

const FilterLabel = styled.label`
  margin-right: 10px;
`;

const GenreButton = styled.button`
  padding: 8px;
  background-color: ${(props) => (props.active ? "#007bff" : "#ccc")};
  color: ${(props) => (props.active ? "#fff" : "#000")};
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
`;

const Button = styled.button`
  background-color: green;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
`;

const FilterWindow = ({
  onClick,
  selectedFilters,
  setSelectedFilters,
  setFilterOpen,
  setCurrentPage,
  genres,
}) => {
  const [selectedGenres, setSelectedGenres] = useState(selectedFilters.genres);
  const [selectedFromDate, setSelectedFromDate] = useState(null);
  const [selectedToDate, setSelectedToDate] = useState(null);
  const [selectedCertifications, setSelectedCertifications] = useState([]);

  // const genres = [
  //   {
  //     id: 28,
  //     name: "Action",
  //   },
  //   {
  //     id: 12,
  //     name: "Adventure",
  //   },
  //   {
  //     id: 16,
  //     name: "Animation",
  //   },
  //   {
  //     id: 35,
  //     name: "Comedy",
  //   },
  //   {
  //     id: 80,
  //     name: "Crime",
  //   },
  //   {
  //     id: 99,
  //     name: "Documentary",
  //   },
  //   {
  //     id: 18,
  //     name: "Drama",
  //   },
  //   {
  //     id: 10751,
  //     name: "Family",
  //   },
  //   {
  //     id: 14,
  //     name: "Fantasy",
  //   },
  //   {
  //     id: 36,
  //     name: "History",
  //   },
  //   {
  //     id: 27,
  //     name: "Horror",
  //   },
  //   {
  //     id: 10402,
  //     name: "Music",
  //   },
  //   {
  //     id: 9648,
  //     name: "Mystery",
  //   },
  //   {
  //     id: 10749,
  //     name: "Romance",
  //   },
  //   {
  //     id: 878,
  //     name: "Science Fiction",
  //   },
  //   {
  //     id: 10770,
  //     name: "TV Movie",
  //   },
  //   {
  //     id: 53,
  //     name: "Thriller",
  //   },
  //   {
  //     id: 10752,
  //     name: "War",
  //   },
  //   {
  //     id: 37,
  //     name: "Western",
  //   },
  // ];

  const handleGenreClick = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleCertificationClick = (certification) => {
    if (selectedCertifications.includes(certification)) {
      setSelectedCertifications(
        selectedCertifications.filter((c) => c !== certification)
      );
    } else {
      setSelectedCertifications([...selectedCertifications, certification]);
    }
  };

  const handleFilterChange = () => {
    // Update selected filters based on user selections
    console.log(selectedGenres);
    setCurrentPage(1);
    setFilterOpen(false);
    setSelectedFilters({
      genres: selectedGenres,
      fromDate: selectedFromDate,
      toDate: selectedToDate,
    });
  };

  return (
    <Container>
      <Header>
        <span>Filter Movies</span>
        <CloseButton onClick={onClick}>×</CloseButton>
      </Header>
      <Filters>
        <FilterRow>
          <FilterLabel>Genres:</FilterLabel>
          {genres?.map((data, index) => (
            <GenreButton
              active={selectedGenres.includes(data.id)}
              onClick={() => handleGenreClick(data.id)}
            >
              {data.name}
            </GenreButton>
          ))}
        </FilterRow>
        <FilterRow>
          <FilterLabel>Release Date:</FilterLabel>
          <DatePicker
            selected={selectedFromDate}
            onChange={(date) => setSelectedFromDate(date)}
            placeholderText="From"
          />
          <DatePicker
            selected={selectedToDate}
            onChange={(date) => setSelectedToDate(date)}
            placeholderText="To"
          />
        </FilterRow>
        <FilterRow>
          <FilterLabel>Certification:</FilterLabel>
          <GenreButton
            active={selectedCertifications.includes("NR")}
            onClick={() => handleCertificationClick("NR")}
          >
            NR
          </GenreButton>
          <GenreButton
            active={selectedCertifications.includes("G")}
            onClick={() => handleCertificationClick("G")}
          >
            G
          </GenreButton>
          <GenreButton
            active={selectedCertifications.includes("PG")}
            onClick={() => handleCertificationClick("PG")}
          >
            PG
          </GenreButton>
          <GenreButton
            active={selectedCertifications.includes("PG-13")}
            onClick={() => handleCertificationClick("PG-13")}
          >
            PG-13
          </GenreButton>
          <GenreButton
            active={selectedCertifications.includes("R")}
            onClick={() => handleCertificationClick("R")}
          >
            R
          </GenreButton>
          <GenreButton
            active={selectedCertifications.includes("NC-17")}
            onClick={() => handleCertificationClick("NC-17")}
          >
            NC-17
          </GenreButton>
        </FilterRow>
        <FilterRow>
          <Button onClick={handleFilterChange}>Search</Button>
        </FilterRow>
      </Filters>
    </Container>
  );
};

export default FilterWindow;
