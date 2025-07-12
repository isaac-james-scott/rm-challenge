import { useQuery } from "@tanstack/react-query";
import { type FacilitiesResponse } from "../../../lib/schemas/facilities";

const fetchFacilities = async (): Promise<FacilitiesResponse> => {
  const res = await fetch("/api/message");
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return res.json();
};

const useFacilitiesQuery = () => {
  return useQuery({
    queryKey: ["facilities"],
    queryFn: fetchFacilities,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export default useFacilitiesQuery;
