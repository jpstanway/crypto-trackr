export default function(currency) {
  // check if user has data in local storage
  let updatedLikedCryptos = [];
  let previouslyLikedCryptos = localStorage.getItem("cryptoTrackrApp");

  if (previouslyLikedCryptos) {
    previouslyLikedCryptos = JSON.parse(previouslyLikedCryptos);
    updatedLikedCryptos = [...previouslyLikedCryptos, currency];
  } else {
    updatedLikedCryptos = [currency];
  }

  // send data back to localStorage
  localStorage.setItem("cryptoTrackrApp", JSON.stringify(updatedLikedCryptos));

  return updatedLikedCryptos;
}
