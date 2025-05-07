import { AdjustmentsHorizontalIcon, BeakerIcon } from '@heroicons/react/24/solid';
import { PuzzlePieceIcon } from '@heroicons/react/24/solid';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { Cog6ToothIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      };
    const [currentOption, setCurrentOption] = useState('learn')
    const menuOptions = [
        {
            name: 'learn',
            image: <BeakerIcon className="h-[2rem] text-white" />
        },
        {
            name: 'games',
            image: <PuzzlePieceIcon className="h-[2rem] text-white" />
        },
        {
            name: 'notes',
            image: <PencilSquareIcon className="h-[2rem] text-white" />
        },
        {
            name: 'profile',
            image: <UserCircleIcon className="h-[2rem] text-white" />
        },
        {
            name: 'settings',
            image: <Cog6ToothIcon className="h-[2rem] text-white" />
        },
        {
            name: 'testarea',
            image: <AdjustmentsHorizontalIcon className="h-[2rem] text-white" />
        },
    ];

    const menuOptionsElements = menuOptions.map((element, index) => {
        return (
            <Link to={element.name} key={index} onClick={() => {scrollToTop(); setCurrentOption(element.name)}}
            className={`flex items-center space-x-2 p-2 text-white ${currentOption == element.name ? 'bg-slate-900' : 'bg-sky-950'}
            cursor-pointer p-2 rounded-xl w-4/5 hover:bg-slate-800`}>
                {element.image}
                <span className='font-bold'>{element.name}</span>
            </Link>
        );
    });

    return (
        <nav className="h-screen w-1/7 bg-sky-900 flex flex-col items-center fixed">
            <h1 className="text-[1.5vw] text-white font-bold p-3">WunderWords</h1>
            <div className="bg-white h-[0.1rem] w-3/4 mb-2"></div>
            <ul className="flex flex-col w-full items-center gap-1">
                {menuOptionsElements}
            </ul>
        </nav>
    );
};

export default Nav;
