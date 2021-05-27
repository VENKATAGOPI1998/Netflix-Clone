import React, { useEffect, useState } from "react";
import "./NavBar.css";

function NavBar() {
	const [show, handleshow] = useState(false);
	useEffect(() => {
		window.addEventListener("scroll", () => {
			if (window.scrollY > 100) {
				handleshow(true);
			} else {
				handleshow(false);
			}
			return () => {
				window.removeEventListener("scroll");
			};
		});
	}, []);
	return (
		<div className={`nav ${show ? "nav_black" : ""}`}>
			<img
				className="nav_logo"
				src={
					"https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/799px-Netflix_2015_logo.svg.png"
				}
				alt={"netflix logo"}
			/>
			<img
				className="nav_avthar"
				src={
					"https://cache.desktopnexus.com/thumbseg/182/182024-bigthumbnail.jpg"
				}
				alt={"netflix logo"}
			/>
		</div>
	);
}

export default NavBar;
