import { useSearchRestaurants } from "@/api/RestaurantApi";
import CuisineFilter from "@/components/CuisineFilter";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import SortOptionDropdown from "@/components/SortOptionDropdown";
import { useState } from "react";
import { useParams } from "react-router-dom"

export type SearchState={
    searchQuery : string;
    page:number;
    selectedCuisines?:string[];
    sortOption:string;
}

const SearchPage = () => {
    const {city} = useParams();
    const [searchState, setSearchState] = useState<SearchState>({//searchState holds the search query input by the user, initialized with an empty searchQuery.
        searchQuery: "",
        page: 1,
        selectedCuisines: [],
        sortOption: "bestMatch",
    });

    const [isExpanded, setIsExpanded] = useState<boolean>(false);// persist between re-renders so added in top level component

    const {results,isLoading} = useSearchRestaurants(searchState,city);

    const setSortOption = (sortOption:string)=>{
        setSearchState((prevState)=>({
            ...prevState,
            sortOption,
            page: 1,
        }));
    };

    const setSelectedCuisines = (selectedCuisines:string[])=>{
        setSearchState((prevState)=>({
            ...prevState,
            selectedCuisines,
            page: 1,
        }));
    };

    const setPage = (page:number)=>{
        setSearchState((prevState)=>({
            ...prevState,
            page,

        }));
    };

    const setSearchQuery = (searchFormData:SearchForm)=>{
        setSearchState((prevState)=>({
            ...prevState,//dont want to lose other state
            searchQuery: searchFormData.searchQuery,
            page: 1,
        }));
    }

    const resetSearch = ()=>{
        setSearchState((prevState)=>({
            ...prevState,
            searchQuery: "",
            page: 1,
        }));
    }

    if(isLoading){
        return <span>Loading...</span>
    }

    if(!results?.data || !city){
        <span>No restaurants found</span>
    }

    return(
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div id="cuisines-list">
                <CuisineFilter
                    selectedCuisines={searchState.selectedCuisines || []}
                    onChange={setSelectedCuisines}
                    isExpanded={isExpanded}
                    onExpandedClick={() => setIsExpanded((prevIsExpanded) => !prevIsExpanded)}
                >
                </CuisineFilter>
            </div>
            <div id="main-content" className="flex flex-col gap-5">
                <SearchBar 
                    searchQuery={searchState.searchQuery} //searchState changes re render the component & value should not be lost between re renders
                    onSubmit={setSearchQuery} 
                    placeHolder="Search by cuisine or restaurant name" 
                    onReset={resetSearch}
                />
                <div className="flex justify-between flex-col gap-3 lg:flex-row">
                    <SearchResultInfo total={results?.pagination.total} city={city}/>
                    <SortOptionDropdown sortOption={searchState.sortOption} onChange={(value)=>setSortOption(value)}/>
                </div>
                {results?.data.map((restaurant) => (
                    <SearchResultCard key={restaurant._id} restaurant={restaurant}/>
                ))}
                <PaginationSelector 
                    page={results?.pagination.page || 1}
                    pages={results?.pagination.pages || 1}
                    onPageChange={setPage}
                >
                </PaginationSelector>
            </div>
        </div>
    )
};

export default SearchPage;

/*
{
    "data": [
        {
            "_id": "6722062fa34f864927bcff2d",
            "restaurantName": "TEST UP",
            "city": "London",
            "country": "TEST",
            "deliveryPrice": 100,
            "estimatedDeliveryTime": 30,
            "cuisines": [
                "American",
                "Chinese",
                "Indian"
            ],
            "menuItems": [
                {
                    "name": "TEST",
                    "price": 800,
                    "_id": "672339d0dc5a044651ae7d5a"
                }
            ],
            "imageUrl": "http://res.cloudinary.com/dklq6q7d9/image/upload/v1730283054/pvk9hntduaekzfxl8q58.jpg",
            "user": "671a8f522878c4520008cf95",
            "lastUpdated": "2024-10-31T08:03:28.660Z",
            "__v": 3
        }
    ],
    "pagination": {
        "total": 1,
        "page": 1,
        "pages": 1
    }
}*/

