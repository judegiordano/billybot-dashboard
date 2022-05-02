import React from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import toast, { Toaster, ToastBar } from "react-hot-toast";

export const Notifications = () => {
	return (
		<>
			<Toaster
				position="top-right"
				gutter={4}
				toastOptions={{
					duration: 3000
				}}
			>
				{(t) => (
					<ToastBar toast={t}>
						{({ icon, message }) => (
							<>
								{icon}
								{message}
								{t.type !== "loading" && (
									<>
										<IconButton>
											<CloseIcon onClick={() => toast.dismiss(t.id)} />
										</IconButton>
									</>
								)}
							</>
						)}
					</ToastBar>
				)}
			</Toaster>
		</>
	);
};
