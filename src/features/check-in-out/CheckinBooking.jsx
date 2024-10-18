import styled from "styled-components";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";

import Spinner from "../../ui/Spinner";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";

import BookingDataBox from "../../features/bookings/BookingDataBox";

import { useBooking } from "../../features/bookings/useBooking";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";
// import { useCheckin } from "./useCheckin";

// import { box } from "styles/styles";
// import { useSettings } from "features/settings/useSettings";

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmedPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { booking, isLoading } = useBooking();
  const { settings, isLoading: isLoadingSettings } = useSettings();

  useEffect(() => setConfirmedPaid(booking?.isPaid || false), [booking]);

  const moveBack = useMoveBack();
  const { checkin, isCheckingIn } = useCheckin();
  if (isLoading || isLoadingSettings) return <Spinner />;
  // Can't use as initial state, because booking will still be loading

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;
  const optionalBreakfastPrice =
    settings.breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!confirmPaid) return;

    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  // We return a fragment so that these elements fit into the page's layout
  return (
    <>
      <Row type="horizontal">
        <Heading type="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            disabled={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmedPaid(false);
            }}
            id="breakfast"
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}
      <Box>
        <Checkbox
          checked={confirmPaid}
          disabled={confirmPaid || isCheckingIn}
          onChange={() => setConfirmedPaid((confirm) => !confirm)}
          id="confirm"
        >
          I confirmed that {guests.fullName} has paid the total amount{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionalBreakfastPrice
              )}  (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )})`}
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
