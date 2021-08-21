// import axios from "axios";

type FetcherParams = {
  query: string;
};

type FetcherResult<T> = { data: T };

// <T> : return any generic types
// Promise<FetcherResult<T>>: return promise type
const fetchApi = async <T>({
  query,
}: FetcherParams): Promise<FetcherResult<T>> => {
  const url = "http://localhost:4000/graphql";

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
    }),
  });

  const { data, errors } = await res.json();

  if (errors) {
    throw new Error(errors[0].message ?? errors.message);
  }

  return { data };
};

export default fetchApi;

// const fetchApi = async ({ query }: FetcherParams) => {
//   try {
//     const url = "http://localhost:4000/graphql";

//     const res = await axios.post(url, {
//       query,
//     });

//     return res;
//   } catch (err) {
//     throw new Error(
//       err.response.data.errors[0]?.message || err.response.data.errors.message
//     );
//   }
// };
