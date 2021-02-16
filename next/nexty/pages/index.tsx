import React from "react";
import LotationWrapper from "../components/Lotation/LotationWrapper";
import useLotation from "../hooks/useLotation";
import style from "../styles/Lotation.module.css";

export default function Lotation() {
	const {
		items,
        selected,
        positions,
        phase,
        onLeft,
        onRight
	} = useLotation(3);

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
