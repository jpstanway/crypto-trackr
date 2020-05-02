import React, { useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import { connect } from "react-redux";

import TableRow from "../table-row/TableRow";
import Like from "../like/Like";

import { ADD_LIKE } from "../../graphql/mutations";

import {
  addCrypto,
  updateLikes,
  setUserLikedCryptos,
} from "../../redux/reducers/cryptoReducer";

export const TableData = ({
  cryptosToShow,
  cryptos,
  addCrypto,
  updateLikes,
  setUserLikedCryptos,
}) => {
  useEffect(() => {
    const likedCryptoData = localStorage.getItem("cryptoTrackrApp");

    if (likedCryptoData) {
      const likedCryptos = JSON.parse(likedCryptoData);
      setUserLikedCryptos(likedCryptos);
    }
  }, [setUserLikedCryptos]);

  const [addLike] = useMutation(ADD_LIKE, {
    onCompleted: (data) => {
      // check if crypto exists in store before attempting to update
      if (
        !cryptos.cryptoData.find(
          (crypto) => crypto.currency === data.addLike.currency
        )
      ) {
        // add new if it does not
        addCrypto(data.addLike);
      }
      // update likes if it does
      updateLikes(data.addLike);
    },
  });

  return cryptosToShow.length === 0 ? (
    <div>
      <h4 className="heading-3">No cryptos found</h4>
    </div>
  ) : (
    <table className="home-table">
      <thead className="home-table__head">
        <tr>
          <th className="home-table__heading home-table__heading--rank">
            Rank
          </th>
          <th className="home-table__heading">Name</th>
          <th className="home-table__heading">Market Cap</th>
          <th className="home-table__heading">Price</th>
          <th className="home-table__heading">Circulating Supply</th>
          <th className="home-table__heading">&nbsp;</th>
        </tr>
      </thead>
      <tbody className="home-table__body">
        {cryptosToShow.map((crypto) => (
          <TableRow
            key={crypto.currency}
            crypto={crypto}
            loading={cryptos.loading}
          >
            <Like crypto={crypto} addLike={addLike} />
          </TableRow>
        ))}
      </tbody>
    </table>
  );
};

const mapStateToProps = (state) => ({
  cryptos: state.cryptos,
});

export default connect(mapStateToProps, {
  addCrypto,
  updateLikes,
  setUserLikedCryptos,
})(TableData);
