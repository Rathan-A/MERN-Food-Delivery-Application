import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";
import { DropdownMenuContent } from "./ui/dropdown-menu";

type Props = {
    sortOption: string;
    onChange: (sortOption: string) => void;
};

const SORT_OPTIONS = [
    {
        label:"Best Match",
        value:"bestMatch"
    },
    {
        label:"Delivery Price",
        value:"deliveryPrice"
    },
    {
        label:"Estimated delivery time",
        value:"estimatedDeliveryTime"
    },
];

const SortOptionDropdown = ({sortOption,onChange}:Props) => {
    const selectedSortLabel = SORT_OPTIONS.find((option)=>option.value===sortOption)?.label || SORT_OPTIONS[0].label;

    return(
        <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer">
                <Button variant="outline" className="w-full">
                    Sort By : {selectedSortLabel}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {SORT_OPTIONS.map((option)=>(
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={()=>onChange(option.value)}
                    >
                        {option.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default SortOptionDropdown;


