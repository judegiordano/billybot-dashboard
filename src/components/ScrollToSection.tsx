import React from "react";

export const ScrollToSection = ({ id, text }: { id: string, text: string }) => {
	return (
		<span className="text-blue-500 hover:cursor-pointer" onClick={() => {
			const card = document.querySelector(`#${id}`);
			card?.scrollIntoView({ behavior: "smooth", block: "start" });
		}}>{text}</span>
	);
};
