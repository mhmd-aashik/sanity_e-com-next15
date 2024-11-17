import React from "react";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: {
    query: string;
  };
}) => {
  const { query } = await searchParams;
  console.log(query);
  return <div>SearchPage {query}</div>;
};

export default SearchPage;
