import React, {
  createContext,
  useState,
  useCallback,
  useEffect,
  useContext,
} from "react";
import localForage from "localforage";
import { useAuth0 } from "@auth0/auth0-react";

export const storageKey = "basket";

export const BasketContext = createContext({
  addItem: () => {},
  removeItem: () => {},
  items: [],
  reset: () => {},
  submitOrder: () => {},
  pickedDate: [],
});

export const BasketProvider = (props) => {
  const { user } = useAuth0();
  console.log(
    "🚀 ~ file: basket.context.jsx ~ line 23 ~ BasketProvider ~ user",
    user
  );
  const [items, setItems] = useState([]);
  const [pickedDate, setPickedDate] = useState([]);
  console.log(
    "🚀 ~ file: basket.context.jsx ~ line 30 ~ BasketProvider ~ pickedDate",
    pickedDate
  );

  useEffect(() => {
    if (!user) return;
    (async () => {
      const result = await localForage.getItem(`${storageKey}-${user.sub}`);
      // console.log("setting", result);
      setItems(result || []);
      console.log("🚀 ~ file: basket.context.jsx ~ line 35 ~ result", result);
    })();
  }, [user]);

  // const [search, setSearch] = useState("");

  const saveBasket = useCallback(
    async (newItems) => {
      await localForage.setItem(`${storageKey}-${user.sub}`, newItems);
    },
    [user?.sub]
  );

  const reset = useCallback(async () => {
    setItems([]);
    saveBasket([]);
  }, [saveBasket, setItems]);

  const addItem = useCallback(
    async (product) => {
      console.log("items", items);
      console.log("product", product);
      const newItems = [...items, product];
      console.log("newItems", newItems);
      saveBasket(newItems);

      setItems(newItems);
      console.log(
        "🚀 🚀🚀~ file: basket.context.jsx ~ line 63 ~ setItems",
        items
      );
    },
    [items, saveBasket, setItems]
  );

  const removeItem = useCallback(
    async (id) => {
      // Get index
      const index = items.findIndex((Item) => Item._id === id);
      const deletedItem = items[index];
      // recreate the Items array without that Item
      const updatedItems = [
        ...items.slice(0, index),
        ...items.slice(index + 1),
      ];
      saveBasket(updatedItems);

      setItems(updatedItems);
    },
    [items, saveBasket, setItems]
  );

  return (
    <BasketContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        reset,
        user,
        setPickedDate,
      }}
    >
      {props.children}
    </BasketContext.Provider>
  );
};
