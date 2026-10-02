import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { axiosPublic } from "../../api/axiosPublic";
import { ProductProps } from "../Shop/Shop";

const ProductDetail = () => {
  const params = useParams();

  const { data, isLoading } = useQuery<ProductProps>({
    queryKey: ["product-detail"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/products/${params.id}`);

      return res.data;
    },
  });

  if (isLoading) return <div>loading....</div>;

  return <div>this is the page for product detail of {data?.name}</div>;
};

export default ProductDetail;
