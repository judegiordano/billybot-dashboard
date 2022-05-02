import React from "react";

export const ScrollToSection = ({ id, text }: { id: string, text: string }) => {
	return (
		<span className="text-theme-purple hover:cursor-pointer" onClick={() => {
			const card = document.querySelector(`#${id}`);
			card?.scrollIntoView({ behavior: "smooth", block: "start" });
		}}>{text}</span>
	);
};
