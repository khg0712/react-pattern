import React, { useState, useEffect } from "react";
import style from "../styles/Lotation.module.css";

interface LotationItemProp {
	onClick?: () => void;
	value: Product;
	order: number;
}

function getClassName(order: number) {
	if (order < 3) return `item-${order}`;
	return undefined;
}

function LotationItem({ onClick, value, order }: LotationItemProp) {
	const className = getClassName(order);
	return <div className={className && style[className]}>{value.name}</div>;
}

interface LotationWrapperProp {
	selectedIds: number[];
	items: Product[];
	positions: number[];
	phase: number;
}

function LotationWrapper({
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

	console.log(indexes);

	const selectedItemEls = selectedItems.map((item, i, arr) => {
		return (
			<LotationItem value={arr[indexes[i]]} order={positions[i]} key={i} />
		);
	});
	return (
		<>
			<div className={style.lotationWrapper}>{selectedItemEls}</div>
			<div style={{ marginLeft: 0 }}>{selectedIds.join(", ")}</div>
		</>
	);
}

interface Product {
	id: number;
	name: string;
}

const getNextItems = (
	direction: number,
	items: Product[],
	selected: number[]
) => {
	const concattedItems = items.concat(items);

	if (direction > 0) {
		const firstId = selected[0];
		const nextIndex = concattedItems.findIndex(({ id }) => firstId === id);
		const nextItems = concattedItems.slice(nextIndex + 1, nextIndex + 4);
		return nextItems.map(({ id }) => id);
	}

	const lastId = selected[selected.length - 1];
	const nextIndex =
		concattedItems.findIndex(({ id }) => lastId === id) + items.length - 2;
	const nextItems = concattedItems.slice(nextIndex - 1, nextIndex + 2);
	return nextItems.map(({ id }) => id);
};

const getNextPositions = (direction: number = 1, positions: number[]) => {
	const { length } = positions;
	if (direction > 0) {
		return positions.map((position) => (position + 1) % length);
	}
	return positions.map((position) => {
		const nextPos = position - 1;
		return nextPos >= 0 ? nextPos : (nextPos + length) % length;
	});
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
		const next = getNextItems(-1, items, selected);
		setSelected(next);
		setPostions(getNextPositions(1, positions));
		setPhase(phase + 1);
	};

	const onRight = () => {
		const next = getNextItems(1, items, selected);
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
