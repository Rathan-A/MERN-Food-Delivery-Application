// import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { Input } from "@/components/ui/input";
// import { useFormContext } from "react-hook-form"//hooks and utilities to manage form state, validation, and submission efficiently.

// const DetailsSection = ()=>{
//     const {control} = useFormContext();//hook
//     return(
//         <div className="space-y-2">
//             <div>
//                 <h2 className="text-2xl font-bold">Details</h2>
//                 <FormDescription>
//                     Enter the details about your restaurant
//                 </FormDescription>
//             </div>
//             <FormField control={control} name="restaurantName" render={({field})=>(
//                 <FormItem>
//                     <FormLabel>Name</FormLabel>
//                     <FormControl>
//                         <Input {...field} className="bg-white"></Input>
//                     </FormControl>
//                     <FormMessage/>
//                 </FormItem>
//             )}>
//             </FormField>
//             <div className="flex gap-4">
//                 <FormField control={control} name="city" render={({field})=>(
//                     <FormItem className="flex-1">
//                         <FormLabel>City</FormLabel>
//                         <FormControl>
//                             <Input {...field} className="bg-white"></Input>
//                         </FormControl>
//                         <FormMessage/>
//                     </FormItem>
//                 )}>
//                 </FormField>
//                 <FormField control={control} name="country" render={({field})=>(
//                     <FormItem className="flex-1">
//                         <FormLabel>Country</FormLabel>
//                         <FormControl>
//                             <Input {...field} className="bg-white"></Input>
//                         </FormControl>
//                         <FormMessage/>
//                     </FormItem>
//                 )}>
//                 </FormField>
//             </div>
//             <FormField control={control} name="deliveryPrice" render={({field})=>(
//                 <FormItem className="max-w-[25%">
//                     <FormLabel>Delivery Price($)</FormLabel>
//                     <FormControl>
//                         <Input {...field} className="bg-white" placeholder="0.99"></Input>
//                     </FormControl>
//                     <FormMessage/>
//                 </FormItem>
//             )}>
//             </FormField>
//             <FormField control={control} name="estimatedDeliveryTime" render={({field})=>(
//                 <FormItem className="max-w-[25%">
//                     <FormLabel>Estimated Delivery Time(minutes)</FormLabel>
//                     <FormControl>
//                         <Input {...field} className="bg-white" placeholder="30"></Input>
//                     </FormControl>
//                     <FormMessage/>
//                 </FormItem>
//             )}>
//             </FormField>
//         </div>
//     )
// }

// export default DetailsSection

/*
1.	FormField: This component wraps the entire form field. It connects the input to the form context using the control object. It specifies the name of the field, which will be used to store its value in the form state.
	2.	render Prop: The render prop is a function that receives a field object containing necessary properties for managing the input field. This includes:
	•	value: The current value of the field.
	•	onChange: A function to update the value in the form state when the user types into the input.
	•	onBlur: A function to mark the field as “touched” when it loses focus (useful for validation).
	3.	FormItem: This component serves as a container for the label, input field, and validation message. It helps in structuring the form visually.
	4.	FormLabel: This component provides a label for the input field, indicating to the user what data is expected (in this case, “Name”).
	5.	FormControl: This component wraps the input field, providing styling and layout control.
	6.	Input: The input field itself. It receives all properties from the field object using the spread operator ({...field}), which binds the input’s value and events directly to the form’s state.
	7.	FormMessage: This component displays any validation messages or errors related to the field, providing feedback to the user.
*/

import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import { Input } from "@/components/ui/input";
  import { useFormContext } from "react-hook-form";
  
  const DetailsSection = () => {
    const { control } = useFormContext();
    return (
      <div className="space-y-2">
        <div>
          <h2 className="text-2xl font-bold">Details</h2>
          <FormDescription>
            Enter the details about your restaurant
          </FormDescription>
        </div>
        <FormField
          control={control}
          name="restaurantName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          <FormField
            control={control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="country"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
  
        <FormField
          control={control}
          name="deliveryPrice"
          render={({ field }) => (
            <FormItem className="max-w-[25%]">
              <FormLabel>Delivery price (£)</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" placeholder="1.50" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="estimatedDeliveryTime"
          render={({ field }) => (
            <FormItem className="max-w-[25%]">
              <FormLabel>Estimated Delivery Time (minutes)</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" placeholder="30" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    );
  };
  
  export default DetailsSection;