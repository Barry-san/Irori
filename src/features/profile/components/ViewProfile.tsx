import { useParams } from "react-router-dom";
import { useGetProfile } from "../api/useGetProfile";

export const ViewProfile = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetProfile(id!);
  console.log(data?.exists());
  console.log(data?.data());
  return (
    <div>
      {isLoading ? <p>Loading...</p> : ""}
      {isError && <p>an error occured</p>}
      {data && (
        <div>
          <p className="text-xl md:text-3x lg:text-4xl">
            {data.data()?.userName || "this is it"}
          </p>
          <p className="text-lg md:text-xl lg:text-2xl">
            Joined : {data.data()?.joinDate}
          </p>
        </div>
      )}
    </div>
  );
};
