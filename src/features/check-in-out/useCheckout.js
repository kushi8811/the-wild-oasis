import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    //data is return ffrom mutationFn which is updateBooking
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked-out`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => toast.error("There was an error "),
  });
  return { checkout, isCheckingOut };
}
