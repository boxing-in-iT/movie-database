import React, { useState } from "react";
import styled from "styled-components";

const Section = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Buttons = styled.div`
  display: flex;
  gap: 3.5rem;
`;

const MediaContainer = styled.div`
  /* width: 10%; */
`;

const ImageContainer = styled.div`
  display: flex;
  overflow-x: auto;
  max-width: 950px;
  border-radius: 25px 0 0 25px;
`;

const Image = styled.img`
  width: ${(props) => (props.mediaType === "backdrops" ? "25rem" : "15rem")};
`;

const Text = styled.h4`
  cursor: pointer;
`;

const Media = ({ data }) => {
  const [mediaType, setMediaType] = useState("backdrops");
  const [currentData, setCurrentData] = useState(data?.backdrops);

  const handleClick = (newMediaType) => {
    setMediaType(newMediaType);
    switch (newMediaType) {
      case "backdrops":
        console.log("bd");
        setCurrentData(data?.backdrops);
        break;
      case "posters":
        console.log("pt");
        setCurrentData(data?.posters);
        break;
      default:
        setCurrentData([]);
        break;
    }
  };
  return (
    <Section>
      <Title>
        <h3>Media</h3>
        <Buttons>
          {/* <h4 onClick={() => handleClick("popular")}>Popular</h4> */}
          <Text onClick={() => handleClick("backdrops")}>Images</Text>
          <Text onClick={() => handleClick("posters")}>Posters</Text>
        </Buttons>
        <div>
          <a>All {mediaType}</a>
        </div>
      </Title>
      <MediaContainer>
        <ImageContainer>
          {currentData.slice(0, 7).map((data, index) => (
            <Image
              mediaType={mediaType}
              src={`https://image.tmdb.org/t/p/w500${data?.file_path}`}
            />
          ))}
        </ImageContainer>
      </MediaContainer>
    </Section>
  );
};

export default Media;
