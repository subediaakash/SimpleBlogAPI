import { useEffect } from "react";
import { useRecoilState, RecoilState } from "recoil";

type AtomType<T> = RecoilState<T>;

type FetchDataFunctionType<T> = () => Promise<T>;

const useRecoilDataFetcher = <T>(
  atom: AtomType<T>,
  fetchDataFunction: FetchDataFunctionType<T>
): T => {
  const [data, setData] = useRecoilState(atom);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchDataFunction();
      setData(response);
    };

    fetchData();
  }, [setData, fetchDataFunction]);

  return data;
};

export default useRecoilDataFetcher;
