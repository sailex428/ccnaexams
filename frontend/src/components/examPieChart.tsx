import { VictoryLabel, VictoryPie, VictoryAnimation } from "victory";
import { useState, useEffect } from "react";

type PieChartProps = {
  firstPartOfChart: number;
  secondPartOfChart: number;
  label: string;
};

const ExamPieChart = ({
  firstPartOfChart,
  secondPartOfChart,
  label,
}: PieChartProps) => {
  const [animatedData, setAnimatedData] = useState({
    firstPart: 0,
    secondPart: 0,
  });
  const [animatedLabel, setAnimatedLabel] = useState("0%");

  useEffect(() => {
    setAnimatedData({
      firstPart: firstPartOfChart,
      secondPart: secondPartOfChart,
    });
    setAnimatedLabel(label);
  }, [firstPartOfChart, secondPartOfChart, label]);

  return (
    <>
      <svg height={"200px"} width={"200px"} viewBox={"0 0 200 200"}>
        <VictoryAnimation duration={1000} data={animatedData}>
          {(newProps) => (
            <VictoryPie
              standalone={false}
              width={200}
              height={200}
              data={[
                { x: "", y: newProps.firstPart },
                { x: "", y: newProps.secondPart },
              ]}
              innerRadius={80}
              labelRadius={100}
              colorScale={["var(--text-color)", "var(--primary)"]}
              style={{ labels: { fontSize: 0 } }}
            />
          )}
        </VictoryAnimation>
        <VictoryAnimation duration={1000} data={{ label: animatedLabel }}>
          {(newProps) => (
            <VictoryLabel
              textAnchor="middle"
              verticalAnchor="middle"
              x={100}
              y={100}
              style={{
                fontSize: 22,
                fontFamily: "JetBrains Mono",
                fontWeight: "bold",
                opacity: newProps.label === label ? 1 : 0,
                transition: "opacity 0.5s ease-in-out",
                fill: "var(--text-color)",
              }}
              text={newProps.label}
            />
          )}
        </VictoryAnimation>
      </svg>
    </>
  );
};

export default ExamPieChart;
