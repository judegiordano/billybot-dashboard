import React from "react";

interface IEmptyDataStateProps {
	text: string
}

export const EmptyDataState: React.FC<IEmptyDataStateProps> = ({
	text
}: IEmptyDataStateProps): JSX.Element => {
	return (
		<div className="min-h-screen pt-10 m-auto text-[20px] font-medium text-center text-theme-gray">
			{text}
		</div>
	);
};
