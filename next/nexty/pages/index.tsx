import React, { useState } from "react";
import LotationWrapper from "../components/Lotation/LotationWrapper";
import style from "../styles/Lotation.module.css";
import { Product } from "../types/Product";

const getNextSelected = (
	direction: number,
	items: Product[],
	selected: number[]
) => {
	const concattedItems = items.concat(items).map(v => v.id);

	if (direction > 0) {
		const firstId = selected[0];
		const nextStart = concattedItems.indexOf(firstId) + 1;
		const nextItems = concattedItems.slice(nextStart, nextStart + selected.length);
		return nextItems;
	}

	const lastId = selected[selected.length - 1];
	const nextStart = concattedItems.indexOf(lastId) + items.length - selected.length;
	const nextItems = concattedItems.slice(nextStart, nextStart + selected.length);
	return nextItems;
};

const getNextPositions = (direction: number = 1, positions: number[]) => {
	const { length } = positions;

	if (direction > 0) return positions.map(pos => (pos + 1) % length);

	return positions.map(pos => (pos + length - 1) % length);
};

export default function Lotation() {
	const [items, setItems] = useState<Product[]>([
		{ id: 1, name: "A" },
		{ id: 2, name: "B" },
		{ id: 3, name: "C" },
		{ id: 4, name: "D" },
		{ id: 5, name: "E" },
		{ id: 6, name: "F" },
		{ id: 7, name: "G" },
	]);

	const [selected, setSelected] = useState([7, 1, 2]);
	const [positions, setPostions] = useState([0, 1, 2]);
	const [phase, setPhase] = useState(0);

	const onLeft = () => {
		const next = getNextSelected(-1, items, selected);
		setSelected(next);
		setPostions(getNextPositions(1, positions));
		setPhase(phase + 1);
	};

	const onRight = () => {
		const next = getNextSelected(1, items, selected);
		setSelected(next);
		setPostions(getNextPositions(-1, positions));
		setPhase(phase - 1);
	};

	return (
		<div className={style.wrapper}>
			<LotationWrapper
				selectedIds={selected}
				items={items}
				positions={positions}
				phase={phase}
			/>
			<div style={{ marginTop: 50 }}>
				<button onClick={onLeft}>left</button>
				<button onClick={onRight}>right</button>
			</div>
		</div>
	);
}
