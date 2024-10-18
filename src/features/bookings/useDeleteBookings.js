import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { mutate: deleteBooking, isLoading: isDeleting } = useMutation({
    mutationFn: deleteBookingApi,

    onSuccess: (data) => {
      toast.success(`Booking  successfully deleted`);
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },

    onError: () => toast.error("There was an error deleting the booking"),
  });

  return { deleteBooking, isDeleting };
}
