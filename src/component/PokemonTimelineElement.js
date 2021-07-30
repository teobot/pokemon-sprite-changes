import React, { useState } from "react";

import { GENERATION_RELEASE_DATES, EXCLUDE_ICON_NAMES } from "../data/data";

import { capitalizeAllAfterDash } from "../functions/functions";

import { capitalizeFirstCharInString } from "../screens/App";

import { VerticalTimelineElement } from "react-vertical-timeline-component";

import { Header, Image } from "semantic-ui-react";

import useWindowWidth from "../functions/useDimensions";

function PokemonTimelineElement({
  pokemonData,
  pokemonKey,
  pokemonIndex,
  imageKey,
  shinyEnabled,
}) {
  // window dimensions
  const { windowWidth, windowHeight } = useWindowWidth();

  // The Release date of the generation
  const release_date = GENERATION_RELEASE_DATES.find(
    (element) => element.name.toLowerCase() === pokemonKey.toLowerCase()
  );

  // Object of images of the pokemon
  const images =
    pokemonData.sprites.versions[pokemonKey][
      Object.keys(pokemonData.sprites.versions[pokemonKey])[0]
    ];

  const didLastGenHaveImage = () => {
    let didLastGenHaveImage = false;
    const prevImages = pokemonData.sprites.versions[
      Object.keys(pokemonData.sprites.versions)[pokemonIndex - 1]
    ]
      ? pokemonData.sprites.versions[
          Object.keys(pokemonData.sprites.versions)[pokemonIndex - 1]
        ]
      : {};

    for (const [key, value] of Object.entries(prevImages)) {
      // Foreach games in the prev generation
      if (value[imageKey]) {
        // If the current game has an image
        didLastGenHaveImage = true;
        break;
      }
    }
    return didLastGenHaveImage;
  };

  // Variable true if the current generation has a image.
  const didThisGenHaveImage = images[imageKey] ? true : false;

  // If the previous generation didn't have a image and the current generation has a image,
  // then the current generation must be the first generation that the pokemon was introduced.
  const isGenFirstToRelease = !didLastGenHaveImage() && didThisGenHaveImage;

  return (
    <VerticalTimelineElement
      key={pokemonKey}
      date={release_date.release}
      iconStyle={{
        background: isGenFirstToRelease ? "orange" : "rgb(33, 150, 243)",
      }}
      contentStyle={{ background: "#434850", color: "#fff" }}
    >
      <Header inverted as="h1">
        {capitalizeAllAfterDash(pokemonKey)}
      </Header>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          overflowX: "auto"
        }}
      >
        {didThisGenHaveImage ? (
          Object.keys(pokemonData.sprites.versions[pokemonKey]).map(function (
            gameKey,
            gameIndex
          ) {
            if (EXCLUDE_ICON_NAMES.includes(gameKey) || !images[imageKey]) {
              // TODO: There is no image, this can be because it wasn't invented or the data is missing.
              return (
                <div>This gen has incomplete images of {pokemonData.name}.</div>
              );
            } else {
              return (
                <div
                  style={{
                    display: "flex",
                    flex: 1,
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  key={gameKey}
                >
                  <div style={{ padding: 10 }}>
                    <Image
                      size={windowWidth > 600 ? "small" : "tiny"}
                      src={images[imageKey]}
                    />
                  </div>
                  <div style={{ padding: 10 }}>
                    <Header inverted as="h2">
                      {capitalizeFirstCharInString(gameKey)}
                    </Header>
                  </div>
                </div>
              );
            }
          })
        ) : (
          <div>
            This gen has no {shinyEnabled ? "shiny" : ""} images of{" "}
            {pokemonData.name}.
          </div>
        )}
      </div>
    </VerticalTimelineElement>
  );
}

export default PokemonTimelineElement;
