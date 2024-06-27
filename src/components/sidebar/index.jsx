import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";

const menuItemStyles = {
	button: {
		// the active class will be added automatically by react router
		// so we can use it to style the active menu item
		[`&.active`]: {
			backgroundColor: "#13395e",
			color: "#b6c8d9",
		},
	},
};

function SideBarNav() {
	<Sidebar>
		<Menu menuItemStyles={menuItemStyles}>
			<MenuItem component={<Link to="/home" />}></MenuItem>
		</Menu>
	</Sidebar>;
}

export default SideBarNav;
