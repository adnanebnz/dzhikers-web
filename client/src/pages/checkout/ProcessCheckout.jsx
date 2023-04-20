import { useSelector } from "react-redux";
import { Box, Button, Stepper, Step, StepLabel } from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import Payment from "./Payment";
import Shipping from "./Shipping";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../../state";

const ProcessCheckout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const cart = useSelector((state) => state.cart.cart);
  const totalPrice = cart.reduce((total, item) => {
    return total + item.count * item.price;
  }, 0);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;

  const handleFormSubmit = async (values, actions) => {
    setActiveStep(activeStep + 1);

    // this copies the billing address onto shipping address
    if (isFirstStep && values.shippingAddress.isSameAddress) {
      actions.setFieldValue("shippingAddress", {
        ...values.billingAddress,
        isSameAddress: true,
      });
    }

    if (isSecondStep) {
      makePayment(values);
    }

    actions.setTouched({});
  };

  async function makePayment(values) {
    try {
      await axios.post(
        "https://busy-ruby-xerus-fez.cyclic.app/api/orders/create-order",
        {
          userId: currentUser.details._id,
          products: cart,
          total: totalPrice,
          billingAddress: values.billingAddress,
          phoneNumber: values.phoneNumber,
          emailAddress: values.email,
        },
        {
          withCredentials: true,
        }
      );
      navigate("/checkout/success");
      dispatch(clearCart());
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Box width="80%" m="100px auto">
      <Stepper activeStep={activeStep} sx={{ m: "20px 0" }}>
        <Step>
          <StepLabel>Remplisez vos informations</StepLabel>
        </Step>
        <Step>
          <StepLabel>Confirmation</StepLabel>
        </Step>
      </Stepper>
      <Box>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema[activeStep]}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              {isFirstStep && (
                <Shipping
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
              {isSecondStep && (
                <Payment
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
              <Box display="flex" justifyContent="space-between" gap="50px">
                {!isFirstStep && (
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    sx={{
                      boxShadow: "none",
                      borderRadius: 0,
                      padding: "15px 40px",
                    }}
                    onClick={() => setActiveStep(activeStep - 1)}
                  >
                    Retour
                  </Button>
                )}
                <Button
                  fullWidth
                  type="submit"
                  color="primary"
                  variant="contained"
                  sx={{
                    boxShadow: "none",
                    borderRadius: 0,
                    padding: "15px 40px",
                  }}
                >
                  {!isSecondStep ? "Suivant" : "Confirmer"}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

const initialValues = {
  billingAddress: {
    firstName: "",
    lastName: "",
    street1: "",
    street2: "",
    city: "",
    zipCode: "",
  },
  shippingAddress: {
    isSameAddress: true,
    firstName: "",
    lastName: "",
    street1: "",
    street2: "",
    city: "",
    zipCode: "",
  },
  email: "",
  phoneNumber: "",
};

const checkoutSchema = [
  yup.object().shape({
    billingAddress: yup.object().shape({
      firstName: yup.string().required("Veuillez inserer votre nom"),
      lastName: yup.string().required("Veuillez inserer votre prénom"),
      street1: yup.string().required("Veuillez inserer votre adresse"),
      street2: yup.string(),
      city: yup.string().required("Veuillez inserer votre ville"),
      zipCode: yup.string().required("Veuillez inserer votre code postale"),
    }),
    shippingAddress: yup.object().shape({
      isSameAddress: yup.boolean(),
      firstName: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("Veuillez inserer votre Nom"),
      }),
      lastName: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("Veuillez inserer votre prénom"),
      }),
      street1: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("Veuillez inserer votre adresse"),
      }),
      street2: yup.string(),
      city: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("Veuillez inserer votre ville"),
      }),
      zipCode: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("Veuillez inserer votre code postale"),
      }),
    }),
  }),
  yup.object().shape({
    email: yup.string().required("Veuillez inserer votre email"),
    phoneNumber: yup
      .string()
      .required("Veuillez inserer votre numéro de teléphone"),
  }),
];

export default ProcessCheckout;
