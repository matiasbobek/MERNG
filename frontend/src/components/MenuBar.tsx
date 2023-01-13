import { useEffect, useState } from "react";
import { Menu, MenuItemProps } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import PagesEnum from "../pages/PagesEnum";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function MenuBar() {
  const { userState, logout } = useContext(AuthContext);

  const [activeItem, setActiveItem] = useState<string>();
  const { pathname } = useLocation();

  const handleItemClick = (_: any, { name }: MenuItemProps) =>
    setActiveItem(name!);

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    if (pathname === "/") setActiveItem(PagesEnum.Home);
    if (Object.values(PagesEnum).includes(pathname.substring(1) as PagesEnum))
      setActiveItem(pathname.substring(1));
  }, [pathname]);

  const menuBar = userState.user ? (
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
          name={userState.user.username}
          onClick={() => alert("TODO->UserPage")}
          as={Link}
          to={pathname}
        />
        <Menu.Item name="Logout" onClick={handleLogout} />
      </Menu.Menu>
    </Menu>
  ) : (
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

  return menuBar;
}

export default MenuBar;
