import React from "react";

import { Icon, Menu } from "semantic-ui-react";

export default function GithubBanner() {
  return (
    <Menu inverted borderless stackable>
      <Menu.Menu position="left">
        <Menu.Item name="editorials">
          <Icon name="github" />
          <a href="https://github.com/teobot">
            Created by{" "}
            <span style={{ textDecoration: "underline", cursor: "pointer" }}>
              teobot
            </span>
          </a>
        </Menu.Item>
      </Menu.Menu>
      <Menu.Menu position="right">
        <Menu.Item name="editorials">
          <Icon name="world" />
          <a href="https://pokeapi.co/">
            Using the{" "}
            <span style={{ textDecoration: "underline", cursor: "pointer" }}>
              PokéAPI
            </span>{" "}
            API
          </a>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}
