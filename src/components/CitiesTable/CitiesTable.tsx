import React, { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

interface City {
  geoname_id: string;
  name: string;
  country: string;
  timezone: string;
  longitude: number;
  latitude: number;
}

const CitiesTable: React.FC = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCities();
  }, [page]);

  const fetchCities = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&rows=50&start=${page * 50}&sort=name`
      );
      const newCities = response.data.records.map((record: any) => ({
        geoname_id: record.fields.geoname_id,
        name: record.fields.ascii_name,
        country: record.fields.cou_name_en,
        longitude: record.fields.coordinates[1],
        latitude: record.fields.coordinates[0],
        timezone: record.fields.timezone,
      }));
      setCities((prevCities) => [...prevCities, ...newCities]);
      setFilteredCities((prevCities) => [...prevCities, ...newCities]);
      setHasMore(newCities.length > 0);
    } catch (error) {
      console.error("Failed to fetch cities:", error);
      setHasMore(false);
    }
    setLoading(false);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearch(value);
    const filtered = cities.filter(
      (city) =>
        city.name.toLowerCase().includes(value.toLowerCase()) ||
        city.country.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCities(filtered);
    setPage(0);
  };

  return (
    <div className="p-4">
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Search cities or countries..."
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm mb-4"
      />
      <InfiniteScroll
        dataLength={filteredCities.length}
        next={() => setPage(page + 1)}
        hasMore={hasMore}
        loader={<div className="text-center py-4">Loading...</div>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>You have seen all cities</b>
          </p>
        }
      >
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Country</th>
              <th className="px-4 py-2 text-left">Longitude</th>
              <th className="px-4 py-2 text-left">Latitude</th>
              <th className="px-4 py-2 text-left">Timezone</th>
            </tr>
          </thead>
          <tbody>
            {filteredCities.map((city, index) => (
              <tr
                key={`${city.geoname_id}_${index}`}
                className="border-b hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  window.open(`/weather/${city.country}`, "_blank");
                }}
              >
                <td className="px-4 py-2 text-left">
                  {city.name.toLowerCase().includes(search.toLowerCase()) ? (
                    <>
                      {city.name.substr(0, city.name.toLowerCase().indexOf(search.toLowerCase()))}
                      <span className="text-blue-500 font-bold">
                        {city.name.substr(
                          city.name.toLowerCase().indexOf(search.toLowerCase()),
                          search.length
                        )}
                      </span>
                      {city.name.substr(
                        city.name.toLowerCase().indexOf(search.toLowerCase()) + search.length
                      )}
                    </>
                  ) : (
                    city.name
                  )}
                </td>
                <td className="px-4 py-2 text-left">{city.country}</td>
                <td className="px-4 py-2 text-left">{city.longitude}</td>
                <td className="px-4 py-2 text-left">{city.latitude}</td>
                <td className="px-4 py-2 text-left">{city.timezone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </InfiniteScroll>
    </div>
  );
};

export default CitiesTable;
