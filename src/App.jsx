import "./index.css";
import { BarAxis, Legend } from "./Axis";
import { HeatMap } from "./HeatMap";
import { ModalProvider, useModal } from "./Modal";

const Modal = () => {
  const { modalData } = useModal();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = monthNames[modalData.value.month - 1];

  const roundedNumberBase =
    Math.floor(modalData.value.baseTemperature * 10) / 10;
  const roundedNumberVariance = Math.floor(modalData.value.variance * 10) / 10;

  console.log(roundedNumberBase, roundedNumberVariance);
  console.log(roundedNumberBase + roundedNumberVariance);

  return modalData.isVisible ? (
    <div
      id="tooltip"
      className="absolute bg-black text-white p-2 rounded shadow-lg opacity-70"
      style={{
        top: modalData.y + 80,
        left: modalData.x + (monthName.length >= 6 ? -15 : 0) + 35,
      }}
    >
      <span className="text-center">
        <p>
          {modalData.value.year} - {monthName}
        </p>
        <p>{(roundedNumberBase + roundedNumberVariance).toFixed(1)}℃</p>
        <p>{roundedNumberVariance}℃</p>
      </span>
    </div>
  ) : null;
};

function App() {
  const width = 1400;
  const height = 500;

  return (
    <ModalProvider>
      <main className="h-[100vh] bg-white absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] p-[10px]">
        <h1 id="title" className="text-center text-3xl mb-1 font-bold">
          Monthly Global Land-Surface Temperature
        </h1>
        <h2 className="text-center text-xl mb-20 font-bold">
          1753 - 2015: base temperature 8.66℃
        </h2>
        <BarAxis heightSVG={height} widthSVG={width}>
          <HeatMap height={height - 70} width={width - 100} />
        </BarAxis>
        <Legend />
        <Modal />
      </main>
    </ModalProvider>
  );
}

export default App;
