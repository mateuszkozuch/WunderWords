import { useState } from "react"

const MatchWords = () => {

    const array2 = [
        {id: 1, Q: 'gemuse', A: 'vegetable'},
        {id: 2, Q: 'Milk', A: 'Milch'},
    ]
    const handleClick = (id) => {
        console.log(id);
        setIds(prevIds => [...prevIds, id]);
        if (isIdMatching.length == 2) {
            setIds([]);
        }
    }
    const [isIdMatching, setIds] = useState([]);

    const items2 = array2.map((item, index) => {
        return(
            <div key={index}>
                <h1 onClick={() => {handleClick(item.id)}}
                className={isIdMatching[0] == item.id && isIdMatching[1] == item.id ? 'bg-green-500' : 'bg-red-500'}>{item.Q}</h1>
                <h1 onClick={() => {handleClick(item.id)}}
                className={isIdMatching[0] == item.id && isIdMatching[1] == item.id ? 'bg-green-500' : 'bg-red-500'}>{item.A}</h1>
            </div>
        )
    })

    return(
        <div>
            <div>
                {items2}
                <h1>{isIdMatching}</h1>
            </div>
        </div>
    )
}

export default MatchWords;