import { useState } from "react";
import { Product } from "../types/Product";

function getDefaultSelected(items: Product[], length: number) {
    const selected = items.slice(0, length).map(v => v.id);
    return getNextSelected(-1, items, selected, Math.floor(length / 2))
}

function getDefaultPositions(length: number) {
    return new Array(length).fill(0).map((_,i) => i);
}

const getNextSelected = (
	direction: number,
	items: Product[],
	selected: number[],
    offset = 1
) => {
	const concattedItems = items.concat(items).map(v => v.id);
    if(offset >= items.length) {
        console.error('offset is bigger than items.length');
        return selected;
    }
	if (direction > 0) {
		const firstId = selected[0];
		const nextStart = concattedItems.indexOf(firstId) + offset;
		const nextItems = concattedItems.slice(nextStart, nextStart + selected.length);
		return nextItems;
	}

	const lastId = selected[selected.length - offset];
	const nextStart = concattedItems.indexOf(lastId) + items.length - selected.length;
	const nextItems = concattedItems.slice(nextStart, nextStart + selected.length);
	return nextItems;
};

const getNextPositions = (direction: number = 1, positions: number[]) => {
	const { length } = positions;
	if (direction > 0) return positions.map(pos => (pos + 1) % length);
	return positions.map(pos => (pos + length - 1) % length);
};


export default function useLotation(length: number) {
    const [items, setItems] = useState<Product[]>([
		{ id: 1, name: "A" },
		{ id: 2, name: "B" },
		{ id: 3, name: "C" },
		{ id: 4, name: "D" },
		{ id: 5, name: "E" },
		{ id: 6, name: "F" },
		{ id: 8, name: "G" },
		{ id: 9, name: "H" },
		{ id: 10, name: "I" },
		{ id: 11, name: "J" },
	]);

	const [selected, setSelected] = useState(getDefaultSelected(items, length));
	const [positions, setPostions] = useState(getDefaultPositions(length));
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

    return {
        items,
        selected,
        positions,
        phase,
        onLeft,
        onRight
    }
}