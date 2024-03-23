export const clientID = '0b3d187653ac49d69791bdab14c5e14a';
export const clientSecret = '38230343c69948218edfbe05f90edaa8';

export const generateToken = async (setAccessToken, setTokenType) => {
  const url = 'https://accounts.spotify.com/api/token';
  const httpOptions = {
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=client_credentials&client_id=${clientID}&client_secret=${clientSecret}`
  };

  const response = await fetch(url, httpOptions);
  const data = await response.json();
  setAccessToken(data.access_token);
  setTokenType(data.token_type);
};

export const getTopTracksOfArtists = async (artistIDs, tokenType, accessToken, setAllTracks, numberOfTracks) => {
  let allTracks = [];

  for (const artistID of artistIDs) {
    let url = `https://api.spotify.com/v1/artists/${artistID}/top-tracks?market=US`;
    const httpOptions = {
      method: "GET",
      headers: {
        'Authorization': `${tokenType} ${accessToken}`,
      }
    };

    const response = await fetch(url, httpOptions);
    const data = await response.json();
    allTracks = allTracks.concat(data.tracks.slice(0, numberOfTracks));
  }

  setAllTracks(allTracks);
};