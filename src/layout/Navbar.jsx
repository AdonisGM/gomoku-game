import {Card, CardBody} from "@nextui-org/react";
import NavbarItem from "./NavbarItem.jsx";
import {IconLayoutDashboard} from "@tabler/icons-react";
import {NavLink} from "react-router-dom";

const listNavbarItem = [
	{
		name: "Dashboard",
		icon: IconLayoutDashboard,
		color: 'blue',
		url: '/dashboard',
	}
]

const Navbar = () => {
	return <Card className={'overflow-auto flex-grow'}>
		<CardBody>
			{listNavbarItem.map((item, index) => (
				<NavLink to={item.url} key={index}>
					{({ isActive }) => (
						<NavbarItem
							name={item.name}
							icon={item.icon}
							color={item.color}
							isActive={isActive}
						/>
					)}
				</NavLink>
			))}
		</CardBody>
	</Card>
}

export default Navbar;