import { Product } from "../../types/Product";
import LotationItem from "./LotationItem";
import style from "../../styles/Lotation.module.scss";

interface LotationWrapperProp {
	selectedIds: number[];
	items: Product[];
	positions: number[];
	phase: number;
}

export default function LotationWrapper({
	selectedIds,
	items,
	positions,
	phase,
}: LotationWrapperProp) {
	const selectedItems = selectedIds.map(
		(selectedId) => items.find(({ id }) => id === selectedId) as Product
	);
	const indexes = selectedIds.map((_, i) => {
		const { length } = selectedIds;
		const index = (phase + i) % length;
		return index >= 0 ? index : (index + length) % length;
	});

	const selectedItemEls = selectedItems.map((item, i, arr) => {
		return (
			<LotationItem value={arr[indexes[i]]} order={positions[i]} key={i} />
		);
	});
	return <ol className={style.lotationWrapper}>{selectedItemEls}</ol>;
}
