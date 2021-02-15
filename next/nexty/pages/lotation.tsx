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
}

function getOrders(selectedIds: number[], items: Product[]): number[] {
	const length = selectedIds.length;
	const firstIndex = items.findIndex((v) => v.id === selectedIds[0]);
	switch (firstIndex % length) {
		case 0:
			return [0, 1, 2];
		case 1:
			return [1, 2, 0];
		case 2:
			return [2, 0, 1];
		default:
			return [0, 1, 2];
	}
}

function LotationWrapper({ selectedIds, items }: LotationWrapperProp) {
	const selectedItems = items
		.filter((item) => selectedIds.indexOf(item.id) > -1)
		.map((v) => ({
			...v,
		}));
	const orders = getOrders(selectedIds, items);
	const selectedItemEls = selectedItems.map((item, i, arr) => {
		console.log(orders[i]);
		return <LotationItem value={arr[i]} order={orders[i]} key={i} />;
	});
	return (
		<>
			<div className={style.lotationWrapper}>{selectedItemEls}</div>
			<div style={{ marginLeft: 50 }}>{selectedIds.join(", ")}</div>
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

export default function Lotation() {
	const [items, setItems] = useState<Product[]>([
		{ id: 1, name: "A" },
		{ id: 2, name: "B" },
		{ id: 3, name: "C" },
		{ id: 4, name: "D" },
		{ id: 5, name: "E" },
		{ id: 6, name: "F" },
	]);

	const [selected, setSelected] = useState([1, 2, 3]);

	const onLeft = () => {
		const next = getNextItems(-1, items, selected);
		console.log(next);
		setSelected(next);
	};

	const onRight = () => {
		const next = getNextItems(1, items, selected);
		console.log(next);
		setSelected(next);
	};

	return (
		<div className={style.wrapper}>
			<LotationWrapper selectedIds={selected} items={items} />
			<div style={{ marginTop: 50 }}>
				<button onClick={onLeft}>left</button>
				<button onClick={onRight}>right</button>
			</div>
		</div>
	);
}
