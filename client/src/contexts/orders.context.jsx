import React, { createContext, useState, useCallback, useContext } from "react";
// import { AuthContext } from "./auth.context";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import { BasketContext } from "../contexts/basket.context";

let headers = {
  "Content-Type": "application/json",
  "X-Requested-With": "XMLHttpRequest",
  // 'Content-Type': 'application/x-www-form-urlencoded',
};

const ORDERS_ENDPOINT = `${window.location.origin}/api/v1/orders/`;

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

      console.log(
        "🚀 ~ file: orders.context.jsx ~ line 98 ~ fetchOrders ~ data",
        data
      );
      // console.log('Orders from context', Orders);
    } catch (err) {
      console.log("err", err);
      setError(err);
    }
  }, [setError, setLoading, setOrders, state, orders]);

  const addOrder = useCallback(
    async (items, user) => {
      console.log("🚀🚀 ~ file: orders.context.jsx ~ line 113 ~ user", user);
      console.log("🚀🚀 ~ file: orders.context.jsx ~ line 113 ~ items", items);
      const itemIDs = items.map((item) => item._id);
      console.log(
        "🚀 ~ file: orders.context.jsx ~ line 116 ~ itemIDs",
        itemIDs
      );
      const customerIDs = user.sub;
      console.log(
        "🚀 ~ file: orders.context.jsx ~ line 118 ~ customerIDs",
        customerIDs
      );

      setLoading();
      const { orders } = state;
      try {
        const response = await fetch(ORDERS_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify({
            items: itemIDs,
            customerID: customerIDs,
          }),
        });
        console.log("The response is", response);
        // Checks negative API call status
        if (!response.ok) {
          throw response;
        }

        const savedOrder = await response.json();
        console.log(
          "🚀 ~ file: orders.context.jsx ~ line 139 ~ savedOrder",
          savedOrder
        );

        console.log("got data", savedOrder);
        setOrders([...orders, { ...savedOrder, items }]);
        console.log(
          "🚀🚀🚀🚀🚀🚀 ~ file: orders.context.jsx ~ line 154 ~ orders",
          orders
        );

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
        console.log("info error occurred", err);
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
    [toast, setLoading, setOrders, state, orders]
  );

  const updateOrder = useCallback(
    async (id, updates) => {
      let newOrder = null;
      setLoading();
      const { orders } = state;
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
        const index = orders.findIndex((Order) => Order._id === id);

        // Get actual Order
        const oldOrder = orders[index];
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
          ...orders.slice(0, index),
          newOrder,
          ...orders.slice(index + 1),
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
    [toast, setError, setLoading, setOrders, state, orders]
  );

  const deleteOrder = useCallback(
    async (id) => {
      let deletedOrder = null;
      setLoading();
      const { orders } = state;
      console.log("🚀 ~ file: orders.context.jsx ~ line 255 ~ orders", orders);

      try {
        const response = await fetch(`${ORDERS_ENDPOINT}${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        });

        if (!response.ok) {
          throw response;
        }

        // Get index
        const index = orders.findIndex((Order) => Order._id === id);
        console.log("🚀 ~ file: orders.context.jsx ~ line 269 ~ index", index);
        deletedOrder = orders[index];
        console.log(
          "🚀 ~ file: orders.context.jsx ~ line 271 ~ deletedOrder",
          deletedOrder
        );
        // recreate the Orders array without that Order
        const updatedOrders = [
          ...orders.slice(0, index),
          ...orders.slice(index + 1),
        ];
        setOrders(updatedOrders);

        toast.success(`Deleted ${deletedOrder._id}`, {
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
        console.log("Fail to delete:", err);
        setError(err);
        toast.warn(`Error: Failed to update ${deletedOrder._id}`, {
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
    [toast, setError, setLoading, setOrders, state, orders]
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
