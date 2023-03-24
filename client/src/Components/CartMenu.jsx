import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styled from "@emotion/styled";
import {
  decreaseCount,
  increaseCount,
  removeFromCart,
  setIsCartOpen,
} from "../state";
import { useNavigate } from "react-router-dom";

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CartMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);

  const totalPrice = cart.reduce((total, item) => {
    return total + item.count * item.price;
  }, 0);
  return (
    <Box
      display={isCartOpen ? "block" : "none"}
      backgroundColor="rgba(0, 0, 0, 0.4)"
      position="fixed"
      zIndex={10}
      width="100%"
      height="100%"
      left="0"
      top="0"
      overflow="auto"
    >
      <Box
        position="fixed"
        right="0"
        bottom="0"
        width="max(550px, 30%)"
        height="100%"
        backgroundColor="white"
      >
        <Box padding="30px" overflow="auto" height="100%">
          {/* HEADER */}
          <FlexBox mb="15px">
            <h1 className="text-gray-800 text-xl">
              Votre Panier ({cart.length})
            </h1>
            <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
              <CloseIcon />
            </IconButton>
          </FlexBox>

          {/* CART LIST */}
          <Box>
            {cart.map((item) => (
              <Box key={`${item._id}-${item._id}`}>
                <FlexBox p="15px 0">
                  <Box flex="1 1 40%">
                    <img
                      alt={item?.title}
                      className="w-32 h-32 object-cover"
                      src={item.img3}
                    />
                  </Box>
                  <Box flex="1 1 85%">
                    <FlexBox mb="5px">
                      <h1 className="text-md text-gray-800 font-semibold">
                        {item.title}
                      </h1>
                      <IconButton
                        onClick={() =>
                          dispatch(removeFromCart({ _id: item._id }))
                        }
                      >
                        <CloseIcon />
                      </IconButton>
                    </FlexBox>
                    <h1 className="text-gray-900 text-sm">
                      {item.desc.substring(0, 43)}...
                    </h1>
                    <FlexBox m="15px 0">
                      <Box
                        display="flex"
                        alignItems="center"
                        className="border border-gray-400 rounded-md"
                      >
                        <IconButton
                          onClick={() =>
                            dispatch(decreaseCount({ _id: item._id }))
                          }
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography>{item.count}</Typography>
                        <IconButton
                          onClick={() =>
                            dispatch(increaseCount({ _id: item._id }))
                          }
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                      <h1 className="text-md text-gray-900 font-semibold">
                        {item.price} DZD
                      </h1>
                    </FlexBox>
                  </Box>
                </FlexBox>
                <Divider />
              </Box>
            ))}
          </Box>

          {/* ACTIONS */}
          <Box m="20px 0">
            <FlexBox m="20px 0">
              <h1 className="font-bold text-md text-gray-900">Total</h1>
              <h1 className="font-bold text-md text-gray-900">
                {totalPrice} DZD
              </h1>
            </FlexBox>
            <Box display="flex" justifyContent="center" alignItems="center">
              <button
                className="p-2 w-full h-14 tracking-wide bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                onClick={() => {
                  navigate("/checkout");
                  dispatch(setIsCartOpen({}));
                }}
              >
                PAYER
              </button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CartMenu;
