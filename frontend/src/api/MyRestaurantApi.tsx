import { Order, Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react"
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyRestaurant = ()=>{
    const {getAccessTokenSilently} = useAuth0();

    const getMyRestaurantRequest = async():Promise<Restaurant>=>{
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`,{
            headers:{
                method:"GET",
                Authorization:`Bearer ${accessToken}`,
            },
        });

        if(!response.ok){
            const errorResponse = await response.json();
            console.error("Error fetching restaurant:", errorResponse);
            throw new Error("Failed to fetch restaurant");
        }
        return response.json();
    };

    const {data:restaurant,isLoading} = useQuery("fetchMyRestaurant",getMyRestaurantRequest);//returns the body of the response as data variable

    return {restaurant,isLoading};
};

export const useCreateMyRestaurant = ()=>{

    const {getAccessTokenSilently} = useAuth0();

    const createMyRestaurantRequest = async(restaurantFormData:FormData):Promise<Restaurant>=>{// comes from the onSave(formData) from the ManageRestaurantForm.tsx 
        const accessToken = await getAccessTokenSilently();

        const response=await fetch(`${API_BASE_URL}/api/my/restaurant`,{
            method:"POST",
            headers:{
                Authorization:`Bearer ${accessToken}`,
            },
            body:restaurantFormData,
        });

        if(!response.ok){
            const errorResponse = await response.json();
            console.error("Error creating restaurant:", errorResponse);
            throw new Error("Failed to create new Restaurant");
        }
        return response.json();// body of the response // we need to add the type of the body in the src/types.ts 
    };

    const {mutate:createRestaurant,isLoading,isSuccess,error} = useMutation(createMyRestaurantRequest);
    
    if(isSuccess){
        toast.success("Restaurant created");
    }
    if(error){
        toast.error("Unable to update restaurant");
    };

    return {createRestaurant,isLoading};
}

export const useUpdateMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();
  
    const updateRestaurantRequest = async (
      restaurantFormData: FormData
    ): Promise<Restaurant> => {
      const accessToken = await getAccessTokenSilently();
  
      const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: restaurantFormData,
      });
  
      if (!response) {
        throw new Error("Failed to update restaurant");
      }
  
      return response.json();
    };
  
    const {
      mutate: updateRestaurant,
      isLoading,
      error,
      isSuccess,
    } = useMutation(updateRestaurantRequest);
  
    if (isSuccess) {
      toast.success("Restaurant Updated");
    }
  
    if (error) {
      toast.error("Unable to update restaurant");
    }
  
    return { updateRestaurant, isLoading };
  };

  export const useGetMyRestaurantOrders = () => {
    const { getAccessTokenSilently } = useAuth0();
  
    const getMyRestaurantOrdersRequest = async (): Promise<Order[]> => {
      const accessToken = await getAccessTokenSilently();
  
      const response = await fetch(`${API_BASE_URL}/api/my/restaurant/order`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
  
      return response.json();
    };
  
    const { data: orders, isLoading } = useQuery(
      "fetchMyRestaurantOrders",
      getMyRestaurantOrdersRequest
    );
  
    return { orders, isLoading };
  };

  type UpdateOrderStatusRequest = {// passed by the onSave function in the OrderItemCard.tsx (component)
    orderId: string;
    status: string;
  }

  export const useUpdateMyRestaurantOrder = () => {
    const { getAccessTokenSilently } = useAuth0();
  
    const updateMyRestaurantOrder = async (
      updateOrderStatusRequest: UpdateOrderStatusRequest
    ): Promise<Order> => {
      const accessToken = await getAccessTokenSilently();
  
      const response = await fetch(
        `${API_BASE_URL}/api/my/restaurant/order/${updateOrderStatusRequest.orderId}/status`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({status:updateOrderStatusRequest.status}),
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to update order status");
      }
  
      return response.json();// return new order object with updated status so component can update the UI access the updated order
    };
    const { mutateAsync: updateRestaurantStatus, isLoading, isError, isSuccess,reset } = useMutation(updateMyRestaurantOrder);
    if(isSuccess){
        toast.success("Order status updated");
    }
    if(isError){
        toast.error("Unable to update order status");
        reset();
    }
    return {updateRestaurantStatus,isLoading};
  };

/*

The useMutation hook is commonly used in scenarios where you need to perform non-idempotent operations like POST, PUT, PATCH, or DELETE requests, meaning these requests are intended to change server data.
    1.	mutate: createRestaurant:
        •	The mutate function is what triggers the mutation (the operation) when you want to create a new restaurant.
        •	This is being renamed to createRestaurant to make the code more readable and specific to the action it’s performing.
        •	When createRestaurant is called (e.g., createRestaurant(restaurantData)), it will execute the createMyRestaurantRequest function, which likely sends the data to the backend server.
	2.	isLoading:
        •	This is a boolean indicating if the mutation is in a loading state.
        •	While isLoading is true, it implies that the createMyRestaurantRequest function has been called, and the request is currently processing.
        •	It can be useful to display a loading spinner or disable form inputs until the mutation completes.
	3.	isSuccess:
        •	This boolean becomes true once the mutation successfully completes without errors.
        •	When isSuccess is true, you may want to notify the user that the restaurant was successfully created, update the UI, or perform other post-mutation tasks.
	4.	isError:
        •	This boolean becomes true if the mutation encounters an error during execution.
        •	If isError is true, it’s a signal to show an error message or alert to the user so they understand that something went wrong in the mutation process.
	5.	error:
        •	This holds any error information returned if the mutation fails.
        •	You can use error to display specific details about what went wrong (e.g., validation issues, server errors, network issues).
*/