// import { Checkbox } from "@/components/ui/checkbox";
// import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
// import { ControllerRenderProps, FieldValues } from "react-hook-form";

// type Props = {
//   cuisine: string;
//   field: ControllerRenderProps<FieldValues, "cuisines">;//The field object provided by ControllerRenderProps for "cuisines" includes value, onChange, and other properties needed to control the select input.
// };

// const CuisineCheckbox = ({ cuisine, field }: Props) => {
//   return (
//     <FormItem className="flex flex-row items-center space-x-1 space-y-0 mt-2">
//       <FormControl>
//         <Checkbox
//           className="bg-white"
//           checked={field.value.includes(cuisine)} // if the check the current cuisine
//           onCheckedChange={(checked) => {
//             if (checked) {
//               field.onChange([...field.value, cuisine]);//new array with addes cuisine if checked
//             } else {
//               field.onChange(
//                 field.value.filter((value: string) => value !== cuisine)
//               );
//             }
//           }}
//         />
//       </FormControl>
//       <FormLabel className="text-sm font-normal">{cuisine}</FormLabel>
//     </FormItem>
//   );
// };

// export default CuisineCheckbox;

import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type Props = {
  cuisine: string;
  field: ControllerRenderProps<FieldValues, "cuisines">;
};

const CuisineCheckbox = ({ cuisine, field }: Props) => {
  return (
    <FormItem className="flex flex-row items-center space-x-1 space-y-0 mt-2">
      <FormControl>
        <Checkbox
          className="bg-white"
          checked={field.value.includes(cuisine)}
          onCheckedChange={(checked) => {
            if (checked) {
              field.onChange([...field.value, cuisine]);
            } else {
              field.onChange(
                field.value.filter((value: string) => value !== cuisine)
              );
            }
          }}
        />
      </FormControl>
      <FormLabel className="text-sm font-normal">{cuisine}</FormLabel>
    </FormItem>
  );
};

export default CuisineCheckbox;