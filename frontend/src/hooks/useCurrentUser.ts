import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "../api/axiosPublic";
import { useAuth } from "./useAuth";

export const useCurrentUser = () => {
  const { user, loading: authLoading, updateUser } = useAuth();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  return { user, authLoading, data, isLoading, refetch ,updateUser };
};
