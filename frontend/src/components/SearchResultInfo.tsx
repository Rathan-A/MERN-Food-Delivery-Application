import { Link } from "react-router-dom";

type props={
    total?:number;
    city?:string
}

const SearchResultInfo = ({total,city}:props) => {
    return(
        <div className="text-xl font-bold flex flex-col gap-3 justify-between lg:items-center lg:flex-row">
            <span>
                {total} restaurants found in {city}
                <Link to="/" className="text-sm font-semibold underline cursor-pointer text-blue-500">
                    Change location
                </Link>

            </span>
            insert dropdown menu
        </div>
    )
}

export default SearchResultInfo;