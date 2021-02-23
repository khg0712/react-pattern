import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ClientOnlyPortalProp {
	selector: string;
}

const ClientOnlyPortal: React.FC<ClientOnlyPortalProp> = function ({
	children,
	selector,
}) {
	const ref = useRef<Element | null>(null);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		const portal = document.querySelector(selector);
		ref.current = portal;
		setMounted(true);
	}, [selector]);

	return mounted ? createPortal(children, ref.current as Element) : null;
};

export default ClientOnlyPortal;
