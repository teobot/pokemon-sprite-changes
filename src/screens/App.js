import { useEffect, useState } from "react";

import axios from "axios";

import PokemonTimelineElement from "../component/PokemonTimelineElement";

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

import "../css/App.css";

import { FAN_FAVORITES } from "../data/data";

import {
  Container,
  Divider,
  Header,
  Input,
  Button,
  Segment,
  Checkbox,
} from "semantic-ui-react";
import GithubBanner from "../component/GithubBanner";

export const capitalizeFirstCharInString = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

function App() {
  const [pokemonData, setPokemonData] = useState(null);
  const [search, setSearch] = useState("Charizard");
  const [shinyEnabled, setShinyEnabled] = useState(false);

  const getPokemonData = async (pokemonString) => {
    try {
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonString
          .toLowerCase()
          .trim()}`
      );
      setPokemonData(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    getPokemonData(search);
  }, []);

  if (!pokemonData) {
    return <div>Loading...</div>;
  }

  const IMAGE_KEY = shinyEnabled ? "front_shiny" : "front_default";

  return (
    <Container fluid className="App">
      <Divider hidden section />
      <Container>
        <Header inverted>
          <span style={{ fontSize: "calc(32px + 2vw)" }}>
            {capitalizeFirstCharInString(pokemonData.name)}
          </span>
        </Header>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            backgroundColor: "#434850",
            padding: "1em",
            borderRadius: 5,
          }}
        >
          <span
            style={{
              color: "white",
              marginRight: 10,
              fontSize: "calc(12px + 0.25vw)",
            }}
          >
            Enable Shiny :
          </span>
          <Checkbox
            toggle
            value={shinyEnabled}
            onChange={() => {
              setShinyEnabled(!shinyEnabled);
            }}
          />
        </div>
        <Divider />
        <Input
          className="input-shade"
          inverted
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          value={search}
          fluid
          size="huge"
          label={
            <Button
              inverted
              onClick={() => {
                getPokemonData(search);
              }}
            >
              Search
            </Button>
          }
          labelPosition="right"
          placeholder="Search Pokemon"
        />
        <Segment style={{ backgroundColor: "#434850", color: "white", overflowX: "auto" }}>
          Fan Favorites:
          {FAN_FAVORITES.map((pokemon, index) => {
            return (
              <span
                style={{
                  color: "white",
                  padding: "0px 10px",
                  textDecoration: "underline",
                  fontWeight: "bolder",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setSearch(pokemon);
                  getPokemonData(pokemon);
                }}
              >
                {pokemon}
              </span>
            );
          })}
        </Segment>
      </Container>
      <VerticalTimeline>
        {Object.keys(pokemonData.sprites.versions).map(function (key, index) {
          return (
            <PokemonTimelineElement
              key={index}
              pokemonKey={key}
              pokemonIndex={index}
              pokemonData={pokemonData}
              imageKey={IMAGE_KEY}
              shinyEnabled={shinyEnabled}
            />
          );
        })}
        <VerticalTimelineElement
          contentStyle={{ color: "#fff" }}
          iconStyle={{ background: "rgb(16, 204, 82)", color: "#fff" }}
          date={`${new Date().getFullYear()}`}
        />
      </VerticalTimeline>
      <Divider hidden section />
      <GithubBanner />
    </Container>
  );
}

export default App;
