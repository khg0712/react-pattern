import React from "react";
import LotationWrapper from "../components/Lotation/LotationWrapper";
import useLotation from "../hooks/useLotation";
import style from "../styles/Lotation.module.scss";

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
			<button className={`${style.button} ${style.left}`} onClick={onLeft}>left</button>
			<button className={`${style.button} ${style.right}`} onClick={onRight}>right</button>
		</div>
	);
}
