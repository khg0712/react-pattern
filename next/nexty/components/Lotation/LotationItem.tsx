import { Product } from "../../types/Product";
import style from "../../styles/Lotation.module.scss";

interface LotationItemProp {
	onClick?: () => void;
	value: Product;
	order: number;
}

function getClassName(order: number) {
	const className = `item-${order}`;
	if (order < 3) return `${style.visible} ${style[className]}`;
	return undefined;
}

export default function LotationItem({
	onClick,
	value,
	order,
}: LotationItemProp) {
	const className = getClassName(order);
	return (
		<li className={`${style.lotationItem} ${className}`} onClick={onClick}>
			{value.name}
		</li>
	);
}
