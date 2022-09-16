const deepEqual = (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      (areObjects && !deepEqual(val1, val2)) ||
      (!areObjects && val1 !== val2)
    ) {
      return false;
    }
  }
  return true;
};

const isObject = object => {
  return object != null && typeof object === 'object';
};

const compareObjects = (obj1, obj2) => {
  return (
    deepEqual(obj1.data, obj2.data) &&
    deepEqual(obj1.attributes, obj2.attributes)
  );
};
export const existingCartItem = ({ prevCartItem, nextCartItem }) => {
  return prevCartItem.find(cartItem => compareObjects(cartItem, nextCartItem));
};

export const addToCartHandler = ({ prevCartItem, nextCartItem }) => {
  const quantityIncrement = 1;
  const cartItemExists = existingCartItem({ prevCartItem, nextCartItem });
  if (cartItemExists) {
    return prevCartItem.map(cartItem =>
      compareObjects(cartItem, nextCartItem)
        ? { ...cartItem, quantity: cartItem.quantity + quantityIncrement }
        : cartItem
    );
  }

  return [
    ...prevCartItem,
    {
      ...nextCartItem,
      quantity: quantityIncrement,
    },
  ];
};

export const removeCartItemHandler = ({ prevCartItem, cartItemToReduce }) => {
  const existingCartItem = prevCartItem.find(cartItem =>
    compareObjects(cartItem, cartItemToReduce)
  );
  if (existingCartItem.quantity === 1) {
    return prevCartItem.filter(
      cartItem => !compareObjects(cartItem, existingCartItem)
    );
  }

  return prevCartItem.map(cartItem =>
    compareObjects(cartItem, existingCartItem)
      ? {
          ...cartItem,
          quantity: cartItem.quantity - 1,
        }
      : cartItem
  );
};
