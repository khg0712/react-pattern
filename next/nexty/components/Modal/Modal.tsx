import { useEffect, useRef, useState } from "react";
import ClientOnlyPortal from "./ClientOnlyPortal";

export default function Modal() {
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLInputElement>(null);
	useEffect(() => {
		if (open) {
			ref.current?.focus();
			console.log(1);
		}
	}, [open]);

	return (
		<>
			<button type="button" onClick={() => setOpen(true)}>
				Open Modal
			</button>
			{open && (
				<ClientOnlyPortal selector="#modal-root">
					<div className="backdrop">
						<div className="modal">
							<p>
								This modal is rendered using{" "}
								<a
									href="https://reactjs.org/docs/portals.html"
									target="_blank"
									rel="noopener noreferrer"
								>
									portals
								</a>
								.
							</p>
							<input type="text" ref={ref} />
							<button type="button" onClick={() => setOpen(false)}>
								Close Modal
							</button>
						</div>
						<style jsx>{`
							:global(body) {
								overflow: hidden;
							}

							.backdrop {
								position: fixed;
								background-color: rgba(0, 0, 0, 0.7);
								top: 0;
								right: 0;
								bottom: 0;
								left: 0;
							}

							.modal {
								background-color: white;
								position: absolute;
								top: 10%;
								right: 10%;
								bottom: 10%;
								left: 10%;
								padding: 1em;
							}
						`}</style>
					</div>
				</ClientOnlyPortal>
			)}
		</>
	);
}
