import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const InfiniteScrollcom = () => {
      const [data, setData] = useState(Array.from({ length: 20 }));

  const fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(() => {
      setData(data.concat(Array.from({ length: 20 })));
    }, 1500);
  };

  return (
    <InfiniteScroll
      dataLength={data.length}
      next={fetchMoreData}
      hasMore={true}
      loader={<h4>Loading...</h4>}
      scrollableTarget="scrollableDiv"
    >
      {data.map((i, index) => (
        <div className="w-56 h-16" key={index}>
          div - #{index}
        </div>
      ))}
    </InfiniteScroll>
  );
};

export default InfiniteScrollcom;
