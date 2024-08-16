import { useLoaderData, useParams } from "react-router-dom";

const SearchPage = () => {
    const data = useLoaderData();
   console.log(data);
    return (
        <div>
            hello
        </div>
    );
};

export default SearchPage;