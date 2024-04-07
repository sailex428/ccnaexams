"use client";

import { VictoryLabel, VictoryPie } from "victory";

export default function PieChart(props: {
  firstPartOfChart: number;
  secondPartOfChart: number;
  label: string;
}) {
  return (
    <>
      <svg height={"200px"} width={"200px"} viewBox={"0 0 200 200"}>
        <VictoryPie
          standalone={false}
          width={200}
          height={200}
          data={[
            { x: "", y: props.firstPartOfChart },
            { x: "", y: props.secondPartOfChart },
          ]}
          innerRadius={80}
          labelRadius={100}
          colorScale={["rgb(70, 179, 243)", "rgb(182, 215, 243)"]}
          style={{ labels: { fontSize: 0 } }}
        />
        <VictoryLabel
          textAnchor="middle"
          verticalAnchor="middle"
          x={100}
          y={100}
          style={{
            fontSize: 22,
            fontFamily: "Helvetica",
            fontWeight: "bold",
          }}
          text={props.label}
        />
      </svg>
    </>
  );
}
