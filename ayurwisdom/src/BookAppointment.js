import { useEffect } from "react";

function BookAppointment() {
  useEffect(() => {
    window.location.href = "http://localhost/bookappointment/";
  }, []);

  return null; // No UI needed as it redirects immediately
}

export default BookAppointment;
