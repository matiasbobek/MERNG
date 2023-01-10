import React, { useState } from "react";
import { Menu, MenuItemProps } from "semantic-ui-react";

function MenuBar() {
  const [activeItem, setActiveItem] = useState("home");

  const handleItemClick = (_: any, { name }: MenuItemProps) =>
    setActiveItem(name!);

  return (
    <Menu pointing secondary>
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
      />
      <Menu.Menu position="right">
        <Menu.Item
          name="login"
          active={activeItem === "login"}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="register"
          active={activeItem === "register"}
          onClick={handleItemClick}
        />
      </Menu.Menu>
    </Menu>
  );
}

export default MenuBar;
