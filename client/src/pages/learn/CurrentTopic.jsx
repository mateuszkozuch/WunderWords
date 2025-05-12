import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";

const CurrentTopic = ({ section, unit, unitTitle }) => (
    <div className="h-[6rem] w-[30vw] bg-sky-900 rounded-3xl m-2 fixed p-3 z-999">
        <div className="flex items-center gap-2">
            <ArrowLeftCircleIcon className="h-[2rem] text-white cursor-pointer" />
            <h1 className="font-bold text-white">Section {section}, Unit {unit}</h1>
        </div>
        <h1 className="font-bold text-white text-[1.5vw] pl-2">{unitTitle}</h1>
    </div>
);

export default CurrentTopic;
