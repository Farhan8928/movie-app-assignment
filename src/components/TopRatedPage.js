import React, { useEffect, useState, useCallback } from "react";
import { TOP_RATED_URL } from "../utils/constant";
import Header from "./Header";
import Card from "../components/Card";

const TopRatedPage = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filterData = useCallback(() => {
    if (searchQuery.trim() !== "") {
      const filtered = data.filter((item) =>
        item.original_title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [data, searchQuery]);

  useEffect(() => {
    getAllData();
  }, []);

  useEffect(() => {
    filterData();
  }, [filterData]);

  const getAllData = async () => {
    try {
      const apiData = await fetch(TOP_RATED_URL);
      const res = await apiData.json();
      setData(res.results);
      setFilteredData(res.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  return (
    <>
      <Header onSearch={handleSearch} />
      <div className="cards-container">
        {filteredData.map((item) => (
          <Card {...item} key={item.id} />
        ))}
      </div>
    </>
  );
};

export default TopRatedPage;
