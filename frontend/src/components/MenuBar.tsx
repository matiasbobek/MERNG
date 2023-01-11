import React, { useEffect, useState } from "react";
import { Menu, MenuItemProps } from "semantic-ui-react";
import { Link } from "react-router-dom";

import PagesEnum from "../pages/PagesEnum";

function MenuBar() {
  const [activeItem, setActiveItem] = useState<string>();

  const pathname = window.location.pathname;

  const handleItemClick = (_: any, { name }: MenuItemProps) =>
    setActiveItem(name!);

  useEffect(() => {
    if (pathname === "/") setActiveItem(PagesEnum.Home);
    if (Object.values(PagesEnum).includes(pathname.substring(1) as PagesEnum))
      setActiveItem(pathname.substring(1));
  }, [pathname]);

  return (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item
        name={PagesEnum.Home}
        active={activeItem === PagesEnum.Home}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />
      <Menu.Menu position="right">
        <Menu.Item
          name={PagesEnum.Login}
          active={activeItem === PagesEnum.Login}
          onClick={handleItemClick}
          as={Link}
          to={`/${PagesEnum.Login}`}
        />
        <Menu.Item
          name={PagesEnum.Register}
          active={activeItem === PagesEnum.Register}
          onClick={handleItemClick}
          as={Link}
          to={`/${PagesEnum.Register}`}
        />
      </Menu.Menu>
    </Menu>
  );
}

export default MenuBar;
