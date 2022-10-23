import React, { createContext, useState, useCallback, useContext } from "react";
// import { AuthContext } from "./auth.context";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";

let headers = {
  "Content-Type": "application/json",
  "X-Requested-With": "XMLHttpRequest",
  // 'Content-Type': 'application/x-www-form-urlencoded',
};

const ORDERS_ENDPOINT = `http://localhost:6001/api/v1/orders/`;

export const OrdersContext = createContext({
  fetchOrders: () => [],
  addOrder: () => {},
  updateOrder: () => {},
  deleteOrder: () => {},
  loaded: false,
  loading: false,
  error: null,
  orders: [],
});

export const OrdersProvider = (props) => {
  // const { accessToken } = useContext(AuthContext);

  const [state, setState] = useState({
    loading: false,
    loaded: false,
    error: null,
    orders: [{}, {}],
  });

  const { loading, error, orders, loaded } = state;
  // console.log('rerendering', {loading, error, Orders, loaded});

  const setLoading = useCallback(
    () =>
      setState({
        ...state,
        loading: true,
      }),
    [state]
  );

  const setOrders = useCallback(
    (data) =>
      setState({
        ...state,
        orders: data,
        loading: false,
        loaded: true,
      }),
    [state]
  );

  const setError = useCallback(
    (err) =>
      setState({
        ...state,
        error: err.message || err.statusText,
        loading: false,
        loaded: true,
      }),
    [state]
  );

  // const [search, setSearch] = useState("");

  const fetchOrders = useCallback(async () => {
    // console.log('loading', loading);
    // console.log('error', error);

    console.log("fetchOrders");

    const { loading, loaded, error } = state;

    if (loading || loaded || error) {
      console.log("bailing");
      return;
    }

    setLoading();

    try {
      const response = await fetch(ORDERS_ENDPOINT, {
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      if (!response.ok) {
        throw response;
      }
      const data = await response.json();
      setOrders(data);
      // console.log('Orders from context', Orders);
    } catch (err) {
      console.log("err", err);
      setError(err);
    }
  }, [setError, setLoading, setOrders, state]);

  const addOrder = useCallback(
    async (items) => {
      const itemIDs = items.map((item) => item._id);
      console.log("itemIDs", itemIDs);
      console.log("headers", headers);

      setLoading();
      const { orders } = state;
      try {
        const response = await fetch(ORDERS_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify({ items: itemIDs }),
        });
        if (response.status !== 201) {
          throw response;
        }

        const savedOrder = await response.text();
        // const savedOrder = await response.json();

        console.log("got data", savedOrder);
        setOrders([...orders, { ...savedOrder, items }]);

        toast.success("Order successful!", {
          position: "top-right",
          autoClose: 400,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } catch (err) {
        console.log(err);
        setState(err);

        toast.warn(`Error ${err.message || err.statusText}`, {
          position: "top-right",
          autoClose: 300,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    },
    [toast, setLoading, setOrders, state]
  );

  const updateOrder = useCallback(
    async (id, updates) => {
      let newOrder = null;
      setLoading();
      const { Orders } = state;
      try {
        const response = await fetch(`${ORDERS_ENDPOINT}${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(updates),
        });
        if (!response.ok) {
          throw response;
        }
        // Get index
        const index = Orders.findIndex((Order) => Order._id === id);

        // Get actual Order
        const oldOrder = Orders[index];
        console.log(
          "🚀 ~ file: Orders.context.js ~ line 95 ~ updateOrder ~ oldOrder",
          oldOrder
        );

        // Merge with updates
        newOrder = {
          // legit use of 'var', so can be seen in catch block
          ...oldOrder,
          ...updates, // order here is important for the override!!
        };
        console.log(
          "🚀 ~ file: Orders.context.js ~ line 99 ~ updateOrder ~ newOrder",
          newOrder
        );
        // recreate the Orders array
        const updatedOrders = [
          ...Orders.slice(0, index),
          newOrder,
          ...Orders.slice(index + 1),
        ];
        console.log(
          "🚀 ~ file: Orders.context.js ~ line 120 ~ updatedOrders",
          updatedOrders
        );
        setOrders(updatedOrders);
        toast.success(`Updated ${newOrder.title}`, {
          position: "top-right",
          autoClose: 400,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } catch (err) {
        console.log(err);
        setError(err);

        toast.warn(`Error: Failed to update ${newOrder.title}`, {
          position: "top-right",
          autoClose: 300,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    },
    [toast, setError, setLoading, setOrders, state]
  );

  const deleteOrder = useCallback(
    async (id) => {
      let deletedOrder = null;
      setLoading();
      const { Orders } = state;
      try {
        const response = await fetch(`${ORDERS_ENDPOINT}${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        if (response.status !== 204) {
          throw response;
        }
        // Get index
        const index = Orders.findIndex((Order) => Order._id === id);
        deletedOrder = Orders[index];
        // recreate the Orders array without that Order
        const updatedOrders = [
          ...Orders.slice(0, index),
          ...Orders.slice(index + 1),
        ];
        setOrders(updatedOrders);

        toast.success(`Deleted ${deletedOrder.title}`, {
          position: "top-right",
          autoClose: 400,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } catch (err) {
        console.log(err);
        setError(err);
        toast.warn(`Error: Failed to update ${deletedOrder.title}`, {
          position: "top-right",
          autoClose: 300,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    },
    [toast, setError, setLoading, setOrders, state]
  );

  return (
    <OrdersContext.Provider
      value={{
        orders,
        loading,
        error,
        loaded,
        fetchOrders,
        addOrder,
        updateOrder,
        deleteOrder,
      }}
    >
      {props.children}
    </OrdersContext.Provider>
  );
};