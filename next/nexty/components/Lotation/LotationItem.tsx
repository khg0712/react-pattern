import { Product } from "../../types/Product";
import style from "../../styles/Lotation.module.css";

interface LotationItemProp {
	onClick?: () => void;
	value: Product;
	order: number;
}

function getClassName(order: number) {
	const className = `item-${order}`;
	if (order < 3) return style[className];
	return undefined;
}

export default function LotationItem({
	onClick,
	value,
	order,
}: LotationItemProp) {
	const className = getClassName(order);
	return <div className={className}>{value.name}</div>;
}
