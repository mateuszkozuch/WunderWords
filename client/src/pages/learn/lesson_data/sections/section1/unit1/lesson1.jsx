import MatchWords from "../../../../MatchWords";
import { BookOpenIcon } from "@heroicons/react/24/solid";

export const s1u1lesson1 = 
    {
        title: "Gemüse & Obst",
        icon: <BookOpenIcon />,
        slides: [
            <MatchWords array={[
                { id: 1, Q: 'Gemüse', A: 'vegetable' },
                { id: 2, Q: 'Milch', A: 'milk' },
                { id: 3, Q: 'Häuser', A: 'houses' },
                { id: 4, Q: 'Bücher', A: 'books' },
                { id: 5, Q: 'Stühle', A: 'chairs' },
                { id: 6, Q: 'Äpfel', A: 'apples' },
                { id: 7, Q: 'Tische', A: 'tables' }
            ]}/>,
        ]
    }