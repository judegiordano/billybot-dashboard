import React, { ReactNode } from "react";
import Link from "next/link";

interface IAppLinkProps {
	href: string
	children: ReactNode
	target?: "_self" | "_blank" | "_parent" | "_top"
}

export const AppLink = ({
	href,
	children,
	target = "_top"
}: IAppLinkProps): JSX.Element => {
	return <Link href={href}><a target={target} className="text-blue-500">{children}</a></Link>;
};
